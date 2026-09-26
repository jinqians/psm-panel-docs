# 节点

![节点管理](/images/nodes.png)

## 新建节点

**节点管理** → **＋ 新建节点**。对话框从右上角选协议开始，然后是运行方式、所在服务器、节点名称、流量限制、每月重置日、标签、节点地址、连接端口 ⇄ 服务端口，最后是这个协议自己的设置。

- **节点地址**：客户端连接用的域名或 IP，会写进客户端链接和订阅。
- **服务端口** 是节点在服务器上监听的端口；**连接端口** 是客户端连接的端口，两者通常相同（端口转发时才不同）。
- **节点名称**：字母、数字、`.` `_` `-`，以字母或数字开头；同一台服务器上不能重名。`snell` 和 `ss2022` 是保留名称。
- 服务器已接入时，节点提交后几秒内在服务器上建好，状态从"下发中"变成"运行中"；还没接入时状态是"待安装"，执行安装命令后自动建好。

## 协议和运行方式

| 协议 | 可选运行方式 | 默认 |
| --- | --- | --- |
| Snell | 独立安装（snell-server v4 / v5 / v6）、sing-box（v5 / v6）、mihomo（v4 / v5） | 独立安装 |
| Shadowsocks 2022 | 独立安装（ss-rust）、Xray、sing-box、mihomo | 独立安装 |
| VLESS REALITY、Hysteria2、Trojan、VMess、SOCKS | Xray、sing-box、mihomo | Xray（Hysteria2 默认 sing-box） |
| VLESS Vision、XHTTP | Xray | Xray |
| VLESS + TLS、TUIC、AnyTLS | sing-box、mihomo | sing-box |
| WireGuard | sing-box | sing-box |

**独立安装**使用官方的 snell-server 或 shadowsocks-rust，作为单独的服务运行，每台服务器各一个。Snell v6 在上游仍是测试版，面板装它最新的测试版或候选版。官方 snell-server 不能在 Alpine（musl）上运行，Alpine 服务器请用 sing-box 或 mihomo 运行 Snell。

## 证书

用 sing-box 或 mihomo 运行的 TLS 协议（Hysteria2、TUIC、AnyTLS、VLESS + TLS、Trojan、VMess），以及 Xray 的 Hysteria2，**证书可以什么都不填**：

- 填了"证书域名（SNI）"，服务器上又有这个域名的证书（`/etc/nginx/ssl/<域名>/`，PSM 菜单"SSL 证书管理"签发的就在这里），就用它；
- 否则 PSM 自动签一张自签证书（SNI 留空时用 `www.bing.com`），节点的链接和订阅带上这张证书的指纹，导入就能连：v2rayN 等 Xray 内核的客户端、mihomo、sing-box、Surge、Quantumult X、Loon、Stash 都**校验这一张证书**（证书固定），不认指纹的客户端照旧跳过校验。Xray 从 2026-06-01 起拒绝"跳过证书校验"（allowInsecure），只给跳过标记的链接在 v2rayN 里连不上。
- 证书在别处时，填"证书文件"和"私钥文件"的路径；那是自签证书的话，勾上"证书不受信任"。

Xray 的 Vision、XHTTP（TLS 模式）、Trojan、VMess 要用真实域名和它的证书：先在服务器上用 PSM 菜单签发。没有证书时面板上的节点显示"失败"并说明原因，不会影响同一台服务器上的其他 Xray 节点。没有域名就用 REALITY，或者用 sing-box / mihomo 运行。

## VLESS Encryption（后量子加密）

Xray 的 REALITY、Vision、XHTTP 和 mihomo 的 VLESS + TLS 可以在"VLESS Encryption"里选 X25519 或 ML-KEM-768，再加一层抗量子加密。客户端要 Xray v25.9+ 或 mihomo 1.19.13+；sing-box、Surge、Quantumult X、Loon 用不了开启后的节点，它们的订阅里不会有它。X25519 的链接短；ML-KEM-768 全程抗量子，但链接约 1.6 KB。

Xray 的 **mKCP** 默认开启（X25519）：mKCP 不套 TLS，而 Xray v26.7.7 起的客户端拒绝向公网地址发送不加密的 VLESS。只给旧版客户端用时选"不开启"。

## Hysteria2 的 BBR 配置档

用 sing-box 或 mihomo 运行的 Hysteria2 可以选"BBR 拥塞配置档"：服务器向客户端发数据时 BBR 有多激进（不限速时生效）。默认 standard；丢包较高的跨境线路可以试 **aggressive**，带宽多人共享或线路本身拥堵时选 **conservative**。需要 sing-box 1.14+ 或 mihomo 1.19.24+，面板安装的就是新版。

## 出口分流（WARP / 免费家宽）

Xray、sing-box、mihomo 运行的节点可以在"出口分流"里选：

- **Cloudflare WARP**：服务器第一次用时自动注册一个免费 WARP 身份；
- **免费家宽（VPNGate）**：服务器连一条志愿者提供的家庭宽带线路（"家宽国家"里选国家，默认日本），断线时自动换一条；每台服务器一条，已经有了就继续用。

"分流范围"决定这个节点的哪些流量走出口：**AI**（ChatGPT、Claude、Gemini）、**流媒体**（Netflix、Disney+、HBO、Prime Video、Spotify）、两者都要、这个节点的**全部流量**，或者自己填 geosite 名称。其余流量照常从服务器直连。只影响这一个节点，同一台服务器上的其他节点不受影响；删除节点或改成"不分流"时，规则一起删掉。

家宽线路是志愿者的家用网络，速度和在线时间不保证；从机房连不上时节点会显示"失败"并说明原因，换个国家或稍后再试。

## 自动选择伪装目标（REALITY）

先在 **系统设置** 里填好网络测绘引擎（Netlas、Quake、ZoomEye 或 FOFA）的 API Key。新建 REALITY 节点、选好已接入的服务器后，点 **自动选择伪装目标**：那台服务器用引擎查同一个 ASN（同一张网）里有证书的网站，逐个做 TLS 握手检查（TLS 1.3、X25519、h2），列出可用的伪装域名、目标和延迟，点 **使用** 填入。API Key 只在查询时发给那台服务器，不保存在服务器上。

## 防火墙

服务器开着防火墙（ufw、firewalld，或默认拒绝的 iptables）时，节点建好会自动放行它的端口（Hysteria2、TUIC、WireGuard 放行 UDP，Shadowsocks、Snell 放行 TCP 和 UDP），删除节点时再关掉。原本就放行的端口保持原样。

云服务商的**安全组**（阿里云、腾讯云、AWS、Oracle 等在控制台里设置的那层）在服务器外面，PSM 改不了：用了安全组的话，要在控制台放行节点端口。

## 修改节点

在节点列表点 **编辑**。可以改地址、端口、流量上限、重置日、标签和协议设置；协议、运行方式、服务器和名称不能改（要改就新建一个）。

![编辑节点](/images/edit.png)

- 密码类的设置显示为 `••••••`，不改就保持原值。
- 运行中的节点改完后由 psm-agent 在服务器上更新；更新失败时节点照旧运行，列表里显示原因。
- 独立安装的 Snell 可以直接换版本（比如 v5 → v6），面板会重新安装。

## 删除节点

点 **删除**。运行中的节点先由 psm-agent 从服务器上删除，再从面板上消失；独立安装的节点会卸载 snell-server / ss-rust。

删除要交给那台服务器执行，所以服务器离线时节点会停在**删除中**，等它回来就自动完成。如果这台机器再也回不来了，按钮会变成 **强制移除**，再点一次就把这条记录从面板上抹掉——这只是面板侧的清理，机器如果还在，上面的节点要自己用 `psm node delete` 处理。

## 链接

点 **链接** 复制节点的客户端链接（Snell 是 Surge 配置行）。要把多个节点给客户端，用 [订阅](./subscriptions)。

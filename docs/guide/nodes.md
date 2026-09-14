# 节点

![节点管理](/images/nodes.png)

## 新建节点

**节点管理** → **＋ 新建节点**。对话框的布局参考 Xboard：右上角选协议，然后是运行方式、所在服务器、节点名称、流量限制、每月重置日、标签、节点地址、连接端口 ⇄ 服务端口，最后是这个协议自己的设置。

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

需要证书的协议（Hysteria2、TUIC、AnyTLS、VLESS + TLS 等）要填证书和私钥在服务器上的路径；证书可以用 PSM 菜单的"SSL 证书管理"签发。

## 修改节点

在节点列表点 **编辑**。可以改地址、端口、流量上限、重置日、标签和协议设置；协议、运行方式、服务器和名称不能改（要改就新建一个）。

![编辑节点](/images/edit.png)

- 密码类的设置显示为 `••••••`，不改就保持原值。
- 运行中的节点改完后由 psm-agent 在服务器上更新；更新失败时节点照旧运行，列表里显示原因。
- 独立安装的 Snell 可以直接换版本（比如 v5 → v6），面板会重新安装。

## 删除节点

点 **删除**。运行中的节点先由 psm-agent 从服务器上删除，再从面板上消失；独立安装的节点会卸载 snell-server / ss-rust。

## 链接

点 **链接** 复制节点的客户端链接（Snell 是 Surge 配置行）。要把多个节点给客户端，用 [订阅](./subscriptions)。

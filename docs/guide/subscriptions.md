# 订阅

![订阅](/images/subscriptions.png)

订阅把所有服务器上 **运行中** 的节点汇总到一个地址。超额暂停的节点不会出现在订阅里。

## 新建订阅

**订阅** 页填名称，需要的话添加标签，点 **新建订阅**：

- 不填标签：包含全部节点；
- 填了标签：只包含带这些标签的节点（比如给家人的订阅只放标了 `family` 的节点）。

节点名在订阅里显示为 `服务器名-节点名`，不同服务器上的同名节点不会混在一起。

## 格式

同一个地址按客户端自动给出合适的格式，也可以在地址后加 `?format=` 指定：

| 格式 | 地址 | 适用客户端 |
| --- | --- | --- |
| 通用 | 订阅地址本身 | v2rayN、Shadowrocket、Hiddify、NekoBox 等（base64 链接列表） |
| Clash / mihomo | `?format=clash` | Clash Verge、Mihomo Party、ClashX Meta |
| Stash | `?format=stash` | Stash |
| sing-box | `?format=singbox` | sing-box 官方客户端（SFA / SFI / SFM），1.12 及以上 |
| Surge | `?format=surge` | Surge |
| Quantumult X | `?format=quanx` | Quantumult X |
| Loon | `?format=loon` | Loon |

除了"通用"，其余格式都是一份完整的客户端配置，由**订阅模板**加上节点生成。每个客户端只会拿到它支持的协议：Surge 没有 VLESS；Quantumult X 没有 Hysteria2、TUIC、Snell；Loon 没有 TUIC、Snell；Stash 没有 AnyTLS。

- TLS 协议的节点（Hysteria2、TUIC、AnyTLS、VLESS + TLS、Trojan、VMess）按服务器导出的完整参数写出，包括自签证书时的"跳过证书校验"。
- Clash / mihomo 的内置模板不把节点写进配置，而是用 proxy-provider 直接引用这个订阅（通用格式）：节点只有这一个来源，面板里增删节点后客户端最多一小时自己同步，不必重新导入订阅。代价是首次启动时如果拉不到订阅（断网、面板不可达），配置里就没有节点。

## 订阅模板

内置模板带一套基础分流：广告拦截、AI（OpenAI、Claude、Gemini）和流媒体（Netflix、Disney+、YouTube）各一个可选的策略组、国内直连，其余走 PSM 组（手选或自动选择）。规则列表来自 blackmatrix7/ios_rule_script（Surge、Quantumult X、Loon、Stash）、SagerNet 的 sing-geosite（sing-box）和 mihomo 自带的 GeoSite。

要改规则，在 **订阅** 页下方 **订阅模板** 点 **新建模板**：选格式，内容会先填成内置模板，改好保存；然后在订阅卡片里每种格式旁的下拉框选用它。模板里可以用这些占位符：

| 占位符 | 替换成 |
| --- | --- |
| `{{proxies}}` | 节点定义，每行一个，缩进和占位符那一行一样（必须单独占一行）。用了 `{{provider_url}}` 的 Clash 模板可以不写它——内置的 Clash 模板就是这样，节点全部来自 provider |
| `{{names}}` | 节点名，每个后面带 `, `，放在策略组固定成员前面，如 `PSM = select, {{names}}DIRECT` |
| `{{names_list}}` | 节点名，用 `, ` 连接，最后不带逗号（如 url-test 组） |
| `{{sub_url}}` | 这个订阅在这种格式下的地址（Surge 的 `#!MANAGED-CONFIG`） |
| `{{name}}` | 订阅名称 |
| `{{provider_url}}`、`{{provider_exclude}}` | Clash：通用格式地址，和排除已写出节点的过滤器。内置模板只用前者；`{{provider_exclude}}` 供「既内联节点又挂 provider」的自定义模板去重时使用 |

删除模板后，用它的订阅自动改回内置模板。
- 响应带 `subscription-userinfo`，客户端能显示已用流量（所有节点都设了上限时也显示总量）。

## 重置和删除

地址泄露时点 **重置地址**：旧地址立即失效，客户端换成新地址即可。**删除** 后地址同样失效。

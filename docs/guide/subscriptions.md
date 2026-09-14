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
| Clash / mihomo | `?format=clash` | Clash Verge、Mihomo Party、Stash |
| sing-box | `?format=singbox` | sing-box 官方客户端（SFA / SFI / SFM） |
| Surge | `?format=surge` | Surge（Snell 节点） |

- Clash / mihomo 的配置通过 proxy-provider 引用这个订阅的通用格式，由 mihomo 自己解析链接，协议字段不会走样；带"自动选择"组。
- sing-box 的配置包含每个节点的 outbound、"自动选择"（urltest）和本地 `127.0.0.1:7890` 混合代理入口。
- 响应带 `subscription-userinfo`，客户端能显示已用流量（所有节点都设了上限时也显示总量）。

## 重置和删除

地址泄露时点 **重置地址**：旧地址立即失效，客户端换成新地址即可。**删除** 后地址同样失效。

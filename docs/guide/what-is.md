# PSM Panel 是什么

PSM Panel 是 [PSM（Proxy Stack Manager）](https://github.com/jinqians/proxy-stack) 的网页管理面板，界面参考 Xboard。PSM 本身是在每台 VPS 上用命令行菜单管理节点的脚本；面板把多台 VPS 放到一个网页里：

- 在网页上新建、修改、删除任意一台服务器上的节点；
- 看每台服务器是否在线、装了哪些内核、`psm doctor` 的检查结果；
- 看每个节点的流量，给节点设流量上限；
- 把所有服务器的节点汇总成一个订阅地址。

## 工作方式

```
浏览器 ──密码登录──▶  面板（Cloudflare Workers + D1）
                          ▲            ▲
       VPS hk1：psm-agent ┘            │  主动 HTTPS：领取任务、回报结果和流量
       VPS jp1：psm-agent ─────────────┘
客户端 ──▶ 面板/sub/<令牌>（汇总所有 VPS 的节点）
```

- **面板**运行在你自己的 Cloudflare 账号里：一个 Worker 提供页面和接口，D1 数据库保存服务器、节点、流量和订阅。Cloudflare 的免费额度（每天 10 万次请求、10 万次写入）足够几十台服务器使用。
- **psm-agent** 是每台 VPS 上的一个小程序。它不监听任何端口，只主动用 HTTPS 连面板：空闲时 30 秒一次，有任务时 3 秒一次。它领到的每个任务，在 VPS 上都是一条参数校验过的 `psm` 命令——面板能让服务器做的事，不超出 PSM 命令行本身。
- **VPS 上的 PSM 不受影响**：接入面板后，照样可以用 `psm` 菜单和命令行管理；面板建的节点，就是 PSM 里的普通节点。

## 需要什么

| 需要 | 说明 |
| --- | --- |
| Cloudflare 账号 | 免费账号即可 |
| GitHub 账号 | 一键部署会把面板仓库复制到你的 GitHub |
| VPS | Debian / Ubuntu、Alpine、Rocky / AlmaLinux 等 PSM 支持的系统，root 权限，能访问 Cloudflare 和 GitHub |

不需要域名（可以用 Cloudflare 给的 `workers.dev` 地址），不需要在 VPS 上开放任何端口。

下一步：[一键部署](./deploy)。

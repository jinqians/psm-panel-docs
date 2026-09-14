# 安全

## 登录

- 管理员密码只保存在 Worker 机密里，面板比较的是摘要（恒定时间）。
- 登录后得到一个 HMAC 签名的会话 Cookie：HttpOnly、SameSite=Strict，HTTPS 下带 Secure，7 天有效。签名密钥由密码派生，修改密码即让所有会话失效。
- 同一地址 15 分钟内失败 10 次后，暂停这个地址的登录。
- 需要更强的保护时，可以在面板前面加 Cloudflare Access，放行 `/api/agent/*` 和 `/sub/*`（服务器和订阅客户端不会登录）。

## 服务器

- psm-agent 不监听任何端口，只主动用 HTTPS 连接面板。
- 安装命令里的令牌一次性、24 小时有效；接入后换成这台服务器自己的 agent 令牌，面板只存它的 SHA-256。
- psm-agent 只执行白名单校验过的 `psm` 命令：内核、协议、节点名、端口、密钥等逐项校验，参数以数组传递，从不经过 shell。面板无法让服务器执行 PSM 命令行做不到的事。
- psm-agent 下载时用发布页的 SHA256SUMS 校验。

## 数据

- 节点的协议参数（密码、密钥）、客户端链接、下发的任务、订阅令牌、服务器的诊断报告，在 D1 里都用 AES-GCM 加密保存。
- agent 令牌、加入令牌、订阅令牌的查找都用哈希；数据库里没有明文令牌。
- Worker 默认开启 Workers Logs（Cloudflare 控制台里只有你自己能看），请求日志会记下访问的地址，订阅地址里的令牌也在其中。不希望这样时，把 `wrangler.jsonc` 里的 `observability.enabled` 改成 `false`。订阅地址泄露时在面板上重置即可。
- 仓库里没有任何密钥；密钥只在你自己 Cloudflare 账号的 Worker 机密里。

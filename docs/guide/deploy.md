# 一键部署

## 先 fork，再用按钮部署（推荐）

1. 打开 [jinqians/psm-panel](https://github.com/jinqians/psm-panel)，点右上角 **Fork**，把仓库复制到你自己的 GitHub 账号下。
2. 点下面的按钮（把地址里的 `<你的GitHub用户名>` 换成你的账号），登录 Cloudflare（没有账号就免费注册一个）：

   ```
   https://deploy.workers.cloudflare.com/?url=https://github.com/<你的GitHub用户名>/psm-panel
   ```

   <a href="https://deploy.workers.cloudflare.com/?url=https://github.com/jinqians/psm-panel" target="_blank" rel="noopener"><img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare"></a>

3. 按提示连接 GitHub，授权 Cloudflare 访问你 fork 的这个仓库。
4. 表单里只需要填 **ADMIN_PASSWORD**：后台的登录密码，至少 8 位。其余保持默认，点"部署"。
5. 等部署完成（一两分钟），打开 `https://psm-panel.<你的子域>.workers.dev`，用刚才的密码登录。

部署时 Cloudflare 自动创建 D1 数据库；数据表由面板第一次运行时自己建好。整个过程不需要执行任何命令，也不需要 API Token。

![登录页](/images/login.png)

::: tip 忘了填密码？
面板会显示"还没有设置管理员密码"。在 Cloudflare 控制台打开这个 Worker 的 **设置 → 变量和机密**，添加机密 `ADMIN_PASSWORD`，刷新页面即可。
:::

## 已经 fork 了仓库

1. 在 Cloudflare 控制台打开 [Workers 和 Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages) → **创建** → **导入仓库**，选中你 fork 的 `psm-panel`。
2. 构建设置保持默认（构建命令 `npm run build`，部署命令 `npx wrangler deploy`），点部署。
3. 部署后在这个 Worker 的 **设置 → 变量和机密** 添加机密 `ADMIN_PASSWORD`。

## 用命令行部署（可选）

适合想用 wrangler 或自己的 CI 部署的情况。需要 Cloudflare 的 API Token 和 Account ID：

- **API Token**：[打开已填好权限的创建页面](https://dash.cloudflare.com/profile/api-tokens?permissionGroupKeys=%5B%7B%22key%22%3A%22workers_scripts%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22d1%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22workers_routes%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22dns%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22zone%22%2C%22type%22%3A%22read%22%7D%2C%7B%22key%22%3A%22account_settings%22%2C%22type%22%3A%22read%22%7D%5D&accountId=*&zoneId=all&name=psm-panel)（Workers Scripts、D1、Workers Routes、DNS 编辑，区域和账户设置读取），创建时把"账户"和"区域"限定为你自己的。
- **Account ID**：[Workers 和 Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages) 页面右侧的"账户详细信息"。

```bash
git clone https://github.com/jinqians/psm-panel && cd psm-panel
npm install
CLOUDFLARE_API_TOKEN=… CLOUDFLARE_ACCOUNT_ID=… npm run deploy
npx wrangler secret put ADMIN_PASSWORD
```

## 可选的 Worker 设置

在 Worker 的 **设置 → 变量和机密** 里：

| 名称 | 类型 | 作用 |
| --- | --- | --- |
| `ADMIN_PASSWORD` | 机密（必填） | 后台登录密码，至少 8 位；修改后所有已登录的会话失效 |
| `TOKEN_KEY` | 机密（可选） | 加密数据库里敏感内容的密钥（32 字节的 base64）。不设时面板自动生成一把，存在 D1 |
| `SYNC_INTERVAL` | 变量（可选） | 服务器空闲时的同步间隔，默认 30 秒（5–300） |

下一步：[接入服务器](./join)；需要自己的域名看 [绑定自己的域名](./domain)。

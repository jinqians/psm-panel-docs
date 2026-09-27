# 更新面板

## 更新面板本身

一键部署会把面板复制到你的 GitHub 仓库，Cloudflare 在你的仓库有推送时自动重新部署。把上游的更新合进你的仓库即可：

- **fork 的仓库**：在 GitHub 上打开你的仓库，点 **Sync fork** → **Update branch**。
- **按钮复制的仓库**（不是 fork）：

  ```bash
  git clone https://github.com/<你>/psm-panel && cd psm-panel
  git remote add upstream https://github.com/jinqians/psm-panel
  git pull upstream main
  git push
  ```

推送后 Cloudflare 自动部署。数据库结构有变化时，新版面板第一次运行时自己升级，不需要执行迁移命令；已有的数据保留。

::: tip 升到 0.8.0 之后
- 所有人要重新登录一次（会话 Cookie 换了格式）。
- 中转的新功能和自动选择伪装目标要 psm-agent 0.11.0：服务器页上 Agent 标着"可升级"的，点一下即可。
- 看一眼 **系统设置 · 数据加密密钥**：一键部署的面板密钥还在数据库里，建议按页面上的步骤挪进 Cloudflare 机密，见 [系统设置](./settings#数据加密密钥)。
:::

## 更新服务器上的 PSM 和 psm-agent

- PSM：在服务器页点 **更新 PSM**（psm-agent 已是最新版时显示），或照常在服务器上更新：`psm` 菜单里的更新，或再执行一次 `bash <(curl -fsSL https://psm.jinqians.com)`。面板看到服务器报告新的 PSM 版本后，会重新取一次节点的链接和订阅内容，见 [服务器和诊断 · 更新 PSM](./servers#更新-psm)。
- psm-agent：在服务器页点这台服务器的 **升级 agent**——Agent 列标着"可升级"时出现。它会让服务器自己更新 PSM 并换上新版 psm-agent，节点、中转和流量统计都不受影响。见 [服务器和诊断 · 升级 psm-agent](./servers#升级-psm-agent)。
- 服务器离线、或者想手工处理时：生成新的安装命令执行一次，或在服务器上执行 `psm agent upgrade`。
- **0.10.1 之前的 psm-agent 还不认识"升级"这个任务**，按钮对它们无效：这些服务器先用上面的手工办法升一次（`psm agent upgrade` 也是随 0.10.1 才有的，所以第一次要么重跑安装命令，要么先更新 PSM 再执行它），之后就能在面板上点按钮了。

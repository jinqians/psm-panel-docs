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

## 更新服务器上的 PSM 和 psm-agent

- PSM 照常更新：`psm` 菜单里的更新，或再执行一次 `bash <(curl -fsSL https://psm.jinqians.com)`。
- psm-agent：在服务器页为这台服务器生成新的安装命令并执行一次，会下载新版本的 psm-agent 并重新接入（节点不受影响）。

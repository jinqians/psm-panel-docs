# PSM Panel 文档

[PSM Panel](https://github.com/jinqians/psm-panel) 的部署与使用文档，VitePress 搭建。

```bash
npm install
npm run docs:dev     # 本地预览
npm run docs:build   # 构建到 docs/.vitepress/dist
```

## 部署

### Cloudflare Pages

1. Cloudflare 控制台 → **Workers 和 Pages** → **创建** → **Pages** → **连接到 Git**，选择这个仓库（或你的 fork）。
2. 构建设置：
   - 框架预设：`VitePress`（或"无"）
   - 构建命令：`npm run docs:build`
   - 构建输出目录：`docs/.vitepress/dist`
   - 环境变量（可选）：`DOCS_HOST` 设为站点地址，例如 `https://psm-panel-docs.pages.dev`（用于 sitemap）
3. 保存并部署。以后推送到 main 会自动重新部署。

站点按根路径 `/` 构建，Cloudflare Pages 的 `*.pages.dev` 和自定义域名都可以直接用。

### GitHub Pages

推送到 main 后由 `.github/workflows/deploy.yml` 构建并发布到 https://jinqians.github.io/psm-panel-docs/ （它设置 `DOCS_BASE=/psm-panel-docs/`，因为 GitHub Pages 的项目站点在子路径下）。

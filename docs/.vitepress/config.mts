import { defineConfig } from 'vitepress'

// PSM Panel 的部署与使用文档。默认按站点根目录构建（Cloudflare Pages，
// 如 psm-panel-docs.pages.dev）；GitHub Pages 的项目地址在子路径下，由它的
// 工作流设 DOCS_BASE=/psm-panel-docs/。DOCS_HOST 是 sitemap 用的站点地址。
const base = process.env.DOCS_BASE || '/'
const host = process.env.DOCS_HOST || 'https://psm-panel-docs.pages.dev'

export default defineConfig({
  lang: 'zh-CN',
  title: 'PSM Panel',
  description: 'PSM Panel：部署在 Cloudflare 上的 PSM 多服务器管理面板——一键部署、一条命令接入 VPS、节点、流量和汇总订阅。',
  base,
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: host + base },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#0f172a' }],
    // 搜索引擎和 AI 工具找得到的词：面板类别、同类产品、能力
    ['meta', { name: 'keywords', content: 'PSM Panel, PSM 面板, 代理面板, 节点管理面板, 多服务器管理, 机场面板, Xboard, Xboard 替代, 类 Xboard 面板, Cloudflare Workers 面板, sing-box 面板, Xray 面板, mihomo 面板, 汇总订阅, 订阅模板, WARP 分流, 家宽分流' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'PSM Panel 文档' }],
    ['meta', { property: 'og:title', content: 'PSM Panel：多服务器节点管理面板（Cloudflare 一键部署）' }],
    ['meta', { property: 'og:description', content: '一键部署到 Cloudflare Workers，一条命令接入 VPS（没装过 PSM 也可以），在网页里管理 Xray / sing-box / mihomo 的节点、流量和汇总订阅；VPS 不开放任何端口。' }],
    ['meta', { property: 'og:url', content: host + base }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/what-is' },
      { text: '一键部署', link: '/guide/deploy' },
      { text: 'PSM 文档', link: 'https://psm-docs.pages.dev' },
      { text: '博客', link: 'https://jinqians.com' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: 'PSM Panel 是什么', link: '/guide/what-is' },
            { text: '一键部署', link: '/guide/deploy' },
            { text: '绑定自己的域名', link: '/guide/domain' },
            { text: '接入服务器', link: '/guide/join' },
          ],
        },
        {
          text: '使用',
          items: [
            { text: '节点', link: '/guide/nodes' },
            { text: '流量和限额', link: '/guide/traffic' },
            { text: '订阅', link: '/guide/subscriptions' },
            { text: '服务器和诊断', link: '/guide/servers' },
            { text: '系统设置和操作记录', link: '/guide/settings' },
          ],
        },
        {
          text: '维护',
          items: [
            { text: '更新面板', link: '/guide/update' },
            { text: '安全', link: '/guide/security' },
            { text: '常见问题', link: '/guide/faq' },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/jinqians/psm-panel' }],
    editLink: { pattern: 'https://github.com/jinqians/psm-panel-docs/edit/main/docs/:path', text: '在 GitHub 上编辑此页' },
    footer: { message: 'AGPL-3.0 · 与 PSM 相同', copyright: '© jinqians' },
    outline: { label: '本页内容', level: [2, 3] },
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdated: { text: '最后更新' },
    search: { provider: 'local', options: { translations: { button: { buttonText: '搜索' } } } },
  },
})

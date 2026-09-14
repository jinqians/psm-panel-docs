---
layout: home
hero:
  name: PSM Panel
  text: 一个网页，管理所有 VPS 上的节点
  tagline: 部署在 Cloudflare 上，免费额度就够；VPS 一条命令接入，不开放任何端口。
  image:
    src: /logo.svg
    alt: PSM Panel
  actions:
    - theme: brand
      text: 一键部署
      link: /guide/deploy
    - theme: alt
      text: PSM Panel 是什么
      link: /guide/what-is
    - theme: alt
      text: GitHub
      link: https://github.com/jinqians/psm-panel
features:
  - title: 一键部署
    details: 点 Deploy to Cloudflare，填一个管理员密码。数据库和数据表自动建好，不需要命令，也不需要 API Token。
  - title: 一条命令接入 VPS
    details: 没装过 PSM 的服务器也行：先装 PSM，再接入面板；节点用到的内核自动安装。psm-agent 只主动连面板，不开任何端口。
  - title: 节点
    details: PSM 支持的全部协议，Snell 和 SS2022 可用独立的 snell-server（v4/v5/v6）和 ss-rust；新建、修改、删除都在面板上。
  - title: 流量和限额
    details: 每个节点本月用量和每日图表；设了上限的节点超额自动暂停，到重置日或手动重置后恢复。
  - title: 汇总订阅
    details: 一个地址汇总所有服务器的节点，可按标签筛选；通用链接、Clash / mihomo、sing-box、Surge，按客户端自动识别。
  - title: 诊断和记录
    details: 一键收集服务器的 PSM 版本、内核和 psm doctor 结果；所有操作都有记录。
---

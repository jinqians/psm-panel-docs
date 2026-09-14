# 接入服务器

## 生成安装命令

两种方式：

- **服务器** 页 → 输入名称（如 `hk1`）→ **添加服务器**；
- 新建节点时在"所在服务器"选 **＋ 新服务器**，提交后对话框里给出命令。

命令形如：

```bash
bash <(curl -fsSL https://psm.jinqians.com) --panel https://<你的面板地址> --join <一次性令牌>
```

在 VPS 上以 root 执行。令牌 **24 小时内有效、只能用一次**；过期或用过了，在服务器页点 **安装命令** 重新生成。

## 命令做了什么

| 服务器的情况 | 命令做的事 |
| --- | --- |
| 没装过 PSM | 不交互地安装 PSM（不问语言、不打开菜单），然后接入面板 |
| 已经装了 PSM | 更新 PSM，然后接入面板；已有的节点、菜单和命令行用法都不受影响 |

接入这一步（`psm agent join`）会：

1. 下载 psm-agent，并用发布页的 SHA256SUMS 校验；
2. 用一次性令牌向面板换取这台服务器自己的 agent 令牌（保存在 `/etc/psm/agent.json`，仅 root 可读；面板只存它的哈希）；
3. 把 psm-agent 作为服务启动（systemd 或 OpenRC），开机自启。

几秒后服务器在面板上显示 **在线**，之前为它建的节点开始安装。

::: tip 内核不用提前装
服务器上不需要事先装 Xray、sing-box 或 mihomo：节点用到哪个内核，psm-agent 在建节点前自动安装（最新稳定版）。独立安装的 Snell / SS2022 同样由面板装好 snell-server / ss-rust。
:::

## 在服务器上查看

```bash
psm agent status          # 是否安装、接入、运行，连的是哪个面板
journalctl -u psm-agent   # 日志（OpenRC：/var/log/psm/psm-agent.log）
psm agent remove --yes    # 断开面板并删除 psm-agent；服务器上的节点保留
```

psm-agent 不监听任何端口，可以用 `ss -ltnp` 确认。

## 服务器显示离线

- 服务器能否访问面板：`curl -I https://<你的面板地址>/api/session`。
- `psm agent status` 里 `active` 是否为 true；不是的话 `systemctl restart psm-agent`，再看日志。
- 日志里有 "the panel refused this agent's token"：服务器在面板里被移除过，或者重新部署时换了数据库。为它生成新的安装命令，执行一次即可。

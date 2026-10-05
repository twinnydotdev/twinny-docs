---
title: 连接到团队
description: 在 VS Code 中使用团队的网关：打开邀请链接，或输入地址并粘贴或申请一把密钥。
---

最简单的入口是管理员发来的邀请链接。没有的话，你需要网关的地址（如 `https://ai.example.com`）和一把个人密钥（`tsk_…`），密钥可以由别人给你，也可以在 VS Code 内申请。密钥只属于你；用量按密钥统计，借给别人会让别人的工作算在你头上。

## 使用邀请链接

安装 twinny，然后打开管理员发来的链接。它形如 `vscode://rjmacarthy.twinny/join?…`，会打开 VS Code 并定位到 twinny 侧边栏。链接打开时你的密钥就已创建并存入密钥存储，你会看到团队为对话、自动补全和嵌入设置的默认模型。选择 **Connect** 即完成。链接只能打开一次；如果提示已使用或已过期，向管理员再要一个。在 Cursor 或 VSCodium 上，把 `vscode://` 换成 `cursor://` 或 `vscodium://`。

## 使用地址和密钥

1. 打开 twinny 侧边栏，进入 **Providers**。
2. 在 **Using Twinny with your team?** 下选择 **Connect to team**。全新安装时，同一入口位于欢迎界面下方。
3. 输入网关 URL。然后要么粘贴密钥并点 **Check connection**，要么选择 **Request a key**（见下文）。
4. twinny 向网关询问你是谁，并读取管理员为对话、自动补全和嵌入设置的团队默认模型。这一步不向模型发送任何内容，所以即使模型还在加载也只需片刻。你会看到网关所知的你的名字，以及每项功能对应的别名。
5. 选择 **Connect**。twinny 为管理员配置的每项功能各创建一个提供者，设为活跃，并把密钥存入 VS Code 的密钥存储。密钥的任何信息都不会写入设置，也不会随提供者列表导出。要试用某个模型，之后在其卡片上点 **Test Provider**。

你已有的提供者都会保留；随时可以在提供者列表中切换回去。

### 申请密钥

**Request a key** 显示一个短码，如 `WXYZ-2345`。当面或在通话中把它读给网关管理员。他们会在网关管理页面上看到这个请求，附带你的 VS Code 建议的名字和机器，输入你的密钥名称并批准。几秒内密钥送达你的 VS Code，直接进入密钥存储，连接检查自动运行。短码十分钟内有效，除管理员外没有人能把它变成密钥。

## 共享给你的插件

如果管理员向你共享了某个网关插件，例如带团队模型审查的 GitHub 或 GitLab 拉取请求插件，VS Code 会提示你一次，附带 **Open** 按钮。它在启动时、窗口重新获得焦点时以及每半小时检查一次。之后 Providers 标签页会在 **Your team's plugins** 下列出该插件；管理员在那里看到的则是 **Your gateway's page**。命令面板中的 **Twinny - Open your team's plugins** 作用相同。

打开它会在浏览器中以已登录状态进入网关页面，而不显示你的密钥。VS Code 用你的密钥向网关申请一个一次性代码，并把代码放在地址的片段部分打开页面，浏览器从不把片段发给服务器；页面在一分钟内用它换取一次你的密钥，然后从地址栏抹去。如果你是通过邀请加入的，不需要管理员做任何事。网关版本早于 4.2.8 时，密钥改为放到剪贴板，由你粘贴到页面中。使用团队共享令牌而非个人密钥的连接无法打开该页面。

你只能看到共享给你的插件。在拉取请求插件上，你可以阅读拉取请求和议题、让团队的模型审查某个拉取请求、就审查提问、把它作为评论发回托管平台，以及对议题进行分类。你在托管平台上的用户名让需要你审批的拉取请求有了 **waiting for me** 视图：从 VS Code 打开时，GitHub 页面会从 VS Code 登录的 GitHub 账号取一次（GitHub Enterprise 不支持）；否则页面顶部会一直问 **Who are you on GitHub?**（或 GitLab、Gitea、Bitbucket）直到你回答。之后可在页面底部的 **You on GitHub** 处修改。仓库和设置由管理员决定。见[插件](/twinny-docs/zh-cn/teams/plugins/#share-with-developers)。

## 你的代码去了哪里

提示和光标周围的代码发往网关及其后端，在你团队的硬件上，别无他处。网关记录你用了哪个模型、耗时多久和 token 数。只有团队开启了记录，它才保留你请求的内容，并且会在连接界面和 Providers 标签页上说明。twinny 自身保留什么，见[状态栏、日志与隐私](/twinny-docs/zh-cn/features/status-and-logs/)。

## 可能看到的提示

- **"This gateway key was revoked on …"**：用 **Request a key** 重新连接，或向管理员要一把新密钥。
- **"Your admin denied the sign-in request"** 或 **"The sign-in code expired"**：先问一下，再重新申请。短码有效期十分钟。
- **"This gateway key has no seat"**：网关的密钥数超过了套餐允许的数量。管理员需要增加席位或撤销未使用的密钥；你这边无需操作。
- **"is rate limiting requests"**：网关繁忙，或你的密钥达到了自己的限额。一分钟内自行恢复。
- **"Could not connect"**：从你的机器无法访问网关。检查地址、VPN 或隧道，以及浏览器能否打开 `https://<gateway>/healthz`。
- **"Your admin has not selected a default for this feature"**：网关尚未为该功能设置团队默认模型。你仍可手动添加 **Twinny gateway** 提供者，选择它提供的任意别名。

## 手动添加网关提供者

Connect to team 是捷径。长路是 **Providers → Add → Twinny gateway**（在"Another machine"下）：输入主机名、端口和协议，把密钥粘贴到 **Gateway token**，从网关返回的列表中选一个别名。想要对话、自动补全和嵌入三项都用，就各建一个提供者。

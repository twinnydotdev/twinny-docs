---
title: 常见问题
description: 关于 twinny 的常见问题简答。
---

### twinny 免费吗？

免费。它以 MIT 许可证开源，没有账号，也没有付费版本。通过它使用托管 API 的费用由该供应商收取。

### 我的代码会离开我的机器吗？

只会发往你配置的服务器。使用本地服务器时，什么都不会离开。使用已配对设备时，提示通过加密连接发往你的另一台机器。使用托管 API 时，提示发往该供应商。twinny 本身不收集任何东西。见[状态栏、日志与隐私](/twinny-docs/zh-cn/features/status-and-logs/#隐私)。

### 离线能用吗？

能，配合本地服务器。包括工作区索引及其重排序器在内的一切都在本机运行。

### 该用哪个模型？

简答：Ollama 上用 `qwen2.5-coder:1.5b-base` 做补全，`qwen2.5-coder:7b-instruct` 做对话。理由见[选择模型服务器](/twinny-docs/zh-cn/getting-started/choosing-a-server/)和[支持的模型](/twinny-docs/zh-cn/providers/supported-models/)。

### 为什么补全乱七八糟，或者满是 `<PRE>` 之类的标记？

要么模型是 instruct 模型（改用 base 或 code 变体），要么 FIM 模板与模型不匹配（在提供者中手动设置）。见[故障排除](/twinny-docs/zh-cn/getting-started/troubleshooting/#代码补全)。

### 为什么补全很慢？

模型对你的硬件来说太大，或在 CPU 上运行。改用更小的 base 模型，用 `ollama ps` 确认它在 GPU 上，并关闭文件上下文。见[选择模型服务器](/twinny-docs/zh-cn/getting-started/choosing-a-server/#什么硬件跑什么模型)。

### 能一个模型干所有事吗？

对话和补全：instruct 模型能补全但效果差，base 模型能对话但效果差。两个小模型比一个大模型更省内存。嵌入始终需要嵌入模型。

### 能在 Cursor、Windsurf 或 VSCodium 中使用吗？

VSCodium 及其他 Open VSX 版本：可以，从 Open VSX 安装。支持标准扩展的 VS Code 分支一般可用，但未经测试。

### 支持 Remote SSH、WSL 或 Dev Containers 吗？

支持。twinny 运行在远程一侧，所以 “localhost” 指远程。见[安装](/twinny-docs/zh-cn/getting-started/installation/#远程开发)。

### 能让笔记本共用一台 GPU 机器吗？

能，这正是[设备](/twinny-docs/zh-cn/providers/devices/)的用途。无需端口转发，无需账号。

### 对话和内联编辑有什么区别？

对话在侧边栏回答，由你决定怎么用答案。内联编辑直接修改编辑器中的代码并展示 diff。“改这个”用编辑；“解释这个”或“这个该怎么办”用对话。

### twinny 会运行自动编辑我文件的代理吗？

不会。每个修改都是你请求并在保留前能看到的：接受的建议、接受的 diff、确认的命令。这是有意设计。

### 怎么修改提示词？

编辑 `~/.twinny/templates/` 中的 Handlebars 文件。见[提示词模板](/twinny-docs/zh-cn/features/templates/)。

### 怎么改侧边栏语言？

`twinny.locale`。内置英语、中文（简体和香港）、德语、西班牙语、日语、法语、意大利语、葡萄牙语、俄语、韩语和荷兰语。

### 我的会话存在哪里？

该 VS Code 安装的全局状态中。不会被 Settings Sync 同步。

### twinny 能读我的整个仓库吗？

对话读取你附加的内容，`@workspace` 搜索你建立的索引。没有这两者，不会读取或发送任何内容。见[上下文与提及](/twinny-docs/zh-cn/features/context/)。

### Symmetry 怎么了？

Symmetry 网络（通过 twinny.dev 与陌生人共享推理）已被移除。现在用[设备](/twinny-docs/zh-cn/providers/devices/)在你自己的机器间共享，无需账号和第三方。

### 怎么报告 bug 或提功能需求？

[github.com/twinnydotdev/twinny/issues](https://github.com/twinnydotdev/twinny/issues)。附上版本、服务器与模型，以及 Twinny 输出通道的相关行。

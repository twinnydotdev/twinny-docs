---
title: 简介
description: twinny 是什么、用来做什么、如何构建。
---

twinny 是一个 Visual Studio Code 的 AI 编程助手，运行在**你**选择的模型服务器上。它面向这样的人：想要 Copilot 类助手中有用的部分（代码补全、就代码提问、编辑与审查），却不想把代码发送给自己无法控制的服务，也不想付订阅费。

## 原则

**本地优先。** twinny 围绕运行在你自己硬件上的服务器设计：Ollama、LM Studio、llama.cpp，以及任何支持 OpenAI API 的服务。托管 API 同样受支持，但 twinny 的任何功能都不依赖它们。

**除非你指定，否则什么都不会离开你的机器。** 没有账号、没有遥测、没有中继。请求只发往你配置的服务器地址。唯一不是普通 HTTP 请求的联网功能[设备](/twinny-docs/zh-cn/providers/devices/)，也只是通过加密的点对点连接把你自己的机器连在一起。

**小而明确的功能。** twinny 不会在你的仓库上运行自主代理。每个功能都是你明确请求、并能看到结果的一件事：按 Tab 接受的建议、以 diff 审阅的编辑、运行前需要确认的命令。这是有意为之：它让工具可预测，也让笔记本能跑的小模型发挥作用。

**对弱模型友好。** 提示简短、上下文精选、输出在合理边界截断，因此 1.5B 或 7B 的模型也能给出有用的结果。

## 你能得到什么

| 功能 | 一句话 | 了解更多 |
| --- | --- | --- |
| 代码补全 | 输入时来自 fill-in-the-middle 模型的灰色文字建议 | [代码补全](/twinny-docs/zh-cn/features/code-completion/) |
| 内联编辑 | `Ctrl+I`，描述修改，以 diff 审阅 | [内联编辑](/twinny-docs/zh-cn/features/inline-edit/) |
| 对话 | 在侧边栏就代码提问，用 `@` 提及添加上下文 | [对话](/twinny-docs/zh-cn/features/chat/) |
| 上下文与提及 | 文件、符号、问题、git、终端输出和工作区搜索 | [上下文](/twinny-docs/zh-cn/features/context/) |
| 工作区索引 | 嵌入 + 关键词搜索 + 本地重排序器 | [工作区索引](/twinny-docs/zh-cn/features/workspace-index/) |
| 代码审查 | 审查工作区、分支或 GitHub 拉取请求 | [代码审查](/twinny-docs/zh-cn/features/code-review/) |
| 提交信息 | 源代码管理视图中一键生成 | [提交信息](/twinny-docs/zh-cn/features/commit-messages/) |
| 终端 | 根据描述编写命令，修复最后的错误 | [终端](/twinny-docs/zh-cn/features/terminal/) |
| 设备 | 通过 P2P 使用另一台电脑的 GPU | [设备](/twinny-docs/zh-cn/providers/devices/) |
| 提示词模板 | 每个提示都是可编辑的 Handlebars 文件 | [模板](/twinny-docs/zh-cn/features/templates/) |

## 整体结构

```
 VS Code ──► twinny 扩展 ──► 提供者 ──► 模型服务器
                 │              （对话、自动补全、嵌入）
                 ├─ 侧边栏 webview（对话、提供者、审查、索引）
                 ├─ 内联补全提供者（灰色文字）
                 ├─ 内联编辑（diff 区域、CodeLens、代码操作）
                 ├─ 工作区索引（LanceDB + 本地重排序器）
                 └─ P2P 运行时（通往已配对设备的网关）
```

一个**提供者**是某台服务器上的某个模型，用于某一项工作。你可以有多个并随时切换。对话、自动补全、嵌入这三项工作需要不同类型的模型；[提供者概述](/twinny-docs/zh-cn/providers/overview/)解释了各自需要什么。

## 要求

- Visual Studio Code 1.93 或更新版本，或 VSCodium 等兼容版本。
- 一个模型服务器：本地服务器（见[选择模型服务器](/twinny-docs/zh-cn/getting-started/choosing-a-server/)）、已配对的设备，或托管 API 密钥。
- 终端功能需要 VS Code 的 shell 集成，bash、zsh、fish 和 PowerShell 默认开启。

## 许可证

twinny 以 MIT 许可证开源。代码在 [github.com/twinnydotdev/twinny](https://github.com/twinnydotdev/twinny)。

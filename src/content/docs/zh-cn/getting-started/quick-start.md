---
title: 快速开始
description: 几分钟内从零到可用的代码补全与对话。
---

本文以最常见的本地服务器 [Ollama](https://ollama.com/) 为例。其他服务器运行起来后方式相同，见[推理提供者](/twinny-docs/zh-cn/providers/overview/)。如果你更想用托管 API，跳到第 3 步并选择托管预设。

## 1. 安装 Ollama 和两个模型

从 [ollama.com](https://ollama.com/) 安装 Ollama。它作为后台服务运行。然后拉取一个对话模型和一个代码补全模型：

```sh
ollama pull qwen2.5-coder:7b-instruct
ollama pull qwen2.5-coder:1.5b-base
```

为什么要两个？对话需要能遵循指令的 **instruct** 模型。代码补全需要经过 fill-in-the-middle 训练的模型，对大多数系列来说是 **base** 或 **code** 变体；instruct 模型会啰嗦而不是补全。补全时速度比深度更重要，所以越小越好：上面的 1.5B 模型在大多数笔记本上不到一秒就能响应。见[支持的模型](/twinny-docs/zh-cn/providers/supported-models/)。

可选，用于工作区搜索：

```sh
ollama pull nomic-embed-text
```

如果你的机器内存少于 8 GB 或没有 GPU，见[选择模型服务器](/twinny-docs/zh-cn/getting-started/choosing-a-server/)了解更小的选项。

## 2. 安装 twinny

从[应用市场](https://marketplace.visualstudio.com/items?itemName=rjmacarthy.twinny)或 [Open VSX](https://open-vsx.org/extension/rjmacarthy/twinny) 安装。详见[安装](/twinny-docs/zh-cn/getting-started/installation/)。

## 3. 让 twinny 找到服务器

首次运行时 twinny 会探测常用的本地端口。Ollama 在 11434 端口响应，twinny 读取其模型列表并创建：

- 使用 instruct 模型的**对话**提供者；
- 使用 base 模型的**自动补全**提供者；
- 如果安装了嵌入模型，还有**嵌入**提供者。

宁可留空也不会指向错误类型的模型。如果你只拉取了 instruct 模型，就只有对话而没有自动补全，直到有代码模型为止。

如果没有响应（Ollama 尚未运行，或端口不是默认值），twinny 会提示一次并打开提供者标签页，提供**再次搜索**和**选择提供者**。启动服务器后再次搜索，或选择 Ollama 预设并输入端口。

## 4. 检查是否正常

从活动栏打开 twinny 侧边栏，进入提供者标签页（机器人图标）。每个分区显示聊天、自动补全和嵌入当前使用的提供者；分区为空表示该项工作尚未设置。提供者卡片上的**测试提供者**会发送一个小请求，显示成功或服务器返回的具体错误。

状态栏在空闲时显示 `</>`，生成时显示旋转图标。点击它可执行快捷操作。

## 5. 试试每个功能

**补全。** 打开源文件，开始写一个函数。稍作停顿后出现灰色建议；按 `Tab` 接受。写一行注释描述接下来要做的事，然后在下一行停顿，就能看到多行建议。

**内联编辑。** 选中几行，按 `Ctrl+I`（macOS 为 `Cmd+I`），输入 “add error handling” 并按 `Enter`。修改以 diff 形式流式出现。按 `Ctrl+Shift+Enter` 接受，或 `Ctrl+Shift+Backspace` 拒绝。

**对话。** 在侧边栏输入 `@` 查看可附加的内容：文件、符号、当前问题、git diff、终端最后的输出，或 `@workspace` 搜索索引。提出问题。回答中的代码块有 **apply**、**copy**、**new file** 和 **terminal** 按钮。

**修复错误。** 把光标放在红色波浪线上，打开灯泡并选择 **Fix with Twinny**。

## 下一步

- [提供者概述](/twinny-docs/zh-cn/providers/overview/)：理解三项工作和预设的原理。
- [工作区索引](/twinny-docs/zh-cn/features/workspace-index/)：让对话在整个项目中找代码。
- [设备](/twinny-docs/zh-cn/providers/devices/)：在笔记本上使用台式机的 GPU。
- [设置](/twinny-docs/zh-cn/reference/settings/)：所有可调项。

## 文件位置

| 内容 | 位置 |
| --- | --- |
| 提供者配置 | VS Code 全局状态；若 `twinny.providerStorageLocation` 为 `file`，则为扩展全局存储中的文件 |
| 会话 | VS Code 全局状态 |
| 提示词模板 | `~/.twinny/templates/*.hbs` |
| 工作区索引 | `~/.twinny/embeddings/`，每个工作区一个文件夹 |
| P2P 身份与已配对设备（命令行节点） | `~/.twinny/node/` |
| P2P 身份（扩展） | VS Code 密钥存储 |
| 日志 | **Twinny** 输出通道 |

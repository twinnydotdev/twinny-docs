---
title: 智能体模式
description: 让对话模型在工作区中读取、搜索、编辑文件并运行命令，逐步进行，每一步都显示在回答中。
---

在智能体模式下，对话模型会先在你的工作区中工作再回答：查找并读取文件、搜索文件、向语言服务器询问代码、编辑文件，以及运行测试、构建等命令。每一步都显示在回答中它发生的位置，因此回答按顺序阅读：模型说了什么、用了哪个工具、接着又说了什么。

智能体模式是**实验性**功能。它需要一个能力足够的代码模型，例如 `qwen3-coder:30b`，并以 8k token 或更大的上下文加载。小模型往往调用工具不当。

## 开启

点击对话输入框左下角的开关，或在输入框中按 `Shift+Tab`。开启时提示符变为醒目的 `❯❯`，模型工作时它会闪动。

这一选择对所有窗口生效。在你第一次切换之前，由 `twinny.chatTools` 设置决定，默认关闭。该设置只从用户设置读取：工作区无法开启智能体模式。

智能体模式需要打开一个文件夹。工作区中有多个文件夹时，工具在第一个文件夹中工作。

## 模型能做什么

| 工具 | 作用 |
| --- | --- |
| `list_dir`、`find_files` | 列出目录；按 glob 查找文件 |
| `read_file` | 读取带行号的文件内容，长文件按范围读取 |
| `grep` | 用正则表达式搜索工作区 |
| `search_code` | 通过[工作区索引](/twinny-docs/zh-cn/features/workspace-index/)按功能查找代码（需已建立索引） |
| `find_symbol` | 查找函数、类、类型或变量的定义位置 |
| `git` | 只读 git：status、diff、log、show、blame、branch（列出）、shortlog、ls-files、rev-parse |
| `diagnostics` | 语言服务器报告的错误和警告 |
| `find_references`、`go_to_definition` | 向语言服务器询问符号在哪里被使用或定义 |
| `rename_symbol` | 通过语言服务器在所有位置重命名符号 |
| `editor_context` | 当前文件、光标所在行、选区和其他打开的文件 |
| `edit_file`、`create_file` | 通过替换文本修改文件；创建新文件 |
| `move_file`、`delete_file` | 移动、重命名或删除文件 |
| `run_command` | 在工作区根目录运行 shell 命令，读取退出码和输出 |

一次回答最多 12 步，之后模型会被要求给出答案。

## 它不能碰的

- 被 `.gitignore` 忽略的文件、`.git`、`node_modules` 以及匹配 `twinny.embeddingIgnoredGlobs` 的文件，对所有工具都不可见，包括 `git` 和 `search_code`。
- 对 `.vscode/` 或 `.gitignore` 的修改总是交给你审阅，无论设置如何。
- 删除 git 中没有副本的文件总是先询问。
- 读取 git 从不询问：`git` 工具只运行不做任何更改的命令。

## 编辑

默认情况下（`twinny.chatToolsEdits` 为 `apply`），编辑直接写入文件并保存，模型继续工作直到任务完成。在文件中按 `Ctrl+Z` 可撤销一次编辑。

设为 `review` 时，每次编辑都以 diff 打开供你接受或拒绝，与[内联编辑](/twinny-docs/zh-cn/features/inline-edit/)相同；模型会等你决定。重命名、移动和删除在对话中询问。

## 命令

`twinny.chatToolsCommands` 决定模型能否运行命令：

| 值 | 行为 |
| --- | --- |
| `ask`（默认） | 每条命令在对话中显示，带 **Run**、**Always run** 和 **Skip** |
| `allow` | 命令直接运行。命令无法像编辑那样撤销 |
| `off` | 模型不能运行命令 |

**Always run** 运行该命令并记住这条完全相同的命令，模型之后可以不经询问再次运行它；其他命令仍会询问。**Twinny - Forget commands set to always run** 清空该列表。

### 自动运行

开启智能体模式后，智能体开关旁有一个 **auto-run** 开关。打开时所有命令都不经询问直接运行。在你第一次切换之前，由 `twinny.chatToolsCommands` 决定它的初始状态；切换之后由开关决定。`off` 仍会关闭命令。

### 用键盘批准

有命令或修改在等待、且输入框为空时：

| 按键 | 操作 |
| --- | --- |
| `Enter` | 运行命令或应用修改 |
| `Shift+Enter` | 总是运行这条命令 |
| `Esc` | 跳过。再按一次 `Esc` 停止回答 |

### 命令在哪里运行

默认情况下（`twinny.chatToolsCommandsRunIn` 为 `background`），每条命令在独立进程中从工作区根目录运行，有 `bash` 时通过 `bash`，否则通过你的 shell。输出边打印边显示在该步骤中。没有任何东西能回答提示，命令运行两分钟后会被停止，因此交互式命令、服务器和监视模式应放在你自己的终端里。模型能看到退出码和输出的末尾。

正在运行的命令在其所在行有停止按钮。它结束该命令及其启动的一切；模型拿到目前为止的输出，被告知你停止了它，然后继续。

把 `twinny.chatToolsCommandsRunIn` 设为 `terminal`，命令会在编辑器旁的 **twinny tools** 终端中运行，你可以观看并输入。这需要 VS Code 的 shell 集成；没有时命令在后台运行。

## 模型与提供者

服务器有自己的工具调用时，工具通过它发送：Ollama、LM Studio、llama.cpp、LiteLLM、Open WebUI 及其他兼容 OpenAI 的服务器、[配对设备](/twinny-docs/zh-cn/providers/devices/)、OpenAI、团队网关，以及支持工具的托管 API（Anthropic、Gemini、Mistral、Groq、OpenRouter 等）。服务器或模型拒绝工具时，以及对没有工具调用的服务器，模型会被要求把调用写在回复中，这适用于任何能进行对话的服务。发生这种情况时 Twinny 输出通道会说明。

每个工具结果被限制在模型上下文的一定比例内；请求放不下时，最早的结果先被裁剪。上下文少于约 8k token 时裁剪频繁，模型会失去线索；输出通道会提醒你。尽可能调大服务器的上下文长度（Ollama 见[上下文大小](/twinny-docs/zh-cn/providers/ollama/)）。

工具结果和会话的其他部分一样经过[密钥屏蔽](/twinny-docs/zh-cn/features/status-and-logs/)。

## 设置

| 设置 | 默认值 | 说明 |
| --- | --- | --- |
| `twinny.chatTools` | `false` | 在你第一次切换前，智能体开关的初始状态 |
| `twinny.chatToolsEdits` | `apply` | `apply` 直接写入编辑；`review` 把每次编辑作为 diff 打开 |
| `twinny.chatToolsCommands` | `ask` | `ask`、`allow` 或 `off`；自动运行开关的初始状态 |
| `twinny.chatToolsCommandsRunIn` | `background` | `background` 在独立进程中运行命令；`terminal` 在 twinny tools 终端中运行 |

这四项都是机器级设置：请在用户设置中设置。

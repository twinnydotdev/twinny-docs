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

一次回答默认最多 12 步，之后模型会被要求用已有信息作答。`twinny.chatToolsMaxSteps`（4 到 40）或[智能体设置](#智能体设置)可以修改。每一步都是对模型的又一次请求。

## 它不能碰的

- 被 `.gitignore` 忽略的文件、`.git`、`node_modules` 以及匹配 `twinny.embeddingIgnoredGlobs` 的文件，对所有工具都不可见，包括 `git` 和 `search_code`。你的[团队](/twinny-docs/teams/policy/#agent-mode)屏蔽的路径也一样。
- 对 `.vscode/`、`*.code-workspace` 文件、`.gitignore` 或项目说明文件（`AGENTS.md`、`CLAUDE.md`、`.github/copilot-instructions.md`）的修改总是交给你审阅，无论设置如何。`.vscode/` 和 `.gitignore` 不区分大小写。
- 链接按其名称和指向的位置一起判断。
- 删除 git 中没有副本的文件，或标记为 skip-worktree 或 assume-unchanged 的文件，总是先询问。
- 读取 git 从不询问：`git` 工具只运行不做任何更改的命令。

## 编辑

默认情况下（`twinny.chatToolsEdits` 为 `apply`），编辑直接写入文件并保存，模型继续工作直到任务完成。在文件中按 `Ctrl+Z` 可撤销一次编辑。

设为 `review` 时，每次编辑都以 diff 打开供你接受或拒绝，与[内联编辑](/twinny-docs/zh-cn/features/inline-edit/)相同；模型会等你决定。重命名、移动和删除在对话中询问。

编辑应用后，模型会得知编辑器在该文件中新报告的错误（最多五个），以便修正自己的错误。该步骤的行会显示 `· 1 new error`。警告不计入。编辑前未打开的文件，只计入它改动的行上的错误。

### 撤销一次回答

修改了文件的回答末尾会列出这些文件，例如 `3 files changed +24 −7`，每个文件带有各自的增删行数，以及它是新建还是删除。点击文件可与回答之前的版本并排比较。**undo** 恢复一个文件，**undo all** 恢复所有文件。撤销通过编辑器进行，因此编辑器自己的撤销可以把智能体的修改找回来。回答结束后又被修改过的文件（被你或后来的回答），只有在你确认后才会恢复。

编辑、新建、删除、移动和重命名都包括在内。在 git 仓库中，命令改动的文件（格式化工具、codemod、`sed -i`）也包括在内：每条命令运行前后通过 git 索引的副本读取工作区，因此你的暂存区不受影响，被忽略的文件也不会出现。二进制文件和超过 1 MB 的文件会被列出，但不能在对话中撤销。最近 50 次回答的副本保存在工作区的存储中。

## 项目说明

工作区根目录下项目的 `AGENTS.md` 会加入智能体模式的指令；没有时依次用 `CLAUDE.md`、`.github/copilot-instructions.md`。某个文件夹自己的 `AGENTS.md` 会在智能体第一次在该文件夹中工作时加入，与根目录的说明不同时以它为准。回答的页脚会列出遵循的文件，点击即可打开。

## 命令

`twinny.chatToolsCommands` 决定模型能否运行命令：

| 值 | 行为 |
| --- | --- |
| `ask`（默认） | 每条命令在对话中显示，带 **Run**、**Always run** 和 **Skip** |
| `allow` | 命令直接运行。命令无法像编辑那样撤销 |
| `off` | 模型不能运行命令 |

**Always run** 运行该命令并记住这条完全相同的命令，模型之后可以不经询问再次运行它；其他命令仍会询问。**Twinny - Forget commands set to always run** 清空该列表。

运行结束的命令在其所在行有复制按钮和终端按钮。终端按钮把命令放进你的终端；在你按下 `Enter` 之前不会运行。

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

正在运行的命令在其所在行有停止按钮。它结束该命令及其启动的一切；模型拿到目前为止的输出，被告知你停止了它，然后继续。命令结束时步骤即结束：命令留在后台运行的东西会随之结束，模型会被告知。对话关闭时，正在运行的命令也会结束。

把 `twinny.chatToolsCommandsRunIn` 设为 `terminal`，命令会在编辑器旁的 **twinny tools** 终端中运行，你可以观看并输入。这需要 VS Code 的 shell 集成；没有时命令在后台运行。

## 智能体设置

开启智能体模式后，智能体开关旁的齿轮会打开智能体模式的权限设置：

| 设置 | 选项 |
| --- | --- |
| changes | `apply` 或 `review`（`twinny.chatToolsEdits`） |
| commands | `ask`、`run` 或 `off`；`run` 即自动运行开关 |
| run in | `background` 或 `terminal`（`twinny.chatToolsCommandsRunIn`） |
| steps per reply | 8、12、20 或 30（`twinny.chatToolsMaxSteps`） |

**ask again** 清除设为总是运行的命令和 MCP 工具。面板还会显示设置了多少个 [MCP 服务器](#mcp-服务器)，并链接到全部智能体设置。你的[团队](/twinny-docs/teams/policy/#agent-mode)设定的规则会标为由团队设定，无法在此放宽。

## MCP 服务器

在用户设置的 `twinny.chatToolsMcpServers` 中列出 [Model Context Protocol](https://modelcontextprotocol.io/) 服务器，它们的工具就会加入智能体模式：

```json
"twinny.chatToolsMcpServers": {
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "<your token>" }
  }
}
```

| 字段 | 说明 |
| --- | --- |
| `command` | 必填。运行服务器的程序，如 `npx` 或 `uvx` |
| `args` | 它的参数 |
| `env` | 它的环境变量，叠加在 VS Code 的环境之上 |
| `cwd` | 它运行的文件夹；默认为工作区根目录 |

服务器在本机通过标准输入输出运行；暂不支持 HTTP 服务器。它随第一次智能体回答启动，随对话关闭而停止。每个工具都会进入每次智能体请求，因此工具很多的服务器会让小模型更难选对。没有设置服务器时，智能体模式的提示和工具与之前相同。

每次调用都会在步骤中显示 **Run**、**Always run** 和 **Skip**，不论自动运行开关如何，因为服务器做的事无法从回答中撤销。**Always run** 记住的是该工具，不论参数。

团队禁止运行命令时也会禁用 MCP 服务器；团队要求每条命令都询问时，每次工具调用也会询问，且没有 **Always run**。团队还可以单独关闭 MCP 服务器；见[团队策略](/twinny-docs/teams/policy/#agent-mode)。

## 模型与提供者

服务器有自己的工具调用时，工具通过它发送：Ollama、LM Studio、llama.cpp、LiteLLM、Open WebUI 及其他兼容 OpenAI 的服务器、[配对设备](/twinny-docs/zh-cn/providers/devices/)、OpenAI、团队网关，以及支持工具的托管 API（Anthropic、Gemini、Mistral、Groq、OpenRouter 等）。服务器或模型拒绝工具时，模型会被要求把调用写在回复中，这适用于任何能进行对话的服务；发生这种情况时 Twinny 输出通道会说明。QVAC、text-generation-webui 以及不支持工具调用的托管 API（例如 Perplexity）一开始就把调用写在回复中。

每个工具结果被限制在模型上下文的一定比例内；请求放不下时，最早的结果先被裁剪。上下文少于约 8k token 时裁剪频繁，模型会失去线索；输出通道会提醒你。尽可能调大服务器的上下文长度（Ollama 见[上下文大小](/twinny-docs/zh-cn/providers/ollama/#上下文大小)）。

工具结果和会话的其他部分一样经过[密钥屏蔽](/twinny-docs/zh-cn/features/status-and-logs/)。

## 设置

| 设置 | 默认值 | 说明 |
| --- | --- | --- |
| `twinny.chatTools` | `false` | 在你第一次切换前，智能体开关的初始状态 |
| `twinny.chatToolsEdits` | `apply` | `apply` 直接写入编辑；`review` 把每次编辑作为 diff 打开 |
| `twinny.chatToolsCommands` | `ask` | `ask`、`allow` 或 `off`；自动运行开关的初始状态 |
| `twinny.chatToolsCommandsRunIn` | `background` | `background` 在独立进程中运行命令；`terminal` 在 twinny tools 终端中运行 |
| `twinny.chatToolsMaxSteps` | `12` | 一次回答在模型被要求作答前最多可用的工具步数，4 到 40 |
| `twinny.chatToolsMcpServers` | `{}` | 智能体模式可使用其工具的 MCP 服务器，按名称配置 |

这六项都是机器级设置：请在用户设置中设置。工作区无法添加 MCP 服务器。

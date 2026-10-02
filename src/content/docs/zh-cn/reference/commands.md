---
title: 命令
description: twinny 的每个命令、出现的位置及作用。
---

命令都可从命令面板（`Ctrl+Shift+P`）使用，但 **Twinny - Status bar options** 除外；**Accept edit** 和 **Reject edit** 只在有内联编辑等待时才列出。许多还出现在右键菜单、侧边栏标题、源代码管理和终端视图中。

## 编辑器

| 命令 | 位置 | 作用 |
| --- | --- | --- |
| **Twinny - Edit with instruction...** | 右键、`Ctrl+I` | 对选区或当前行进行[内联编辑](/twinny-docs/zh-cn/features/inline-edit/) |
| **Twinny - Accept edit** | CodeLens、`Ctrl+Shift+Enter` | 保留待定的内联编辑 |
| **Twinny - Reject edit** | CodeLens、`Ctrl+Shift+Backspace` | 丢弃待定的内联编辑 |
| **Twinny - Explain** | 右键 | 在对话中解释选区 |
| **Twinny - Refactor** | 右键 | 内联编辑：不改变行为地提升可读性 |
| **Twinny - Add types** | 右键 | 内联编辑：添加类型标注 |
| **Twinny - Generate docs** | 右键 | 内联编辑：添加文档注释 |
| **Twinny - Write tests** | 右键 | 为选区（或文件）编写测试到同级测试文件 |
| **Twinny - Add file to context** | 右键编辑器或资源管理器文件 | 把文件附加到下一条对话消息 |
| **Twinny: Add Selection to Context** | 右键选区 | 把选区附加到下一条对话消息 |
| **Stop generation** | 状态栏旋转图标、`Ctrl+Shift+/` | 取消正在流式输出的内容：补全、对话、编辑或审查 |

灯泡（`Ctrl+.`）在错误和警告上提供 **Fix with Twinny**，在选区上提供 **Edit with Twinny**；两者都运行内联编辑命令。

## 侧边栏

| 命令 | 图标 | 作用 |
| --- | --- | --- |
| **Enable twinny sidebar** | | 聚焦 twinny 视图 |
| **Back to chat view** | ← | 从其他标签页返回对话 |
| **Code reviewer** | 拉取请求 | 打开[审查](/twinny-docs/zh-cn/features/code-review/)标签页 |
| **Manage twinny providers** | 机器人 | 打开[提供者](/twinny-docs/zh-cn/providers/overview/)标签页 |
| **Manage twinny templates** | 书本 | 选择哪些模板作为对话建议显示 |
| **Embedding options** | 数据库 | 打开[工作区索引](/twinny-docs/zh-cn/features/workspace-index/)标签页 |
| **Open twinny conversation history** | 时钟 | 搜索、重命名、删除会话 |
| **Open twinny panel chat** | 全屏 | 在编辑器标签页中打开对话 |
| **Twinny - Open conversation as Markdown** | `…` 菜单 | 在新编辑器中以 Markdown 打开整个[会话](/twinny-docs/zh-cn/features/chat/) |
| **Start a new chat** | 加号，对话中 `Ctrl+L` | 开始新会话 |
| **Twinny - Chat keyboard shortcuts** | `…` 菜单，对话中 `?` | 在输入框上方显示[对话按键](/twinny-docs/zh-cn/reference/keyboard-shortcuts/#对话中的按键) |
| **Twinny - Forget commands set to always run** | | 清空[智能体模式](/twinny-docs/zh-cn/features/agent-mode/#命令)可不经询问运行的命令 |
| **Open twinny settings** | 齿轮 | 打开筛选为 twinny 的 VS Code 设置 |

## 源代码管理与终端

| 命令 | 位置 | 作用 |
| --- | --- | --- |
| **Twinny - Generate commit message** | 源代码管理标题（闪光），Git 仓库 | 把[提交信息](/twinny-docs/zh-cn/features/commit-messages/)写入提交框 |
| **Twinny - Write a terminal command from a description** | 终端右键 | 描述命令、确认、运行 |
| **Twinny - Fix the last terminal error** | 终端右键 | 在编辑器中修复或在对话中询问 |

## 设备与团队

| 命令 | 作用 |
| --- | --- |
| **Twinny - Share this computer's Ollama with my other devices (P2P)** | 开始共享并显示配对码；与设备区域的**共享**相同 |
| **Twinny - Open your team's plugins (pull requests, reviews)** | 用一次性代码以已登录状态打开网关页面，[共享给你的插件](/twinny-docs/teams/connect/#plugins-shared-with-you)就在那里。网关版本早于 4.2.8 时，改为把你的团队密钥放到剪贴板 |

## 扩展

| 命令 | 作用 |
| --- | --- |
| **Enable twinny** / **Disable twinny** | 开关扩展（`twinny.enabled`） |
| **Twinny - Show logs** | 打开 Twinny 输出通道 |
| **Twinny - Status bar options** | 点击状态栏项时显示的菜单。不在命令面板中 |
| **Twinny - Set up for your team (gateway, keys, usage)** | 在浏览器中打开 twinny.dev 上的[网关页面](https://twinny.dev/#teams) |

## 命令 id

用于快捷键和 `tasks.json` 的 id 形如 `twinny.<name>`：`twinny.edit`、`twinny.acceptEdit`、`twinny.rejectEdit`、`twinny.explain`、`twinny.refactor`、`twinny.addTypes`、`twinny.generateDocs`、`twinny.addTests`、`twinny.addFileToContext`、`twinny.addSelectionToContext`、`twinny.stopGeneration`、`twinny.sidebar.focus`、`twinny.openChat`、`twinny.review`、`twinny.manageProviders`、`twinny.manageTemplates`、`twinny.embeddings`、`twinny.conversationHistory`、`twinny.openPanelChat`、`twinny.exportConversation`、`twinny.newConversation`、`twinny.settings`、`twinny.generateCommitMessage`、`twinny.terminalCommand`、`twinny.fixTerminalError`、`twinny.shareOllama`、`twinny.openTeamPlugins`、`twinny.enable`、`twinny.disable`、`twinny.showLogs`、`twinny.statusBarMenu`、`twinny.setUpTeam`、`twinny.showShortcuts`、`twinny.forgetAlwaysRunCommands`。

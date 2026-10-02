---
title: 键盘快捷键
description: twinny 在编辑器和对话中的默认键盘快捷键及修改方法。
---

| 快捷键（Windows / Linux） | macOS | 操作 | 条件 |
| --- | --- | --- | --- |
| `Alt+\` | `Alt+\` | 请求代码补全 | 编辑文件时 |
| `Tab` | `Tab` | 接受显示的补全 | 有建议显示时 |
| `Esc` | `Esc` | 忽略显示的补全 | 有建议显示时 |
| `Ctrl+I` | `Cmd+I` | 内联编辑：描述对选区的修改 | 编辑文件时 |
| `Ctrl+Shift+Enter` | `Cmd+Shift+Enter` | 接受待定的内联编辑 | 有编辑待定时 |
| `Ctrl+Shift+Backspace` | `Cmd+Shift+Backspace` | 拒绝待定的内联编辑 | 有编辑待定时 |
| `Ctrl+Shift+/` | `Cmd+Shift+/` | 停止生成（补全、对话、编辑或审查） | twinny 正在生成时 |
| `Ctrl+.` | `Cmd+.` | 灯泡：Fix with Twinny、Edit with Twinny | 在诊断或选区上 |

`Tab`、`Esc` 和 `Ctrl+.` 是 VS Code 自身对内联建议和代码操作的绑定。

## 对话中的按键

这些按键在对话输入框中有效，侧边栏和面板都一样。它们是对话自己的按键，与终端相同：在 macOS 上 `Ctrl` 也是 `Ctrl`。在空输入框按 `?` 查看，或从视图的 `…` 菜单运行 **Twinny - Chat keyboard shortcuts**。

| 按键 | 操作 |
| --- | --- |
| `Enter` | 发送。回答进行中发送的消息会排队到回答结束 |
| `Shift+Enter` | 换行 |
| `Esc` | 停止回答，在对话中任何位置都有效 |
| `Esc` `Esc` | 清空草稿（`↑` 可找回） |
| `Ctrl+C` | 停止回答；没有内容在流式输出时清空草稿。选中文字时为复制 |
| `↑` `↓` | 在空输入框中调出之前的提示 |
| `PgUp` `PgDn` | 滚动对话记录 |
| `Ctrl+L` | 新会话 |
| `Shift+Tab` | 开启或关闭[智能体模式](/twinny-docs/zh-cn/features/agent-mode/) |
| `@` | 添加文件、符号、问题、git 或终端输出作为[上下文](/twinny-docs/zh-cn/features/context/) |
| `?` | 在空输入框中显示或隐藏按键列表 |

智能体模式有命令或修改在等待、且输入框为空时：

| 按键 | 操作 |
| --- | --- |
| `Enter` | 运行命令或应用修改 |
| `Shift+Enter` | 总是运行这条命令 |
| `Esc` | 跳过 |

`Esc` 按以下顺序执行第一个适用的操作：关闭按键列表、跳过等待中的操作、停止回答，连按两次则清空草稿。焦点在对话记录上时输入会进入输入框。

对话的按键不是 VS Code 快捷键，无法在*键盘快捷方式*中修改。

## 修改编辑器快捷键

打开*键盘快捷方式*（`Ctrl+K Ctrl+S`）并搜索 `twinny`。或在 `keybindings.json` 中添加：

```json
[
  { "key": "ctrl+alt+i", "command": "twinny.edit", "when": "editorTextFocus && !editorReadonly" },
  { "key": "ctrl+alt+enter", "command": "twinny.acceptEdit", "when": "twinnyInlineEditPending && editorTextFocus" }
]
```

有用的 `when` 上下文：`twinnyInlineEditPending`（有编辑待定）和 `twinnyGeneratingText`（有内容正在流式输出）。

## 冲突

补全快捷键绑定在 VS Code 内置命令 **Trigger Inline Suggestion**（`editor.action.inlineSuggest.trigger`）上，GitHub Copilot 也把它绑定到 `Alt+\`。两者都安装时请改掉其中一个。`Ctrl+I` 也被一些其他助手绑定；twinny 的绑定只在可写的文本编辑器中生效。

## 建议的额外绑定

没有默认绑定但常用时值得绑定的命令：

| 命令 id | 建议 |
| --- | --- |
| `twinny.addTests` | `Ctrl+Alt+T` |
| `twinny.explain` | `Ctrl+Alt+E` |
| `twinny.terminalCommand` | `` Ctrl+Alt+` `` |
| `twinny.fixTerminalError` | `Ctrl+Alt+F` |
| `twinny.newConversation` | `Ctrl+Alt+N`（对话中 `Ctrl+L` 已可实现） |

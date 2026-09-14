---
title: 键盘快捷键
description: twinny 的默认键盘快捷键及修改方法。
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

## 修改

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
| `twinny.newConversation` | `Ctrl+Alt+N` |

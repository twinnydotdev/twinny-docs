---
title: Keyboard shortcuts
description: Default keyboard shortcuts for twinny, and how to change them.
---

| Shortcut (Windows / Linux) | macOS | Action | When |
| --- | --- | --- | --- |
| `Alt+\` | `Alt+\` | Request a code completion | Editing a file |
| `Tab` | `Tab` | Accept the shown completion | A suggestion is showing |
| `Esc` | `Esc` | Dismiss the shown completion | A suggestion is showing |
| `Ctrl+I` | `Cmd+I` | Inline edit: describe a change to the selection | Editing a file |
| `Ctrl+Shift+Enter` | `Cmd+Shift+Enter` | Accept the pending inline edit | An edit is waiting |
| `Ctrl+Shift+Backspace` | `Cmd+Shift+Backspace` | Reject the pending inline edit | An edit is waiting |
| `Ctrl+Shift+/` | `Cmd+Shift+/` | Stop generation (completion, chat, edit or review) | twinny is generating |
| `Ctrl+.` | `Cmd+.` | Lightbulb: Fix with Twinny, Edit with Twinny | On a diagnostic or selection |

`Tab`, `Esc` and `Ctrl+.` are VS Code's own bindings for inline suggestions and code actions.

## Changing them

Open *Keyboard Shortcuts* (`Ctrl+K Ctrl+S`) and search for `twinny`. Or add to `keybindings.json`:

```json
[
  { "key": "ctrl+alt+i", "command": "twinny.edit", "when": "editorTextFocus && !editorReadonly" },
  { "key": "ctrl+alt+enter", "command": "twinny.acceptEdit", "when": "twinnyInlineEditPending && editorTextFocus" }
]
```

Useful `when` contexts: `twinnyInlineEditPending` (an edit is waiting) and `twinnyGeneratingText` (something is streaming).

## Conflicts

The completion shortcut is on VS Code's built-in **Trigger Inline Suggestion** command (`editor.action.inlineSuggest.trigger`), which GitHub Copilot also binds to `Alt+\`. If both are installed, rebind one. `Ctrl+I` is bound by some other assistants too; twinny's binding applies only in a writable text editor.

## Suggested extras

Commands without a default binding that are worth one if you use them often:

| Command id | Suggestion |
| --- | --- |
| `twinny.addTests` | `Ctrl+Alt+T` |
| `twinny.explain` | `Ctrl+Alt+E` |
| `twinny.terminalCommand` | `Ctrl+Alt+\`` |
| `twinny.fixTerminalError` | `Ctrl+Alt+F` |
| `twinny.newConversation` | `Ctrl+Alt+N` |

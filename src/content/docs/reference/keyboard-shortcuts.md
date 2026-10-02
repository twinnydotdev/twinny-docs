---
title: Keyboard shortcuts
description: Default keyboard shortcuts for twinny in the editor and in the chat, and how to change them.
---

| Shortcut (Windows / Linux) | macOS | Action | When |
| --- | --- | --- | --- |
| `Alt+\` | `Alt+\` | Request a code completion | Editing a file |
| `Tab` | `Tab` | Accept the shown completion | A suggestion is showing |
| `Esc` | `Esc` | Dismiss the shown completion | A suggestion is showing |
| `Ctrl+I` | `Cmd+I` | Inline edit: describe a change to the selection | Editing a file |
| `Ctrl+Shift+Enter` | `Cmd+Shift+Enter` | Accept the pending inline edit | An edit is waiting |
| `Ctrl+Shift+Backspace` | `Cmd+Shift+Backspace` | Reject the pending inline edit | An edit is waiting |
| `Ctrl+Shift+/` | `Ctrl+Shift+/` | Stop generation (completion, chat, edit or review) | twinny is generating |
| `Ctrl+.` | `Cmd+.` | Lightbulb: Fix with Twinny, Edit with Twinny | On a diagnostic or selection |

`Tab`, `Esc` and `Ctrl+.` are VS Code's own bindings for inline suggestions and code actions.

## In the chat

These work in the chat's composer, in the sidebar and in the panel. They are the chat's own keys, as in a terminal: `Ctrl` is `Ctrl` on macOS too. Press `?` on an empty composer to see them, or run **Twinny - Chat keyboard shortcuts** from the view's `…` menu.

| Key | Action |
| --- | --- |
| `Enter` | Send. A message sent while a reply runs is queued until it ends |
| `Shift+Enter` | New line |
| `Esc` | Stop the reply, from anywhere in the chat |
| `Esc` `Esc` | Clear the draft (`↑` brings it back) |
| `Ctrl+C` | Stop the reply, or clear the draft when nothing is streaming. With text selected it copies |
| `↑` `↓` | Earlier prompts, from an empty composer |
| `PgUp` `PgDn` | Scroll the transcript |
| `Ctrl+L` | New conversation |
| `Shift+Tab` | [Agent mode](/twinny-docs/features/agent-mode/) on or off |
| `@` | Add a file, symbol, problems, git or terminal output as [context](/twinny-docs/features/context/) |
| `?` | Show or hide the list of keys, on an empty composer |

When agent mode has a command or change waiting for you and the composer is empty:

| Key | Action |
| --- | --- |
| `Enter` | Run the command, or apply the change |
| `Shift+Enter` | Always run that command |
| `Esc` | Skip it |

`Esc` does the first of these that applies: close the list of keys, skip what is waiting, stop the reply, and, pressed twice, clear the draft. Typing while the focus is on the transcript goes to the composer.

The chat's keys are not VS Code keybindings and cannot be changed in *Keyboard Shortcuts*.

## Changing the editor shortcuts

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
| `twinny.newConversation` | `Ctrl+Alt+N` (`Ctrl+L` already does this inside the chat) |

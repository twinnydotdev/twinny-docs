---
title: Commands
description: Every twinny command, where it appears, and what it does.
---

All commands are available from the command palette (`Ctrl+Shift+P`). Many also appear in context menus, the sidebar header, or the Source Control and terminal views.

## Editor

| Command | Where | What it does |
| --- | --- | --- |
| **Twinny - Edit with instruction...** | Right-click, `Ctrl+I` | [Inline edit](/twinny-docs/features/inline-edit/) of the selection or current line |
| **Twinny - Accept edit** | CodeLens, `Ctrl+Shift+Enter` | Keep the pending inline edit |
| **Twinny - Reject edit** | CodeLens, `Ctrl+Shift+Backspace` | Discard the pending inline edit |
| **Twinny - Explain** | Right-click | Explain the selection in the chat |
| **Twinny - Refactor** | Right-click | Inline edit: improve readability without changing behaviour |
| **Twinny - Add types** | Right-click | Inline edit: add type annotations |
| **Twinny - Generate docs** | Right-click | Inline edit: add documentation comments |
| **Twinny - Write tests** | Right-click | Write tests for the selection (or file) into a sibling test file |
| **Twinny - Add file to context** | Right-click editor or Explorer file | Attach the file to the next chat message |
| **Twinny: Add Selection to Context** | Right-click a selection | Attach the selection to the next chat message |
| **Stop generation** | Status bar spinner, `Ctrl+Shift+/` | Cancel whatever is streaming: completion, chat, edit or review |

The lightbulb (`Ctrl+.`) offers **Fix with Twinny** on errors and warnings and **Edit with Twinny** on a selection; both run the inline edit command.

## Sidebar

| Command | Icon | What it does |
| --- | --- | --- |
| **Enable twinny sidebar** | | Focus the twinny view |
| **Back to chat view** | ← | Return to the chat from another tab |
| **Code reviewer** | pull request | Open the [review](/twinny-docs/features/code-review/) tab |
| **Manage twinny providers** | robot | Open the [Providers](/twinny-docs/providers/overview/) tab |
| **Manage twinny templates** | book | Choose which templates show as chat suggestions |
| **Embedding options** | database | Open the [workspace index](/twinny-docs/features/workspace-index/) tab |
| **Open twinny conversation history** | clock | Search, rename, delete conversations |
| **Open twinny panel chat** | full screen | Open the chat in an editor tab |
| **Start a new chat** | plus | Begin a fresh conversation |
| **Open twinny settings** | gear | Open VS Code settings filtered to twinny |

## Source control and terminal

| Command | Where | What it does |
| --- | --- | --- |
| **Twinny - Generate commit message** | Source Control title (sparkle) | Write a [commit message](/twinny-docs/features/commit-messages/) into the commit box |
| **Twinny - Write a terminal command from a description** | Terminal right-click | Describe a command, confirm it, run it |
| **Twinny - Fix the last terminal error** | Terminal right-click | Fix in the editor or ask in the chat |

## Devices

| Command | What it does |
| --- | --- |
| **Twinny - Share this computer's Ollama with my other devices (P2P)** | Start sharing and show a pairing code; the same as **Share** in the Devices section |

## Extension

| Command | What it does |
| --- | --- |
| **Enable twinny** / **Disable twinny** | Turn the extension on or off (`twinny.enabled`) |
| **Twinny - Show logs** | Open the Twinny output channel |
| **Edit twinny templates** | Open the `~/.twinny/templates/` folder |
| **Twinny - Status bar options** | The menu shown when you click the status bar item |

## Command ids

For keybindings and `tasks.json`, the ids are `twinny.<name>`: `twinny.edit`, `twinny.acceptEdit`, `twinny.rejectEdit`, `twinny.explain`, `twinny.refactor`, `twinny.addTypes`, `twinny.generateDocs`, `twinny.addTests`, `twinny.addFileToContext`, `twinny.addSelectionToContext`, `twinny.stopGeneration`, `twinny.sidebar.focus`, `twinny.openChat`, `twinny.review`, `twinny.manageProviders`, `twinny.manageTemplates`, `twinny.embeddings`, `twinny.conversationHistory`, `twinny.openPanelChat`, `twinny.newConversation`, `twinny.settings`, `twinny.generateCommitMessage`, `twinny.terminalCommand`, `twinny.fixTerminalError`, `twinny.shareOllama`, `twinny.enable`, `twinny.disable`, `twinny.showLogs`, `twinny.templates`.

---
title: Commands
description: Every twinny command, where it appears, and what it does.
---

Commands are available from the command palette (`Ctrl+Shift+P`), except **Twinny - Status bar options**, and **Accept edit** and **Reject edit**, which are listed only while an inline edit is waiting. Many also appear in context menus, the sidebar header, or the Source Control and terminal views.

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
| **Twinny - Open conversation as Markdown** | `…` menu | Open the whole [conversation](/twinny-docs/features/chat/) in a new editor as Markdown |
| **Start a new chat** | plus, `Ctrl+L` in the chat | Begin a fresh conversation |
| **Twinny - Chat keyboard shortcuts** | `…` menu, `?` in the chat | Show the [chat's keys](/twinny-docs/reference/keyboard-shortcuts/#in-the-chat) above the composer |
| **Twinny - Forget commands set to always run** | | Clear the commands [agent mode](/twinny-docs/features/agent-mode/#commands) may run without asking |
| **Open twinny settings** | gear | Open VS Code settings filtered to twinny |

## Source control and terminal

| Command | Where | What it does |
| --- | --- | --- |
| **Twinny - Generate commit message** | Source Control title (sparkle), Git repositories | Write a [commit message](/twinny-docs/features/commit-messages/) into the commit box |
| **Twinny - Write a terminal command from a description** | Terminal right-click | Describe a command, confirm it, run it |
| **Twinny - Fix the last terminal error** | Terminal right-click | Fix in the editor or ask in the chat |

## Devices and teams

| Command | What it does |
| --- | --- |
| **Twinny - Share this computer's Ollama with my other devices (P2P)** | Start sharing and show a pairing code; the same as **Share** in the Devices section |
| **Twinny - Open your team's plugins (pull requests, reviews)** | Open the gateway's page signed in with a one-time code, where the [plugins shared with you](/twinny-docs/teams/connect/#plugins-shared-with-you) are. Against a gateway older than 4.2.8 it puts your team key on the clipboard instead |

## Extension

| Command | What it does |
| --- | --- |
| **Enable twinny** / **Disable twinny** | Turn the extension on or off (`twinny.enabled`) |
| **Twinny - Show logs** | Open the Twinny output channel |
| **Edit twinny templates** | Open the `~/.twinny/templates/` folder in a new window (4.3.5 and later) |
| **Twinny - Status bar options** | The menu shown when you click the status bar item. Not in the command palette |
| **Twinny - Set up for your team (gateway, keys, usage)** | Open the [gateway page](https://twinny.dev/#teams) on twinny.dev in the browser |

## Command ids

For keybindings and `tasks.json`, the ids are `twinny.<name>`: `twinny.edit`, `twinny.acceptEdit`, `twinny.rejectEdit`, `twinny.explain`, `twinny.refactor`, `twinny.addTypes`, `twinny.generateDocs`, `twinny.addTests`, `twinny.addFileToContext`, `twinny.addSelectionToContext`, `twinny.stopGeneration`, `twinny.sidebar.focus`, `twinny.openChat`, `twinny.review`, `twinny.manageProviders`, `twinny.manageTemplates`, `twinny.embeddings`, `twinny.conversationHistory`, `twinny.openPanelChat`, `twinny.exportConversation`, `twinny.newConversation`, `twinny.settings`, `twinny.generateCommitMessage`, `twinny.terminalCommand`, `twinny.fixTerminalError`, `twinny.shareOllama`, `twinny.openTeamPlugins`, `twinny.enable`, `twinny.disable`, `twinny.showLogs`, `twinny.templates`, `twinny.statusBarMenu`, `twinny.setUpTeam`, `twinny.showShortcuts`, `twinny.forgetAlwaysRunCommands`.

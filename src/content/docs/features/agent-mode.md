---
title: Agent mode
description: Let the chat model read, search and edit files and run commands in your workspace, step by step, with each step shown in the reply.
---

In agent mode the chat model works in your workspace before it answers: it finds and reads files, searches them, asks the language servers about the code, edits files and runs commands such as tests and builds. Each step shows in the reply at the point it ran, so the reply reads in order: what the model said, the tool it used, what it said next.

Agent mode is **experimental**. It needs a capable coder model, such as `qwen3-coder:30b`, loaded with a context of 8k tokens or more. Small models tend to call tools badly.

## Turning it on

Click the switch at the bottom left of the chat's composer, or press `Shift+Tab` in the composer. While it is on, the prompt turns to a bright `❯❯`, and it pulses while the model works.

The choice is kept for every window. Until you first switch it, the `twinny.chatTools` setting decides; it is off by default. The setting is read from your user settings only: a workspace cannot turn agent mode on.

Agent mode needs a folder open. With several folders in the workspace, the tools work in the first.

## What the model can do

| Tool | What it does |
| --- | --- |
| `list_dir`, `find_files` | List a directory; find files by glob |
| `read_file` | Read a file's numbered lines, a range at a time in long files |
| `grep` | Search the workspace by regular expression |
| `search_code` | Find code by what it does, through the [workspace index](/twinny-docs/features/workspace-index/), when you have built one |
| `find_symbol` | Find where a function, class, type or variable is defined |
| `git` | Read-only git: status, diff, log, show, blame, branch (listing), shortlog, ls-files, rev-parse |
| `diagnostics` | The errors and warnings the language servers report |
| `find_references`, `go_to_definition` | Ask the language server where a symbol is used or defined |
| `rename_symbol` | Rename a symbol everywhere through the language server |
| `editor_context` | The active file, the cursor line, the selection and the other open files |
| `edit_file`, `create_file` | Change a file by replacing text in it; create a new one |
| `move_file`, `delete_file` | Move, rename or delete a file |
| `run_command` | Run a shell command from the workspace root and read its exit code and output |

A reply takes at most 12 steps by default; then the model is asked to answer with what it has. `twinny.chatToolsMaxSteps` (4 to 40) or the [agent settings](#agent-settings) change that. Each step is another request to the model.

## What it may not touch

- Files ignored by a `.gitignore`, `.git`, `node_modules` and files matching `twinny.embeddingIgnoredGlobs` are off limits to every tool, `git` and `search_code` included. So are paths your [team](/twinny-docs/teams/policy/#agent-mode) blocks.
- Changes to `.vscode/`, a `*.code-workspace` file, a `.gitignore` or the project's instructions (`AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`) are always shown for review, whatever the settings say. `.vscode/` and `.gitignore` are matched in any letter case.
- A link is judged by where it leads as well as by its name.
- Deleting a file git has no copy of, or one marked skip-worktree or assume-unchanged, always asks first.
- Reading git never asks: the `git` tool runs only commands that change nothing.

## Edits

By default (`twinny.chatToolsEdits` set to `apply`) edits go straight into the file and are saved, and the model carries on until the task is done. `Ctrl+Z` in the file undoes an edit.

Set it to `review` and each edit opens as a diff to accept or reject, the same as an [inline edit](/twinny-docs/features/inline-edit/); the model stops until you have decided. Renames, moves and deletes ask in the chat.

After an edit is applied, the model is told of the errors the editor now reports in that file that were not there before, up to five, so it can fix its own mistake. The step's line says `· 1 new error`. Warnings are left out. In a file that was not open before the edit, only errors on the lines it changed count.

### Undoing a reply

A reply that changed files ends with the list of them, such as `3 files changed +24 −7`, each file with its own counts and whether it is new or deleted. Click a file to see it beside what it was before the reply. **undo** puts one file back, **undo all** every file. Undo goes through the editor, so the editor's own Undo brings the agent's change back. A file changed since the reply ended, by you or a later reply, is only put back if you say so.

Edits, new files, deletes, moves and renames are covered. Inside a git repository, so are files a command changed (a formatter, a codemod, `sed -i`): the working tree is read before and after each command through a copy of git's index, so your staging is untouched and ignored files never appear. Binary files and files over 1 MB are listed but cannot be undone from the chat. Copies are kept in the workspace's storage for the last 50 replies.

## Project instructions

The project's `AGENTS.md` at the workspace root goes into agent mode's instructions; without one, `CLAUDE.md`, then `.github/copilot-instructions.md`. A folder's own `AGENTS.md` comes along the first time the agent works in that folder, and wins over the root's where they differ. The reply's footer names the files followed; click to open them.

## Commands

`twinny.chatToolsCommands` decides whether the model may run commands:

| Value | Behaviour |
| --- | --- |
| `ask` (default) | Each command is shown in the chat with **Run**, **Always run** and **Skip** |
| `allow` | Commands run straight away. A command cannot be undone the way an edit can |
| `off` | The model cannot run commands |

**Always run** runs the command and remembers that exact command, so the model can run it again without asking; any other command still asks. **Twinny - Forget commands set to always run** clears the list.

A finished command has a copy button and a terminal button on its line. The terminal button puts the command in your terminal; nothing runs until you press `Enter`.

### Auto-run

With agent mode on, an **auto-run** switch sits next to the agent switch. On, every command runs without asking. Until you first flip it, `twinny.chatToolsCommands` decides where it starts; once flipped, the switch decides. `off` still turns commands off.

### Approving from the keyboard

When a command or change is waiting and the composer is empty:

| Key | Action |
| --- | --- |
| `Enter` | Run the command, or apply the change |
| `Shift+Enter` | Always run that command |
| `Esc` | Skip it. A second `Esc` stops the reply |

### Where commands run

By default (`twinny.chatToolsCommandsRunIn` set to `background`) each command runs in a process of its own, from the workspace root, through `bash` where there is one (your shell otherwise). Its output appears in its step as it prints. Nothing can answer a prompt, and a command is stopped after two minutes, so interactive commands, servers and watch modes belong in a terminal of your own. The model sees the exit code and the end of the output.

A running command has a stop button on its line. It ends that command and anything it started; the model gets the output so far, is told you stopped it, and carries on. A step ends when its command does: anything the command left running in the background is ended with it, and the model is told. Running commands end when the chat closes.

Set `twinny.chatToolsCommandsRunIn` to `terminal` to run commands in the **twinny tools** terminal beside the editor, where you can watch and type into them. That needs VS Code's shell integration; without it, commands run in the background.

## Agent settings

With agent mode on, a gear beside the agent switch opens what agent mode may do:

| Setting | Choices |
| --- | --- |
| changes | `apply` or `review` (`twinny.chatToolsEdits`) |
| commands | `ask`, `run` or `off`; `run` is the auto-run switch |
| run in | `background` or `terminal` (`twinny.chatToolsCommandsRunIn`) |
| steps per reply | 8, 12, 20 or 30 (`twinny.chatToolsMaxSteps`) |

**ask again** forgets the commands and MCP tools set to always run. The panel also says how many [MCP servers](#mcp-servers) are set, and links to all the agent settings. A rule your [team](/twinny-docs/teams/policy/#agent-mode) sets shows as set by your team and cannot be loosened there.

## MCP servers

Name [Model Context Protocol](https://modelcontextprotocol.io/) servers in `twinny.chatToolsMcpServers`, in your user settings, and their tools join agent mode:

```json
"twinny.chatToolsMcpServers": {
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "<your token>" }
  }
}
```

| Field | Notes |
| --- | --- |
| `command` | Required. The program that runs the server, such as `npx` or `uvx` |
| `args` | Its arguments |
| `env` | Environment variables for it, on top of VS Code's |
| `cwd` | The folder it runs in; the workspace root by default |

A server runs on this machine over standard input and output; HTTP servers are not supported yet. It starts with the first agent reply and stops with the chat. Every tool goes into every agent request, so a server with many tools makes small models pick worse. With no servers set, agent mode's prompt and tools are as before.

Each call shows in the steps with **Run**, **Always run** and **Skip**, whatever the auto-run switch says, because nothing a server does can be undone from the reply. **Always run** keeps that tool, whatever its arguments.

A team that takes commands away takes MCP servers away too, and one that asks before every command asks before every tool call, with no **Always run**. A team can also turn MCP servers off on their own; see [Team policy](/twinny-docs/teams/policy/#agent-mode).

## Models and providers

Tools go to the server through its own tool calling where it has one: Ollama, LM Studio, llama.cpp, LiteLLM, Open WebUI and other OpenAI-compatible servers, a [paired device](/twinny-docs/providers/devices/), OpenAI, a [team gateway](/twinny-docs/teams/connect/), and hosted APIs that take tools (Anthropic, Gemini, Mistral, Groq, OpenRouter and others). When a server or model refuses them, the model is asked to write its calls in the reply instead, which works through anything that carries chat; the Twinny output channel says when that happens. QVAC, text-generation-webui and hosted APIs without tool calling (Perplexity, for one) get calls written in the reply from the start.

Each tool result is held to a share of the model's context, and when a request would not fit, the oldest results are trimmed first. With a context under about 8k tokens they are trimmed often and the model loses track; the output channel warns you. Raise the server's context length if you can (for Ollama, see [Context size](/twinny-docs/providers/ollama/#context-size)).

Tool results go through the [secret shield](/twinny-docs/features/status-and-logs/#privacy) like the rest of the conversation.

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| `twinny.chatTools` | `false` | Where the agent switch starts, until you first switch it |
| `twinny.chatToolsEdits` | `apply` | `apply` writes edits straight away; `review` opens each as a diff |
| `twinny.chatToolsCommands` | `ask` | `ask`, `allow` or `off`; where the auto-run switch starts |
| `twinny.chatToolsCommandsRunIn` | `background` | `background` runs commands in a process of their own; `terminal` in the twinny tools terminal |
| `twinny.chatToolsMaxSteps` | `12` | Tool steps one reply may take before the model is asked to answer, 4 to 40 |
| `twinny.chatToolsMcpServers` | `{}` | MCP servers whose tools agent mode can use, by name |

All six are machine settings: set them in your user settings. A workspace cannot add an MCP server.

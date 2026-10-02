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

A reply takes at most 12 steps; then the model is asked for its answer.

## What it may not touch

- Files ignored by a `.gitignore`, `.git`, `node_modules` and files matching `twinny.embeddingIgnoredGlobs` are off limits to every tool, `git` and `search_code` included.
- Changes to `.vscode/` or a `.gitignore` are always shown for review, whatever the settings say.
- Deleting a file git has no copy of always asks first.
- Reading git never asks: the `git` tool runs only commands that change nothing.

## Edits

By default (`twinny.chatToolsEdits` set to `apply`) edits go straight into the file and are saved, and the model carries on until the task is done. `Ctrl+Z` in the file undoes an edit.

Set it to `review` and each edit opens as a diff to accept or reject, the same as an [inline edit](/twinny-docs/features/inline-edit/); the model stops until you have decided. Renames, moves and deletes ask in the chat.

## Commands

`twinny.chatToolsCommands` decides whether the model may run commands:

| Value | Behaviour |
| --- | --- |
| `ask` (default) | Each command is shown in the chat with **Run**, **Always run** and **Skip** |
| `allow` | Commands run straight away. A command cannot be undone the way an edit can |
| `off` | The model cannot run commands |

**Always run** runs the command and remembers that exact command, so the model can run it again without asking; any other command still asks. **Twinny - Forget commands set to always run** clears the list.

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

A running command has a stop button on its line. It ends that command and anything it started; the model gets the output so far, is told you stopped it, and carries on.

Set `twinny.chatToolsCommandsRunIn` to `terminal` to run commands in the **twinny tools** terminal beside the editor, where you can watch and type into them. That needs VS Code's shell integration; without it, commands run in the background.

## Models and providers

Tools go to the server through its own tool calling where it has one: Ollama, LM Studio, llama.cpp, LiteLLM, Open WebUI and other OpenAI-compatible servers, a [paired device](/twinny-docs/providers/devices/), OpenAI, a [team gateway](/twinny-docs/teams/connect/), and hosted APIs that take tools (Anthropic, Gemini, Mistral, Groq, OpenRouter and others). When a server or model refuses them, and for servers without tool calling, the model is asked to write its calls in the reply instead, which works through anything that carries chat. The Twinny output channel says when that happens.

Each tool result is held to a share of the model's context, and when a request would not fit, the oldest results are trimmed first. With a context under about 8k tokens they are trimmed often and the model loses track; the output channel warns you. Raise the server's context length if you can (for Ollama, see [Context size](/twinny-docs/providers/ollama/#context-size)).

Tool results go through the [secret shield](/twinny-docs/features/status-and-logs/#privacy) like the rest of the conversation.

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| `twinny.chatTools` | `false` | Where the agent switch starts, until you first switch it |
| `twinny.chatToolsEdits` | `apply` | `apply` writes edits straight away; `review` opens each as a diff |
| `twinny.chatToolsCommands` | `ask` | `ask`, `allow` or `off`; where the auto-run switch starts |
| `twinny.chatToolsCommandsRunIn` | `background` | `background` runs commands in a process of their own; `terminal` in the twinny tools terminal |

All four are machine settings: set them in your user settings.

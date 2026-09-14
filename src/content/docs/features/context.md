---
title: Context and mentions
description: Everything you can attach to a chat message, what is sent, and the limits.
---

A model can only answer about what it is shown. twinny makes attaching the right thing quick, and keeps each source bounded so a small model is not swamped.

## The `@` menu

Type `@` in the message box. A category list appears; pick one, then an item, or keep typing to filter. Attached items show as chips above the message box and can be removed before sending.

| Mention | What is sent | Limits |
| --- | --- | --- |
| `@files` then a name | The file's contents, labelled with its path. Type part of the name to search the workspace; the list comes from the Explorer's file tree, so ignored folders are excluded | Whole file |
| `@symbols` then a name | One function, class, method or other symbol found through the language server, with just its code and its file and line. The language server for the file must be active | Up to 30 matches shown |
| `@workspace` | A search of the [workspace index](/twinny-docs/features/workspace-index/) for the question, returning the best chunks expanded to their enclosing function and the file's imports | Up to 6 chunks, 3,000 characters each, 12,000 total |
| `@problems` | Errors and warnings from the Problems panel, with file, line and message | First 50 |
| `@git` | The current branch, `git status --short`, and the working tree diff | Diff cut at 16,000 characters on a file boundary |
| `@terminal` | The last command run in the active terminal and what it printed, through VS Code's shell integration | Last 200 lines or 12,000 characters |

The words `@workspace`, `@problems`, `@git` and `@terminal` are removed from the question before it is sent; the model sees the attached block instead.

## Other ways to attach

- **Right-click a file** in the Explorer or an editor: **Twinny - Add file to context**.
- **Right-click a selection**: **Twinny: Add Selection to Context**. The selection is attached with its file and line range.
- **Select code and send.** Code selected in the editor when you press Send is attached automatically; the character count shows under the composer.
- **Images.** Paste or drop an image into the message. It is sent as an image part for models that accept them (`llama3.2-vision`, `llava`, hosted GPT and Claude models); other models ignore it.
- **Commands.** *Explain* attaches the selection; *Fix the last terminal error* → *Ask in chat* attaches the output and up to three referenced files; code review attaches a summary of the diff.

## How context is laid out for the model

Attached files and selections are formatted as labelled blocks with their path (and line range where relevant), then the question. Workspace results come after a short instruction telling the model to use the labels and ignore irrelevant blocks. Problems, git and terminal each get their own labelled section. The system message comes from `system.hbs`; see [Prompt templates](/twinny-docs/features/templates/).

All of this counts against the model's context window. Ollama's default window is small; if answers ignore attached files or the server reports the prompt is too long, raise `num_ctx` (see [Ollama](/twinny-docs/providers/ollama/#context-size)) or attach less.

## Choosing context well

- **One file beats the workspace** when you know where the answer is. `@workspace` is for "where is…" and "how does…" questions across a project.
- **Symbols beat files** for a question about one function: the model reads 40 lines instead of 400.
- **Problems plus the file** is the right pair for "why is this red".
- **Git** is good for "write a summary of what I changed" and "what did I miss".
- **Terminal** turns a failing command into a question without copying and pasting.

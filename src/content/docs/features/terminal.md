---
title: Terminal
description: Write shell commands from a description and fix the last terminal error.
---

Both terminal features read what a command printed through VS Code's shell integration, which is on by default in VS Code 1.93 and later for bash, zsh, fish and PowerShell. twinny keeps the last five runs per terminal, up to 200 KB of output each, and sends the model the tail of the relevant one (200 lines or 12,000 characters).

## Write a command from a description

Run **Twinny - Write a terminal command from a description** from the command palette or the terminal's right-click menu.

1. Describe what you want: "list the ten largest files under src", "find TODO comments added this week", "rebuild the docker image without cache".
2. twinny writes one command line for your shell and platform. The prompt tells the model the shell, the OS, the working directory, and the previous command with its output, so "again but sorted by size" works.
3. The command appears in an input box. Read it, edit it if you like, and press `Enter` to run it in the **Twinny** terminal, or `Escape` to cancel. **Nothing runs without that confirmation.**

The model is told to reply with one line and no explanation, to use pipes or `&&` rather than a script, not to invent flags, and never to include destructive commands unless the request asks for exactly that. Read the command anyway; small models make mistakes.

## Fix the last terminal error

When a command fails, run **Twinny - Fix the last terminal error** (command palette or terminal right-click). twinny reads the last command and its output, strips terminal colour codes, and finds file and line references in it (`src/app.ts:42:7`, `File "main.py", line 12`, and similar). It then offers:

- **Fix in editor**: opens the first referenced file at that line, selects the enclosing function (or the line), and runs an [inline edit](/twinny-docs/features/inline-edit/) with the error as the instruction, so the fix arrives as a diff you accept or reject.
- **Ask in chat**: sends the command and its output to the chat with the code around each referenced line attached (up to three files), and asks for an explanation and a fix.

If the output names no files, only the chat option is offered.

## `@terminal` in chat

Type `@terminal` in any message to attach the last command and its output to the question. Useful for "what does this warning mean" or "summarise these test failures".

## The Twinny terminal

Commands twinny runs go to a terminal named **Twinny**, created on first use and reused afterwards. Code blocks in the chat with a **terminal** button are pasted there too, ready to run when you press `Enter` in the terminal.

## Notes

- Shell integration must be on for output capture. If twinny reports there is no terminal output, check *Terminal › Integrated › Shell Integration: Enabled* and that the shell is one of the supported ones. Output produced before twinny was installed is not available.
- Everything the model sees is what the terminal printed. Secrets printed to the terminal will be in the prompt; clear the terminal first if that matters.

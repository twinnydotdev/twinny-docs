---
title: Quick start
description: From nothing to working code completion and chat in a few minutes.
---

This walkthrough uses [Ollama](https://ollama.com/), the most common local server. Other servers work the same way once they are running; see [Providers](/twinny-docs/providers/overview/). If you would rather use a hosted API, skip to step 3 and pick a hosted preset.

## 1. Install Ollama and two models

Install Ollama from [ollama.com](https://ollama.com/). It runs as a background service. Then pull one model for chat and one for code completion:

```sh
ollama pull qwen2.5-coder:7b-instruct
ollama pull qwen2.5-coder:1.5b-base
```

Why two? Chat wants an **instruct** model that follows directions. Code completion wants a model trained for fill-in-the-middle, which for most families is the **base** or **code** variant; instruct models chatter instead of completing. Smaller is better for completion, where speed matters more than depth: the 1.5B model above answers in a fraction of a second on most laptops. See [Supported models](/twinny-docs/providers/supported-models/).

Optionally, for workspace search:

```sh
ollama pull nomic-embed-text
```

If your machine has less than 8 GB of memory or no GPU, see [Choosing a model server](/twinny-docs/getting-started/choosing-a-server/) for smaller options.

## 2. Install twinny

Install from the [Marketplace](https://marketplace.visualstudio.com/items?itemName=rjmacarthy.twinny) or [Open VSX](https://open-vsx.org/extension/rjmacarthy/twinny). Details in [Installation](/twinny-docs/getting-started/installation/).

## 3. Let twinny find the server

On first run twinny probes the usual local ports. Ollama answers on 11434, so twinny reads its model list and creates:

- a **chat** provider with the instruct model,
- an **autocomplete** provider with the base model,
- an **embeddings** provider if an embedding model is installed.

A job is left unset rather than pointed at the wrong kind of model. If you only pulled an instruct model, you get chat but no autocomplete until a code model is present.

If nothing answers (Ollama not running yet, or a non-default port), twinny says so once and opens the Providers tab with **Search again** and **Choose a provider**. Start the server and search again, or pick the Ollama preset and type the port.

## 4. Check it works

Open the twinny sidebar from the activity bar and go to the Providers tab (robot icon). Press **Check setup**. Each job reports *Working*, *Failing* or *Not set*; a failing one has an **Open provider** link that takes you to the form, where **Test provider** shows the exact error.

The status bar shows `</>` when twinny is idle and a spinner while it is generating. Click it for quick actions.

## 5. Try each feature

**Completion.** Open a source file and start typing a function. A grey suggestion appears after a short pause; press `Tab` to accept it. Type a comment describing what the next lines should do and pause on the next line to see a multi-line suggestion.

**Inline edit.** Select a few lines, press `Ctrl+I` (`Cmd+I` on macOS), type "add error handling" and press `Enter`. The change streams in as a diff. Press `Ctrl+Shift+Enter` to accept or `Ctrl+Shift+Backspace` to reject.

**Chat.** In the sidebar, type `@` to see what you can attach: a file, a symbol, the current problems, the git diff, the terminal's last output, or `@workspace` for a search of the index. Ask a question. Code blocks in the answer have **apply**, **copy**, **new file** and **terminal** buttons.

**Fix an error.** Put the cursor on a red squiggle, open the lightbulb and choose **Fix with Twinny**.

## Next steps

- [Providers overview](/twinny-docs/providers/overview/) to understand the three jobs and how presets work.
- [Workspace index](/twinny-docs/features/workspace-index/) to let chat find code across the project.
- [Devices](/twinny-docs/providers/devices/) to use a desktop GPU from a laptop.
- [Settings](/twinny-docs/reference/settings/) for everything you can tune.

## Where things live

| What | Where |
| --- | --- |
| Provider configuration | VS Code global state, or a file in the extension's global storage if `twinny.providerStorageLocation` is `file` |
| Conversations | VS Code global state |
| Prompt templates | `~/.twinny/templates/*.hbs` |
| Workspace indexes | `~/.twinny/embeddings/`, one folder per workspace |
| P2P identity and paired devices (command-line node) | `~/.twinny/node/` |
| P2P identity (extension) | VS Code secret storage |
| Logs | The **Twinny** output channel |

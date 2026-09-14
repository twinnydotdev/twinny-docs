---
title: Introduction
description: What twinny is, what it is for, and how it is built.
---

twinny is an AI coding assistant for Visual Studio Code that runs against a model server **you** choose. It was built for people who want the useful parts of a Copilot-style assistant, code completion, chat about their code, edits and reviews, without sending their code to a service they do not control and without a subscription.

## Principles

**Local first.** twinny is designed around servers that run on your own hardware: Ollama, LM Studio, llama.cpp and anything that speaks the OpenAI API. Hosted APIs are supported too, but nothing in twinny requires one.

**Nothing leaves your machine unless you point it somewhere.** There is no account, no telemetry and no relay. Requests go to the server address you configured and nowhere else. The one networked feature that is not a plain HTTP request, [Devices](/twinny-docs/providers/devices/), connects your own machines to each other over an encrypted peer-to-peer link.

**Small, explicit features.** twinny does not run an autonomous agent over your repository. Every feature is a single thing you ask for and can see the result of: a suggestion you accept with Tab, an edit you review as a diff, a command you confirm before it runs. This is deliberate: it keeps the tool predictable, and it works well with the small models that fit on a laptop.

**Works with weak models.** Prompts are short, context is chosen carefully, and output is cut at sensible boundaries, so a 1.5B or 7B model gives useful results.

## What you get

| Feature | In one line | Learn more |
| --- | --- | --- |
| Code completion | Ghost-text suggestions as you type, from a fill-in-the-middle model | [Code completion](/twinny-docs/features/code-completion/) |
| Inline edit | `Ctrl+I`, describe a change, review it as a diff | [Inline edit](/twinny-docs/features/inline-edit/) |
| Chat | Ask about your code in the sidebar, with `@` mentions for context | [Chat](/twinny-docs/features/chat/) |
| Context and mentions | Files, symbols, problems, git, terminal output and workspace search | [Context](/twinny-docs/features/context/) |
| Workspace index | Embeddings plus keyword search plus a local reranker | [Workspace index](/twinny-docs/features/workspace-index/) |
| Code review | Review the working tree, a branch, or a GitHub pull request | [Code review](/twinny-docs/features/code-review/) |
| Commit messages | One click in the Source Control view | [Commit messages](/twinny-docs/features/commit-messages/) |
| Terminal | Write a command from a description, fix the last error | [Terminal](/twinny-docs/features/terminal/) |
| Devices | Use another of your computers' GPU over P2P | [Devices](/twinny-docs/providers/devices/) |
| Prompt templates | Every prompt is a Handlebars file you can edit | [Templates](/twinny-docs/features/templates/) |

## How it fits together

```
 VS Code ──► twinny extension ──► provider ──► model server
                 │                  (chat, autocomplete, embeddings)
                 ├─ sidebar webview (chat, providers, review, index)
                 ├─ inline completion provider (ghost text)
                 ├─ inline edit (diff regions, CodeLens, code actions)
                 ├─ workspace index (LanceDB + local reranker)
                 └─ P2P runtime (gateway to paired devices)
```

A **provider** is one model on one server for one job. You can have several and switch between them. The three jobs, chat, autocomplete and embeddings, want different kinds of model; the [Providers overview](/twinny-docs/providers/overview/) explains which.

## Requirements

- Visual Studio Code 1.93 or newer, or a compatible build such as VSCodium.
- A model server: something local (see [Choosing a model server](/twinny-docs/getting-started/choosing-a-server/)), a paired device, or a hosted API key.
- For the terminal features, VS Code's shell integration, which is on by default for bash, zsh, fish and PowerShell.

## Licence

twinny is open source under the MIT licence. The code is at [github.com/twinnydotdev/twinny](https://github.com/twinnydotdev/twinny).

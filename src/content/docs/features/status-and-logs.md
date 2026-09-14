---
title: Status bar, logs and privacy
description: Reading twinny's status bar item, using the output channel, and what leaves your machine.
---

## The status bar item

twinny owns one item on the right of the status bar.

| Shows | Meaning |
| --- | --- |
| `</>` | Idle, auto-suggest on |
| `</> off` | Idle, auto-suggest off; `Alt+\` still works |
| spinner | A completion, chat, edit or review is running; click to stop it |
| hidden | twinny is disabled (`twinny.enabled` is false) |

Hovering shows the active autocomplete model and provider and whether auto-suggest is on. Clicking while idle opens a menu:

- turn auto-suggest on or off,
- open the chat,
- manage providers,
- open twinny's settings,
- show the log.

Clicking while busy runs **Stop generation**.

## The Twinny output channel

Everything twinny does is written to the **Twinny** channel in the Output panel. Open it with **Twinny - Show logs**, from the status bar menu, or by choosing *Twinny* in the Output panel's dropdown.

The channel is a VS Code log channel, so each line has a timestamp and a level, and the level picker in the panel (or **Developer: Set Log Level…**) chooses how much you see:

| Level | What you see |
| --- | --- |
| Info | One line when a request goes out and one when it returns: the job, the provider and model, the timing, the size of the prompt and reply, and why generation stopped (stop token, line limit, block end, cancelled...) |
| Debug | Also the full prompt and the full reply, cut to 8,000 characters each |
| Warning / Error | Failures with the provider's raw message. Always written |

`twinny.enableLogging` (on by default) controls Info and Debug; warnings and errors are written regardless. API keys and bearer tokens are redacted before anything is written.

Reading the log answers most "why did it do that" questions: whether the FIM template matched, how long the model took, whether the prompt was too long, which chunks `@workspace` chose.

## Privacy

twinny has no account, no telemetry, and no server of its own. What leaves your machine is exactly what you point it at:

| You use | What is sent | To |
| --- | --- | --- |
| A local server | Prompts and context | That server, on your machine |
| A paired device | Prompts and context, encrypted | Your other machine |
| A hosted API | Prompts and context | That vendor |
| GitHub pull request review | Repository owner, name, PR number, your token | GitHub |
| Nothing else | | Nowhere |

Prompts and context mean: the code around the cursor and any completion context; the chat message and everything attached to it; the selection for inline edits; diffs for reviews and commit messages; the last terminal output for terminal features; file chunks for embedding.

The workspace index reranker runs inside the extension. The P2P DHT learns only that a key is reachable at an address. No usage data is collected by twinny's authors, and the extension makes no requests to twinny.dev or anywhere else on its own.

## Files twinny writes

| Path | Contents |
| --- | --- |
| `~/.twinny/templates/` | Prompt templates |
| `~/.twinny/embeddings/<workspace>/` | Workspace index (LanceDB) and manifest |
| `~/.twinny/node/` | Command-line node identity and trusted devices |
| VS Code global state | Providers (by default), conversations, paired devices, settings chosen in the sidebar |
| VS Code secret storage | P2P identity for the extension |
| Extension global storage | Providers when `twinny.providerStorageLocation` is `file`; the P2P host lock |

All of it can be deleted; twinny recreates what it needs.

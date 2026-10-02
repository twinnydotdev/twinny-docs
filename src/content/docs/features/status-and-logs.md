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
| A team gateway | Prompts and context, and the open workspace's name for routing rules | Your team's gateway and the backends behind it. It keeps the content only if your team has switched recording on, and says so before you connect; see [Connect to a team](/twinny-docs/teams/connect/#what-happens-to-your-code) |
| GitHub pull request review | Repository owner, name, PR number, your token | GitHub |
| Nothing else | | Nowhere |

Prompts and context mean: the code around the cursor and any completion context; the chat message and everything attached to it; the selection for inline edits; diffs for reviews and commit messages; the last terminal output for terminal features; file chunks for embedding; and, with [agent mode](/twinny-docs/features/agent-mode/) on, whatever the model's tools read in the workspace (files, search results, git output, command output).

The workspace index reranker runs inside the extension. The P2P DHT learns only that a key is reachable at an address. No usage data is collected by twinny's authors, and the extension makes no requests to twinny.dev or to anywhere you have not set up. Requests to your own servers can start without a prompt from you, such as the [warm-up](/twinny-docs/features/code-completion/#warm-up) that loads the completion model on a local server.

### Secret shield

API keys, tokens, private keys and passwords in a prompt are replaced with placeholders such as `REDACTED_GITHUB_TOKEN_1` before the request is sent, and put back wherever the reply uses them, so the model never sees the value and the code it writes still works. It covers chat (including agent mode's tool results), completions, inline edit and embeddings. It knows the GitHub, GitLab, AWS, Stripe, Slack, OpenAI, Anthropic, Google, Hugging Face and npm token formats, PEM private keys, JWTs, passwords in URLs, and secret-named values in code and `.env` files; values such as `process.env.X` or `<your-key>` are left alone. A chat reply shows **N secrets withheld** and which kinds; completions log it to the **Twinny** channel.

`twinny.secretShield` sets when it runs:

| Value | Shields requests to |
| --- | --- |
| `offMachine` (default) | Hosted APIs, a team gateway, a paired device, and any server not on this machine (`localhost`, `127.x.x.x`, `0.0.0.0` and `::1` count as this machine) |
| `always` | Local servers too |
| `off` | Nothing; prompts are sent as they are |

A team gateway can shield prompts again before they reach its backends; see [Policy](/twinny-docs/teams/policy/#rules-the-gateway-applies).

## Files twinny writes

| Path | Contents |
| --- | --- |
| `~/.twinny/templates/` | Prompt templates |
| `~/.twinny/embeddings/<workspace>/` | Workspace index (LanceDB) and manifest |
| `~/.twinny/node/` | Command-line node identity and trusted devices |
| VS Code global state | Providers (by default), conversations, paired devices, settings chosen in the sidebar, commands set to always run |
| VS Code secret storage | P2P identity for the extension; team gateway keys |
| Extension global storage | Providers when `twinny.providerStorageLocation` is `file`; the P2P host lock |

All of it can be deleted; twinny recreates what it needs.

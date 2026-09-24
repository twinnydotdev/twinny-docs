---
title: What's new
description: The features added to twinny in each release, with links to their pages. The full changelog is in the repository.
---

The full list of changes, fixes included, is in [CHANGELOG.md](https://github.com/twinnydotdev/twinny/blob/main/CHANGELOG.md) in the repository and on the extension's Marketplace page. This page is the short version: what you can do now that you could not before.

## 4.2.7 · 24 September 2026

- **The completion model is loaded before you type.** When VS Code starts or regains focus, twinny asks a local model server (Ollama, LM Studio, llama.cpp, or an OpenAI-compatible server on this machine) to load the [completion](/twinny-docs/features/code-completion/) model, so the first suggestion of the day no longer waits for it: with CodeLlama 7B on Ollama, 11 to 17 seconds became 0.06. Nothing is sent when the model was used in the last four minutes, and hosted APIs are never called. `twinny.warmUpModel` turns it off.
- **The gateway shields secrets for every client.** `twinny-server` swaps credentials in prompts for placeholders before a request reaches a backend and puts them back in the reply, for the extension, the TUI and Neovim alike. It is a [gateway policy](/twinny-docs/teams/policy/#rules-the-gateway-applies), `policy.secretShield` or the admin page's **Policy** tab: `offMachine` (the default) covers hosted APIs, backends on other hosts and the team pool; `always` adds backends on the gateway's own host; `off` forwards prompts as they arrive.

## 4.2.6 · 24 September 2026

- **Secret shield.** API keys, tokens, private keys and passwords in a prompt are replaced with placeholders such as `REDACTED_GITHUB_TOKEN_1` before the request leaves your machine, and put back wherever the reply uses them, so the model never sees the value and the code it writes still works. Chat, completions, inline edit and embeddings are all covered. It knows the GitHub, GitLab, AWS, Stripe, Slack, OpenAI, Anthropic, Google, Hugging Face and npm token formats, PEM private keys, JWTs, passwords in URLs, and secret-named values in code and `.env` files; `process.env.X` and `<your-key>` are left alone. A chat reply shows **N secrets withheld** and which kinds. `twinny.secretShield` picks when it runs: `offMachine` (the default) for anything not on this computer, `always` for local servers too, or `off`. See [Privacy](/twinny-docs/features/status-and-logs/#privacy).

## 4.2.5 · 23 September 2026

All on the gateway's [pull-request reviews](/twinny-docs/teams/plugins/).

- **Reviews no longer end mid-sentence.** Reasoning models are asked not to think the standard OpenAI way (`reasoning_effort: "none"`), which Ollama's OpenAI-compatible route honours where `think: false` was ignored.
- **A cut-off answer says so.** A review the output cap cut is kept and tagged **cut short**, with the reason and how much of the budget went on thinking.
- **Ask about a review.** A box under a finished review takes questions; the exchange stays on the review as a thread and nothing in it is posted to the host.

## 4.2.4 · 23 September 2026

All in [chat](/twinny-docs/features/chat/).

- **Replies say who wrote them**: the model, how long it took and, when the backend reports it, tokens per second, under each reply and saved with the conversation.
- **Continue a stopped reply**, and **Esc stops a reply** while the composer has focus.
- **Earlier prompts with ↑ and ↓** from an empty composer, across conversations, as in a shell.
- **Insert at cursor** next to *apply* on code blocks: straight into the editor, no diff to review.
- **Open conversation as Markdown** from the sidebar's `…` menu or the panel toolbar.
- Long questions fold behind *Show more*, empty code blocks are not shown, and the sidebar keeps a half-written prompt, a streaming reply and its scroll position when you switch views and back.

## 4.2.2 and 4.2.3 · 23 September 2026

- **Qwen3-Coder completes code.** Models whose name contains `qwen3-coder` get a new [FIM template](/twinny-docs/features/code-completion/#fim-templates) that sends the fill-in-the-middle prompt as a chat turn, which is how that model was trained.
- A suggestion made in an empty file no longer follows whatever you type next.
- **[Prompt templates](/twinny-docs/features/templates/) are sturdier.** A template that is missing, blank or will not parse falls back to the built-in copy and says so in the output channel; prompts are no longer HTML-escaped; the `eq` helper is available to every template.

## 4.2.1 · 22 September 2026

- The Providers tab has a card for whoever has the models: the quick-start command and a link to the [gateway page](https://twinny.dev/#teams). The same link is the command *Twinny - Set up for your team*.
- One information message, once, two weeks after first use on a machine not connected to a team, saying the gateway exists.
- A **[30-day Team trial](/twinny-docs/teams/licensing/#trying-it-first)** with every feature, issued by email from twinny.dev, no card.

## 4.2 · September 2026

All on the gateway side, for teams.

- **[Plugins](/twinny-docs/teams/plugins/)** on the admin page, switched on from a store, as a licence feature. GitHub, GitLab, Gitea and Bitbucket list every open pull request across the repositories you watch, with checks, approvals and where you stand; **review now** sends one to a chat model your gateway already serves, auto-review does it while the models are idle, and the review can be posted back to the host. Open issues are triaged the same way: labels, a duplicate, a priority, a first reply.
- **[Slack, Discord and Microsoft Teams](/twinny-docs/teams/plugins/#slack-discord-and-teams)** hear about finished reviews, new pulls, failing checks, backups and backends going down.
- **[SSO sign-in](/twinny-docs/teams/plugins/#sso-sign-in)** with any OpenID Connect provider: developers sign in and VS Code opens connected, no invites to send.
- **[Shared context](/twinny-docs/teams/plugins/#shared-context)**: one index of the team's repositories on the gateway, searched from every developer's chat.
- **[Backups](/twinny-docs/teams/plugins/#backups)** nightly to a directory or an S3-compatible bucket, optionally encrypted, restored from the command line.
- **[Audit log, read-only admins and metrics](/twinny-docs/teams/operations/)**: a hash-chained log of every admin change, admin keys that can only look, and Prometheus at `/metrics`.
- **[Costs](/twinny-docs/teams/operations/#costs)** on the Usage page when an alias has a price.
- **[Routing rules and a team system prompt](/twinny-docs/teams/policy/)** in team policy: keep a workspace on local backends or on named aliases, and put a prompt before every chat.
- **[A queue](/twinny-docs/teams/operations/#when-every-slot-is-busy)** instead of an error when every slot on the gateway is busy.
- A **Helm chart** for Kubernetes. See [Run a gateway](/twinny-docs/teams/gateway/#kubernetes).

## 4.1 · 18 September 2026

- **[Teams](/twinny-docs/teams/overview/)**: `twinny-server`, a gateway on the machine with the models that serves chat, autocomplete and embeddings to the whole team, with a key per developer, usage per person, an admin page, and [invite links](/twinny-docs/teams/gateway/#4-add-developers) that open VS Code.
- **[Team GPU pooling](/twinny-docs/teams/overview/)**: a developer flips *Share this computer* and their local server serves the team through the gateway.
- **[Licensing and seats](/twinny-docs/teams/licensing/)**: five seats free for good; a token bought by card raises the count and switches on [policy](/twinny-docs/teams/policy/) and [recording](/twinny-docs/teams/recording/).
- Mistral fixes for chat and autocomplete, and the right autocomplete prompt format behind a gateway alias.

## 4.0 · September 2026

The 4.x rewrite of the extension.

- **[Code completion](/twinny-docs/features/code-completion/)** rebuilt around a completion stream with a termination policy, type-through continuation, context from imports, the language server and recent edits.
- **[Inline edit](/twinny-docs/features/inline-edit/)**: Ctrl+I, describe a change, accept or reject it per hunk in the editor.
- **[Context and mentions](/twinny-docs/features/context/)**: `@git`, `@terminal` and `@symbol` join files, problems and the workspace.
- **[Workspace index](/twinny-docs/features/workspace-index/)**: incremental, hybrid keyword and vector search, reranked, with sources shown under replies.
- **[Terminal](/twinny-docs/features/terminal/)**: write a command from a description, or fix the last error.
- **[Devices](/twinny-docs/providers/devices/)**: another of your computers as a backend over an encrypted peer-to-peer link, replacing Symmetry.
- **[Providers](/twinny-docs/providers/overview/)** discovered on first run, tested from the card, imported and exported.

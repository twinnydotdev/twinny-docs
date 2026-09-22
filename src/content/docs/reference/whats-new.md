---
title: What's new
description: The features added to twinny in each release, with links to their pages. The full changelog is in the repository.
---

The full list of changes, fixes included, is in [CHANGELOG.md](https://github.com/twinnydotdev/twinny/blob/main/CHANGELOG.md) in the repository and on the extension's Marketplace page. This page is the short version: what you can do now that you could not before.

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

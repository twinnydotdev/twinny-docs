---
title: Teams
description: One gateway on your own hardware serves twinny to your whole team, with a key per developer and usage per person.
---

twinny is free and open source for individuals, and stays that way. Teams get one more thing: a **gateway**. It is a small server (`twinny-server`) that runs on the machine with the models and serves chat, autocomplete and embeddings to every developer's VS Code, so the team shares one GPU box instead of everyone running their own models.

```
 developer laptops                       your GPU machine
 ┌──────────────────┐                    ┌─────────────────────────────────────┐
 │ VS Code + twinny │ ─── HTTPS ───────► │ twinny-server ──► Ollama / llama.cpp │
 │ (personal key)   │                    │  keys · usage · admin page · licence │
 └──────────────────┘                    └─────────────────────────────────────┘
```

## What you get

- **Code stays in the building.** Prompts go to your gateway and your backend, nowhere else. The gateway makes no external requests and sends nothing to twinny.
- **A key per developer.** Keys are created and revoked on the admin page or the command line, take effect without a restart, and are stored as hashes.
- **Usage per person and per model.** Requests, failures and token counts, kept for as long as you choose, never the content.
- **One connection for the team.** A developer pastes the gateway address and their key once; the admin's default models for chat, autocomplete and embeddings are applied for them.
- **Admin page.** Backend health, usage charts, keys, providers and models, and the plan, from a browser.

## Plans

| | Free | Team |
| --- | --- | --- |
| Developers (active keys) | up to 5 | as many seats as you buy |
| Everything above | yes | yes |
| Runs where | your machine | your machine |
| Cost | nothing, forever | per seat, per year |

A **seat** is an active key. The free plan is not a trial: a team of five runs the gateway with no licence, indefinitely. Beyond that, a licence token from twinny raises the seat count. The token is installed once and checked locally; the gateway never phones home. See [Licensing and seats](/twinny-docs/teams/licensing/).

## Where to start

1. [Run a gateway](/twinny-docs/teams/gateway/) on the machine with the models. Ten minutes.
2. Give each developer their key and the address; they [connect to the team](/twinny-docs/teams/connect/) from the twinny sidebar.
3. Past five developers, [get a licence](/twinny-docs/teams/licensing/).

The full operator reference, including configuration fields, routes, running as a service and troubleshooting, is in the repository at [docs/gateway.md](https://github.com/twinnydotdev/twinny/blob/main/docs/gateway.md).

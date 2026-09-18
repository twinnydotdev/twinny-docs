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
- **Usage per person and per model.** Requests, failures and token counts, kept for as long as you choose. Content is kept only if you switch on [recording](/twinny-docs/teams/recording/), which every developer is told about.
- **One connection for the team.** A developer pastes the gateway address and their key once; the admin's default models for chat, autocomplete and embeddings are applied for them.
- **Admin page.** Backend health, usage charts, keys, providers and models, and the plan, from a browser.

## Plans

| | Free | Team | Enterprise |
| --- | --- | --- | --- |
| Developers (active keys) | up to 5 | the free 5, plus the seats you buy | from 50 |
| Everything above | yes | yes | yes |
| [Team policy](/twinny-docs/teams/policy/): allowed providers, locked defaults | no | yes | yes |
| [Recording](/twinny-docs/teams/recording/): keep chat, autocomplete and embedding content; review it; export training data | no | yes | yes |
| Gateways covered | one | one per licence | any number, one organisation licence |
| Support | community (GitHub discussions) | email | priority, with a named contact |
| Runs where | your machine | your machine | your machines |
| Cost | nothing, forever | $6 per seat beyond the free 5, per month, billed yearly | $10 per seat per month, billed yearly |

A **seat** is an active key. The free plan is not a trial: a team of five runs the gateway with no licence, indefinitely, with everything the gateway does: the admin page, usage per developer, keys, sign-in codes, team GPU pooling and live provider configuration. Beyond five, a licence token from twinny raises the seat count and switches on policy and recording. The token is installed once and checked locally; the gateway never phones home. Enterprise adds one licence for the whole organisation, priority support from a named contact, and invoice or purchase-order billing. See [Licensing and seats](/twinny-docs/teams/licensing/).

## Where to start

1. [Run a gateway](/twinny-docs/teams/gateway/) on the machine with the models. Ten minutes.
2. Send each developer an invite link from the admin page; opening it in VS Code [connects them to the team](/twinny-docs/teams/connect/) with nothing to paste.
3. Past five developers, [get a licence](/twinny-docs/teams/licensing/).

The full operator reference, including configuration fields, routes, running as a service and troubleshooting, is in the repository at [docs/gateway.md](https://github.com/twinnydotdev/twinny/blob/main/docs/gateway.md).

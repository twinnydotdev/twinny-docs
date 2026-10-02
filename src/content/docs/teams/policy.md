---
title: Team policy
description: Rules the gateway sends to connected developers and their VS Code enforces, plus routing rules and a team system prompt the gateway applies itself.
---

Team defaults tell a connecting developer which models to use. A **policy** goes one step further: rules that the developer's VS Code enforces while they are connected, and rules the gateway applies to their requests. It is what an engineering manager means by "can we make sure nobody sends code to a cloud API".

Policy is a licence feature, apart from the [secret shield](#secret-shield), which applies on every plan. See [Licensing and seats](/twinny-docs/teams/licensing/).

## Rules the extension enforces

| Rule | What the developer sees |
| --- | --- |
| **Team gateway only** (`teamOnly`) | The add-provider gallery shows only the team gateway. Adding or activating any other kind of provider is refused with a message that names the policy. |
| **Keep defaults active** (`lockDefaults`) | Chat, autocomplete and embeddings stay on the team's models. Switching one of them to another provider is refused with a message that names the policy. |
| **Team system prompt** (`systemPrompt`) | Put before every chat's system prompt. Shown on the consent card before connecting, so nobody is surprised by it. |

## Rules the gateway applies

**Routing rules** decide which aliases may serve a workspace. The extension sends the name of the open workspace folder with each request, and the first rule whose pattern matches applies:

- `localOnly` refuses any alias served by a hosted provider (OpenAI, Anthropic, Mistral and the like) for that workspace, so a repository you would never send to a cloud API stays on your own backends even when the team also serves a hosted model.
- `aliases` allows only the aliases named, for instance a cheap model for a docs repository.

A refused request fails in the editor with a message that says which rule refused it. Routing stays on the gateway; the extension only supplies the workspace name.

[Plugin](/twinny-docs/teams/plugins/) requests go through the same rules. A pull-request review, an issue triage or a shared-context index of `acme/payments-api` is matched as the workspace `payments-api`, so `payments-*` keeps its diffs off hosted models too.

## Secret shield

The gateway swaps API keys, tokens, private keys and passwords in prompts for placeholders before a request reaches a backend, and puts them back in the reply, whichever client sent it: the extension, the TUI or Neovim. `policy.secretShield` says for which backends:

| Value | Shields prompts sent to |
| --- | --- |
| `offMachine` (the default) | hosted APIs, backends on other hosts and the team pool |
| `always` | every backend, including those on the gateway's own host |
| `off` | nothing; prompts are forwarded as they arrive |

Unlike the rules above, the secret shield needs no licence: it applies on every plan. The extension has its own shield for prompts that leave the developer's machine, set with `twinny.secretShield`; see [Settings](/twinny-docs/reference/settings/#general).

## Setting it

On the admin page, **Policy**: tick the rules, choose the secret shield, write the system prompt, add routing rules by workspace pattern. Save. Or in the configuration file:

```json
"policy": {
  "teamOnly": true,
  "lockDefaults": true,
  "secretShield": "always",
  "systemPrompt": "Answer in British English. Prefer the standard library.",
  "routing": [
    { "workspace": "payments-*", "localOnly": true },
    { "workspace": "docs", "aliases": ["cheap"] }
  ]
}
```

Every rule is optional. A policy with none set is the same as no policy. The section on the admin page says whether the policy is being sent. Without a licence that includes team policy it is saved but not sent, so you can prepare it before the licence arrives.

## How it reaches developers

1. **Consent first.** When a developer connects to the team, the policy is shown under "Your team sets a policy" before anything is applied, the system prompt included. Connecting is agreeing to it.
2. **Re-read at every VS Code start.** A change you save reaches each developer at their next start. If the gateway stops sending a policy, because you removed it or the licence lapsed, they are released from it.
3. **Visible while it applies.** The Providers tab shows "Managed by your team" with the rules in force and the gateway address.
4. **Leaving is one click.** The same banner has **Leave team**, which removes the team's provider entries, their key and the policy, and falls back to whatever providers the developer has of their own.

## What it is and is not

A policy is a guard rail for a team that has agreed on one. It stops the accidental cloud provider and keeps everyone on the agreed models. It is not a lock on the developer's machine: the extension is open source, and leaving the team is a button. What the gateway can always tell you is who is connected and which models they use, per key, in the usage panel, and every change to the policy itself is in the [audit log](/twinny-docs/teams/operations/#audit-log).

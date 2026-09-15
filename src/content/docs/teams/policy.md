---
title: Team policy
description: Rules the gateway sends to connected developers and their VS Code enforces, such as which providers may be used and whether the team's models stay active.
---

Team defaults tell a connecting developer which models to use. A **policy** goes one step further: rules that the developer's VS Code enforces while they are connected. It is what an engineering manager means by "can we make sure nobody sends code to a cloud API".

Policy is a licence feature. See [Licensing and seats](/twinny-docs/teams/licensing/).

## The rules

| Rule | What the developer sees |
| --- | --- |
| **Allowed providers** | The add-provider gallery shows only the allowed kinds, plus the team gateway. Adding or activating any other kind is refused with a message that names the policy. |
| **Keep defaults active** | Chat, autocomplete and embeddings stay on the team's models. Switching one of them to another provider is refused with a message that names the policy. |

Both are optional. A policy with neither set is the same as no policy.

## Setting it

On the admin page, **Policy**: tick the provider kinds developers may add, and whether the defaults are locked. Save. Or in the configuration file:

```json
"policy": {
  "allowedProviders": ["ollama", "lmstudio"],
  "lockDefaults": true
}
```

The section on the admin page says whether the policy is being sent. Without a licence that includes team policy it is saved but not sent, so you can prepare it before the licence arrives.

## How it reaches developers

1. **Consent first.** When a developer connects to the team, the policy is shown under "Your team sets a policy" before anything is applied. Connecting is agreeing to it.
2. **Re-read at every VS Code start.** A change you save reaches each developer at their next start. If the gateway stops sending a policy, because you removed it or the licence lapsed, they are released from it.
3. **Visible while it applies.** The Providers tab shows "Managed by your team" with the rules in force and the gateway address.
4. **Leaving is one click.** The same banner has **Leave team**, which removes the team's provider entries, their key and the policy, and falls back to whatever providers the developer has of their own.

## What it is and is not

A policy is a guard rail for a team that has agreed on one. It stops the accidental cloud provider and keeps everyone on the agreed models. It is not a lock on the developer's machine: the extension is open source, and leaving the team is a button. What the gateway can always tell you is who is connected and which models they use, per key, in the usage panel.

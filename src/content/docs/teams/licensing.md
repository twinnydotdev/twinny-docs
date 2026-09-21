---
title: Licensing and seats
description: The free plan, what a seat is, how to get and install a licence, and what happens when it lapses.
---

The twinny extension is MIT licensed and free for everyone. So is the gateway, `twinny-server`, for teams of up to five. Those five seats stay free for good: a bigger team buys only the **seats** beyond them.

## Seats

A seat is an active access key on the gateway. Every developer has their own key, so seats are developers. Revoked keys do not count, so rotating a key or offboarding someone frees their seat at once.

| Plan | Seats | Price | Term | Covers |
| --- | --- | --- | --- | --- |
| Free | 5 | nothing, forever | permanent | one gateway |
| Team | the free 5, plus what you buy | $6 per extra seat per month, billed yearly ($72 per extra seat per year) | one year, renewable | one gateway per licence |
| Enterprise | from 50 | $10 per seat per month, billed yearly | one year, renewable | the organisation: any number of gateways |

Every plan includes the admin page, usage per developer, key management, live configuration, sign-in with a code, team GPU pooling. The free plan is not a trial. A licence changes the seat count and switches on [team policy](/twinny-docs/teams/policy/), [recording](/twinny-docs/teams/recording/) and [plugins](/twinny-docs/teams/plugins/): pull requests and issues from GitHub, GitLab, Gitea and Bitbucket reviewed by your own models, Slack, Discord and Teams notifications, SSO sign-in, a shared context index and backups. Team comes with email support; Enterprise with priority support from a named contact, invoice or purchase-order billing, and help with security questionnaires and procurement paperwork.

## Getting a licence

**Team:** [buy seats](https://buy.stripe.com/eVq00igUndD80qW6AR7Zu00) by card. Choose how many seats you need **beyond the free five** (a team of eight buys three), enter your organisation name, and pay; the page that follows shows your licence token, a single line beginning `twl1.`, and a copy goes to the email you paid with. The subscription renews yearly and a new token is issued for the same licence id; cancelling stops the renewal and the licence runs to its expiry.

**Enterprise:** message [@twinnydotdev](https://x.com/twinnydotdev) or open a discussion on [GitHub](https://github.com/twinnydotdev/twinny/discussions) with your organisation name and the number of seats. You receive a token by email within one business day, with an invoice or against a purchase order.

The token carries your organisation, the total seat count (the free five plus the ones bought), the dates and the features it switches on; an Enterprise token covers the organisation, so the same one is installed on every gateway you run.

## Installing it

On the gateway machine:

```sh
twinny-server license set twl1.…
```

Or open the admin page, **Plan and licence**, paste the token and choose **install licence**. Either way the gateway verifies the token first, keeps it in `~/.twinny/server/license`, and applies it within a second without a restart. A token that does not verify changes nothing.

```sh
twinny-server license
```

```
Plan: Acme Ltd, 12 of 25 seats used, licence until 2027-09-14
  Licensed to Acme Ltd: 25 seats until 2027-09-14.
  licence id: lic_76e34f13c6d47b7b, contact ops@acme.example
  file: /home/twinny/.twinny/server/license
```

## How it is checked

The token carries your organisation name, the seat count, the dates and the features, signed by twinny. The gateway checks the signature against a public key built into `twinny-server`. That is the whole check: no account, no activation server, no call home, and no usage reported to anyone. The gateway works exactly the same on a network with no internet access.

## When it lapses

- **30 days before expiry** the admin page, the startup banner and the log say so.
- **After expiry** there are 14 days of grace during which the licensed seat count, policy, recording and plugins still apply.
- **After the grace** the free plan applies and paid policy, recording and plugins are disabled. Existing keys are not deleted: the five oldest keep their seats, and the rest are refused with "This gateway key has no seat" until the licence is renewed or keys are revoked. The admin key made on day one is the oldest, so an operator is never locked out of their own gateway.

After each renewal, copy the new token from your licence page or renewal email and install it on the gateway. Your licence id stays the same. The gateway checks licences offline, so it does not fetch renewal tokens automatically.

## Questions

**Can I try more than five before buying?** Ask; a short-term token is easy to issue.

**Does a seat count keys or people?** Keys. One key per person is the intent, and the admin page makes that easy, but the gateway does not know or care who is behind a key.

**What about several gateways?** A Team licence is per gateway: buy seats for each. An Enterprise licence covers the organisation, so one token goes on every gateway.

**Is the licence check in the open source code?** Yes. The verification is in `src/licensing` in the repository; the only private part is the key that signs tokens.

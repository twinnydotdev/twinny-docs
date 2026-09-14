---
title: Licensing and seats
description: The free plan, what a seat is, how to get and install a licence, and what happens when it lapses.
---

The twinny extension is MIT licensed and free for everyone. So is the gateway, `twinny-server`, for teams of up to five. Beyond that a team buys **seats**.

## Seats

A seat is an active access key on the gateway. Every developer has their own key, so seats are developers. Revoked keys do not count, so rotating a key or offboarding someone frees their seat at once.

| Plan | Seats | Term |
| --- | --- | --- |
| Free | 5 | permanent |
| Team | as bought | one year, renewable |

Everything the gateway does is in both plans: the admin page, usage per developer, key management, live configuration. The licence changes one number.

## Getting a licence

Priced per seat, per year. To buy or to ask about a larger deployment, message [@twinnydotdev](https://x.com/twinnydotdev) or open a discussion on [GitHub](https://github.com/twinnydotdev/twinny/discussions) with your organisation name and the number of seats. You receive a licence token, a single line beginning `twl1.`, by email.

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

The token carries your organisation name, the seat count and the dates, signed by twinny. The gateway checks the signature against a public key built into `twinny-server`. That is the whole check: no account, no activation server, no call home, and no usage reported to anyone. The gateway works exactly the same on a network with no internet access.

## When it lapses

- **30 days before expiry** the admin page, the startup banner and the log say so.
- **After expiry** there are 14 days of grace during which the licensed seat count still applies.
- **After the grace** the free plan applies. Existing keys are not deleted: the five oldest keep their seats, and the rest are refused with "This gateway key has no seat" until the licence is renewed or keys are revoked. The admin key made on day one is the oldest, so an operator is never locked out of their own gateway.

Renewing is installing a new token. Your licence id stays the same.

## Questions

**Can I try more than five before buying?** Ask; a short-term token is easy to issue.

**Does a seat count keys or people?** Keys. One key per person is the intent, and the admin page makes that easy, but the gateway does not know or care who is behind a key.

**What about several gateways?** Each gateway holds its own licence. Buy seats per gateway, or ask about a licence for the organisation.

**Is the licence check in the open source code?** Yes. The verification is in `src/licensing` in the repository; the only private part is the key that signs tokens.

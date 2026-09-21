---
title: Operations
description: Running the gateway day to day. The audit log, read-only admins, Prometheus metrics, costs, what happens when every slot is busy, and upgrades.
---

Everything on this page is in every plan, licence or not. The operator reference with every configuration field, route and exit code is in the repository at [docs/gateway.md](https://github.com/twinnydotdev/twinny/blob/main/docs/gateway.md).

## Audit log

Every change made through the admin page, the admin routes or the command line is written to `audit/YYYY-MM.jsonl` under the data directory: keys made and revoked, invites made, opened and withdrawn, sign-ins approved, configuration saves, licence changes, plugins switched on or off, and every write to a plugin's routes (the method and path, never the body). Nothing secret is written: names, actions, targets, a few short details and the caller's address.

Each line carries the SHA-256 hash of the line before it. An edited or removed line breaks the chain, and **Team → Audit log** on the admin page says whether the chain is intact and, if not, where it breaks. Filter by period, actor and kind; **export** downloads the whole log as JSON lines for whatever keeps your records.

## Read-only admins

An admin key can be read-only: it opens the admin page and every admin route that reads, and is refused on anything that changes state, plugins included. For the person who needs to see usage, people and the audit log without being able to act, or for a metrics scraper.

```sh
twinny-server keys create auditor --admin --read-only
```

Or tick *read-only* next to *admin* when making a key on **People**.

## Metrics

`GET /metrics` with an admin key (a read-only one will do) answers in the Prometheus text format: requests by route, alias and outcome; a latency histogram; tokens and chunks; requests in flight and waiting for a slot; each backend's last check; refused authentications; active keys and seats; plugin events. Point a scrape job at it with the key as a bearer token:

```yaml
scrape_configs:
  - job_name: twinny
    metrics_path: /metrics
    authorization:
      credentials: tsk_…      # a read-only admin key
    static_configs:
      - targets: ["gateway.example.com:8765"]
```

The Helm chart under `deploy/helm/twinny-server` includes a ServiceMonitor for the Prometheus operator; see [Run a gateway](/twinny-docs/teams/gateway/#kubernetes).

## Costs

Give an alias a price and the Usage page shows what its tokens cost. In the model's form on **Providers & models**, enter the price per million input and output tokens, and set the currency once on the same page. The usage summary then carries a cost per developer, per model and in total for the period, computed from the token counts the backends reported. A local model with no price shows nothing; a hosted one shows the bill. Plugin reviews and triage are routed like any other request and appear in usage under `plugin:github` and the like, so their cost is visible too.

## When every slot is busy

`maxActiveRequests` caps the chat and autocomplete requests running at once (embeddings are not counted, since indexing a workspace is hundreds of small requests). A request that finds every slot taken does not fail at once: it waits, oldest first, for up to a few seconds (`limits.queue.fimWaitMs` for autocomplete, `chatWaitMs` for chat), and a freed slot goes straight to the head of the queue. A team sharing one GPU sees a short pause rather than an error.

A request is refused with `rate-limited` when `limits.queue.maxWaiting` requests are already waiting, or when its own wait ran out; the message and the log line say which. An editor that moves on while its request is waiting leaves the queue without touching a backend. `twinny_queued_requests` on `/metrics` shows how often the queue is used; if it is rarely empty, the answer is a bigger `maxActiveRequests` or another backend.

## Upgrades and the data directory

Everything the gateway keeps lives in one directory (`~/.twinny/server` unless you moved it): keys, invites, the licence, plugins and their files, the audit log, usage and recordings. The directory carries a marker, `format.json`, naming the layout its files follow. On start the gateway reads it and:

- writes it for an empty directory, or for one from a version before the marker existed;
- runs any migrations from the format found up to its own, in order, so an interrupted upgrade resumes where it stopped;
- refuses to start with exit code 6 when the marker names a newer format than it knows, since an older server writing into a newer layout would corrupt it. Upgrade `twinny-server`, or restore a backup taken by the version you are running.

So upgrading is: stop the gateway, install the new version, start it. Downgrading is: restore the backup the [Backups plugin](/twinny-docs/teams/plugins/#backups) took before the upgrade, which carries the marker along.

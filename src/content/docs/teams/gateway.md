---
title: Run a gateway
description: Set up twinny-server on the machine with the models, make keys for your developers, and open the admin page.
---

Everything on this page runs on the machine with the models. It needs Node 18 or newer and a backend such as Ollama already running there.

## 1. Install and configure

```sh
npx twinny-server init                    # writes ./twinny.gateway.json
```

Edit the file so each alias names a model you have pulled. The starter serves one chat and autocomplete alias (`coder`) and one embedding alias (`embed`) from an Ollama on the same machine:

```sh
ollama pull qwen2.5-coder:7b
ollama pull nomic-embed-text
```

Guided setup for Ollama or QVAC checks the backend and writes the aliases for you:

```sh
npx twinny-server setup ollama --model qwen2.5-coder:7b --capability fim
```

## 2. Make your admin key

```sh
npx twinny-server keys create you --admin
```

The key (`tsk_…`) is printed once and only its hash is stored. Keep it somewhere safe: it opens the admin page and makes the other keys.

## 3. Start the gateway

```sh
npx twinny-server serve --config ./twinny.gateway.json
```

```
Twinny gateway listening on http://127.0.0.1:8765
  protocol: twinny/v1 at /twinny/v1
  models:   2 aliases (coder: fim/chat, embed: embeddings)
  limits:   2 active, 120s deadline, 5s grace
  health:   http://127.0.0.1:8765/healthz
  access:   1 active key
  plan:     Free plan, 1 of 5 seats used
  usage:    /home/you/.twinny/server/usage (kept 30 days)
  backend:  local-ollama answers (12 ms)
```

Open `http://127.0.0.1:8765/admin`, sign in with the admin key, and check the **Backends** panel says "answering".

To reach the gateway from other machines, set `"listen": { "host": "0.0.0.0" }` and put HTTPS in front of it: a reverse proxy (Caddy, nginx, Traefik) or a tunnel (Tailscale, WireGuard, SSH). Anything but loopback is exposed to that network. The gateway does not manage certificates.

## 4. Add developers

On the admin page, **Keys → name → create key**, or:

```sh
npx twinny-server keys create alice
```

Send Alice the key over a channel you trust; it is a password. She connects from the twinny sidebar, see [Connect to your team](/twinny-docs/teams/connect/). Set the team's default models on the admin page under **Providers & models** so that connecting configures chat, autocomplete and embeddings for her in one step.

One key per person. Usage is attributed per key, so a shared key defeats the point. Revoking a key (`keys revoke alice`, or **revoke** on the page) takes effect within a second, no restart.

## Day to day

| Task | How |
| --- | --- |
| See who is using what | The admin page, or `twinny-server usage --since 7d` |
| Rotate a key | Revoke it, create one with the same name, send it over |
| Change models or backends | Admin page, **Providers & models**; applies live |
| Change limits or the listen address | Edit the file, restart |
| Check the plan and seats | Admin page, **Plan and licence**, or `twinny-server license` |
| Run it as a service | A systemd unit example is in [docs/gateway.md](https://github.com/twinnydotdev/twinny/blob/main/docs/gateway.md#running-it-as-a-service) |

The free plan allows five active keys. When the sixth developer arrives, creating the key is refused with the reason, and [a licence](/twinny-docs/teams/licensing/) raises the limit.

## Files on disk

| What | Where |
| --- | --- |
| Configuration | wherever you put `twinny.gateway.json` |
| Keys (hashes only) | `~/.twinny/server/keys.json` |
| Usage (one line per request, no content) | `~/.twinny/server/usage/YYYY-MM-DD.jsonl` |
| Licence token | `~/.twinny/server/license` |

Back up the configuration, the keys file and the licence. Nothing else is written anywhere, and nothing leaves the machine.

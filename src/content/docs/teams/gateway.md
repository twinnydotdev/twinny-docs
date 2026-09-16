---
title: Run a gateway
description: Set up twinny-server on the machine with the models, make keys for your developers, and open the admin page.
---

Everything on this page runs on the machine with the models. It needs Node 18 or newer and a model server already running there: Ollama, LM Studio, llama.cpp, QVAC, Open WebUI, LiteLLM or any OpenAI-compatible server.

## 1. Start it

```sh
npx twinny-server quickstart
```

That does three things: writes `./twinny.gateway.json` if there is none, makes an admin key for you (printed once; keep it), and serves. Quickstart looks for a model server on the usual local ports (or the one you name with `--backend [kind=]host[:port]`, such as `lmstudio=10.0.0.5` or `http://gpu-box:8000`), asks it which models it has, and on a terminal lets you pick a chat, an autocomplete and an embedding model from the list (`--yes` takes the recommendations). If nothing answers, the aliases get placeholders to change on the admin page. The starter serves one chat and autocomplete alias (`coder`) and one embedding alias (`embed`):

```sh
ollama pull qwen2.5-coder:7b
ollama pull nomic-embed-text
```

The banner shows where it listens and the admin page address:

```
Twinny gateway listening on http://127.0.0.1:8765
  protocol: twinny/v1 at /twinny/v1
  models:   2 aliases (coder: fim/chat, embed: embeddings)
  limits:   4 active, 120s deadline, 5s grace
  health:   http://127.0.0.1:8765/healthz
  admin:    http://127.0.0.1:8765/admin (sign in with an admin key)
  access:   1 active key
  plan:     Free plan, 1 of 5 seats used
  usage:    /home/you/.twinny/server/usage (kept 30 days)
  backend:  local-ollama answers (12 ms)
```

Open `http://127.0.0.1:8765/admin`, sign in with the admin key, and check the **Backends** panel says "answering". To change a model, open **Providers & models**: it lists each backend's models to pick from, and saves apply live.

### The same, step by step

```sh
npx twinny-server init                      # writes ./twinny.gateway.json
# edit the file: set each alias's "model" to one you have pulled
npx twinny-server keys create you --admin   # shown once; opens the admin page
npx twinny-server serve --config ./twinny.gateway.json
```

## 2. Reach it from other machines (HTTPS)

Quickstart listens on `127.0.0.1`, so only this machine can reach it. To serve a team, expose it one of two ways. Anything but loopback is exposed to that network, and the gateway does not manage certificates itself.

The twinny extension accepts plain `http://` gateway URLs, so inside a VPN or tailnet that is enough. Use HTTPS for anything reachable beyond it.

### Caddy: a domain with automatic HTTPS

Leave the gateway on `127.0.0.1` and put [Caddy](https://caddyserver.com/) in front; it gets and renews the certificate itself. A `Caddyfile`:

```
ai.example.com {
    reverse_proxy 127.0.0.1:8765
}
```

```sh
caddy run
```

Developers use `https://ai.example.com`. Only Caddy is exposed; the gateway keeps listening on loopback.

### Tailscale: private, no domain

Every machine on your [tailnet](https://tailscale.com/) can reach the gateway by name, with nothing open to the internet.

```sh
tailscale up
```

In `twinny.gateway.json`, listen on the machine's Tailscale address (from `tailscale ip -4`), or on every interface:

```json
"listen": { "host": "100.101.102.103", "port": 8765 }
```

Restart the gateway. Developers on the tailnet use `http://<machine-name>:8765`. For HTTPS with a certificate from the tailnet:

```sh
tailscale serve 8765
```

and they use `https://<machine-name>.<tailnet>.ts.net` instead.

## 3. Make more admins

The key quickstart printed is an admin key. For a second admin, on the admin page choose **new key** and tick **admin**, or:

```sh
npx twinny-server keys create ops --admin
```

Keys (`tsk_…`) are printed once and only their hash is stored.

## 4. Add developers

Nothing needs to be sent over chat. Alice opens **Connect to team** in the twinny sidebar, enters the gateway URL and chooses **Request a key**. She reads you the code VS Code shows her. It appears under **People → Sign-in requests** on the admin page with her suggested name and machine; you type the key name and **approve**. Her VS Code collects the key by itself and runs the connection check. Codes last ten minutes, and approve only a code someone has read to you.

You can also make keys yourself, on the admin page (**Keys → name → create key**) or:

```sh
npx twinny-server keys create alice
```

and send the key over a channel you trust; it is a password. Either way, see [Connect to your team](/twinny-docs/teams/connect/) for Alice's side. Set the team's default models on the admin page under **Providers & models** so that connecting configures chat, autocomplete and embeddings for her in one step.

One key per person. Usage is attributed per key, so a shared key defeats the point. Revoking a key (`keys revoke alice`, or **revoke** on the page) takes effect within a second, no restart.

## Day to day

| Task | How |
| --- | --- |
| See who is using what | The admin page, or `twinny-server usage --since 7d` |
| Rotate a key | Revoke it, create one with the same name, send it over |
| Change models or backends | Admin page, **Providers & models**; applies live |
| Set what developers may use | Admin page, **Policy**; needs a licence with team policy |
| Change limits or the listen address | Edit the file, restart |
| Check the plan and seats | Admin page, **Plan & licence**, or `twinny-server license` |
| Run it as a service | A systemd unit example is in [docs/gateway.md](https://github.com/twinnydotdev/twinny/blob/main/docs/gateway.md#running-it-as-a-service) |

The free plan allows five active keys. When the sixth developer arrives, creating the key is refused with the reason, and [a licence](/twinny-docs/teams/licensing/) raises the limit.

## Docker instead

`packages/twinny-server` in the repository has a `docker-compose.yml` that runs Ollama and the gateway together, with the gateway published on `127.0.0.1:8765`:

```sh
docker compose run --rm twinny-server init /data/twinny.gateway.json --host 0.0.0.0 --ollama ollama
docker compose run --rm ollama pull qwen2.5-coder:7b
docker compose run --rm twinny-server keys create you --admin --config /data/twinny.gateway.json
docker compose up -d
```

The image is `ghcr.io/twinnydotdev/twinny-server`. Keys, usage and the licence live in a volume, and every `docker compose run --rm twinny-server …` command (keys, usage, license) shares it with the running gateway. A GPU needs the NVIDIA Container Toolkit and the commented block in the compose file.

## Files on disk

| What | Where |
| --- | --- |
| Configuration | wherever you put `twinny.gateway.json` |
| Keys (hashes only) | `~/.twinny/server/keys.json` |
| Usage (one line per request, no content) | `~/.twinny/server/usage/YYYY-MM-DD.jsonl` |
| Recordings (content, only with [recording](/twinny-docs/teams/recording/) on) | `~/.twinny/server/recordings/` |
| Licence token | `~/.twinny/server/license` |

Back up the configuration, the keys file and the licence. Nothing else is written anywhere, and nothing leaves the machine.

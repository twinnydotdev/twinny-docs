---
title: Devices (P2P)
description: Use Ollama on another of your computers over an encrypted peer-to-peer link.
---

A laptop is a fine place to write code and a poor place to run a 14B model. Devices let twinny on one computer use Ollama on another that you own, such as a desktop with a GPU, over a direct encrypted connection. Nothing is exposed to the internet and there is no account or relay: the two machines find each other through a distributed hash table (DHT) and then talk directly, and only devices you have paired can connect.

Once paired, the remote machine appears as a **Twinny device (P2P)** provider and can be used for chat, autocomplete and embeddings like any other.

## How it works

```
 laptop                                          desktop
 ┌───────────────────────────┐                   ┌──────────────────────────┐
 │ twinny                    │   encrypted UDP   │ twinny node              │
 │  provider ─► gateway ─────┼───────────────────┼─► forwards ─► Ollama     │
 │  (loopback)   P2P client  │  (hole-punched)   │   (extension or CLI)     │
 └───────────────────────────┘                   └──────────────────────────┘
                 │                                          │
                 └──────── DHT: "where is key ABC?" ────────┘
```

- Each side has a **key pair**. The node's public key is its address; the DHT maps it to wherever the node currently is, so it keeps working when IPs change.
- **Pairing** exchanges public keys once, via a short-lived code. After that, the node only answers keys on its trusted list.
- On the laptop, a **gateway** on the loopback interface turns ordinary HTTP requests from twinny's providers into messages over the peer connection. Providers created from a device point at this gateway, so nothing else in twinny needs to know about P2P.
- On the same network the connection is direct. Across networks it is **hole-punched** through NATs with help from the DHT. There is no relay server; if hole-punching fails, the connection fails.

## On the computer with the GPU

Ollama must be running there with the models you want. Then share it in one of two ways.

### From VS Code

Open Twinny → Providers → **Devices** and press **Share** under *This computer*. twinny starts a node inside the extension, shows a **pairing code**, and keeps sharing after a restart until you press **Stop sharing**. The command **Twinny - Share this computer's Ollama with my other devices (P2P)** does the same.

Only one VS Code window per profile runs the node; others show *Shared from another VS Code window* and take over if that window closes. The Ollama shared is the one in `twinny.ollamaHostname` and `twinny.ollamaApiPort`.

### From a terminal

For a headless box, or one without VS Code, run the `twinny-node` command line. It is built from the twinny repository:

```sh
git clone https://github.com/twinnydotdev/twinny.git
cd twinny
npm install
npm run build
npm run node -- --name "Home RTX 3090"
```

`npm link` in that folder puts `twinny-node` on your PATH. Node.js 18 or newer is required.

```
twinny-node [options]

  -n, --name <name>     What paired devices see this machine as (default: hostname)
  -o, --ollama <url>    Ollama address (default: http://localhost:11434, or $OLLAMA_HOST)
  -d, --dir <path>      Where to keep the node identity and trusted devices
                        (default: ~/.twinny/node)
  -p, --port <port>     UDP port to listen on (default: 49737, or $TWINNY_NODE_PORT)
      --no-pair         Start without opening a pairing window
  -h, --help            Show this help

While running:
  p  show a new pairing code      l  list paired devices
  r  remove a paired device       q  quit
```

On start the node lists the models Ollama has, prints its peer ID and a pairing code, and then logs connections and requests as they happen. To run it as a service, use `--no-pair` and pair by pressing `p` in an attached session, or pair once interactively before installing the service; the trusted list is in `~/.twinny/node/trusted-peers.json`.

### Firewall

Devices reach the node on **UDP port 49737** (`twinny.p2pPort` in VS Code, `--port` on the CLI). If the machine runs a firewall, allow that port:

```sh
sudo ufw allow 49737/udp
```

The port is fixed rather than random so the rule can be permanent.

## On the computer you code on

1. Open Twinny → Providers → **Devices** → **Add device**.
2. Paste the pairing code and give the device a name if you like. Press **Pair**.
3. The device card shows *Online*, its latency, and the models Ollama there has installed.
4. Use the buttons on the card to make it the chat, autocomplete or embeddings provider. twinny picks a model that fits each job from the device's list; click a job to change the model.

A pairing code works once and expires after ten minutes. From then on the two machines recognise each other by key; no more codes.

Providers created from a device have no hostname or port to configure. Autocomplete keeps working with the sidebar closed, since the P2P runtime lives for the whole VS Code session.

## Managing devices

- **Offline**: the device cannot be reached. **Ollama is not running on the device**: the node is up but Ollama is not.
- **Reconnect and refresh** retries the connection and re-lists models.
- **Unpair device** removes it and any providers that use it. On the sharing side, remove a device from the paired list (or press `r` on the CLI) and it needs a new code to connect again.
- Health is checked every 30 seconds while VS Code is open. The last model list is remembered so the card is informative while the device is offline.

## Security

- Every connection is authenticated by key pair and encrypted end to end. The DHT only helps the two machines find each other; it never carries the traffic.
- A node answers requests only from keys on its trusted list. Anyone who learns the peer ID can open a connection, but cannot send a request until they present a valid pairing code, and the code is single-use.
- Requests are forwarded to Ollama unchanged, and only to Ollama. The node does not expose files or run commands.
- Identity keys live in VS Code's secret storage (extension) or `~/.twinny/node/identity.json` with owner-only permissions (CLI). Delete the file to start with a fresh identity; paired devices then need to pair again.
- Trusted peers live in VS Code global state (extension) or `~/.twinny/node/trusted-peers.json` (CLI).

## Frequently asked

**Does this work across the internet?** Yes, where the routers allow hole-punching, which is most home networks. If both sides are behind strict NATs it may fail; a VPN such as Tailscale or WireGuard between the machines makes them "local" to each other and always works.

**Can several laptops share one desktop?** Yes. Pair each one; the node's list shows them all.

**Can I share something other than Ollama?** Not at present. The node forwards Ollama's API, which is what twinny's Ollama provider speaks.

**Does the DHT see my code?** No. It learns only that a key is reachable at an address. Requests and replies go directly between the two machines, encrypted.

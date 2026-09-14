---
title: Ollama
description: "Setting up Ollama for twinny: models, context, remote access and tuning."
---

[Ollama](https://ollama.com/) is the local server twinny supports best. It runs as a background service, pulls models with one command, and exposes native endpoints for completion (`/api/generate`) and embeddings (`/api/embed`) as well as an OpenAI-compatible chat API (`/v1`). It is also what [Devices](/twinny-docs/providers/devices/) shares between your machines.

## Install and pull

Install from [ollama.com/download](https://ollama.com/download) (macOS, Windows, Linux). Then:

```sh
ollama pull qwen2.5-coder:7b-instruct   # chat, edits, review
ollama pull qwen2.5-coder:1.5b-base     # completion
ollama pull nomic-embed-text            # workspace index (optional)
```

`ollama list` shows what you have; `ollama ps` shows what is loaded and whether it is on the GPU.

## Let twinny set it up

With Ollama running, twinny's first-run discovery finds it on port 11434 and creates providers for each job it has a model for. Later, **Add provider** → **Ollama** does the same for one job, listing the models from the server so you can pick.

Defaults twinny uses:

| Job | Path | Model name |
| --- | --- | --- |
| Chat | `/v1` (twinny appends `/chat/completions`) | e.g. `qwen2.5-coder:7b-instruct` |
| Autocomplete | `/api/generate` | e.g. `qwen2.5-coder:1.5b-base`, FIM template *Automatic* |
| Embeddings | `/api/embed` | e.g. `nomic-embed-text` |

Model names are Ollama tags, exactly as `ollama list` prints them.

## Keeping models loaded

Ollama unloads a model after a period of inactivity, and the next request pays the load time. `twinny.keepAlive` (default `5m`) is sent with each request to control this: `1h`, `24h`, or `-1` to keep the model resident. If chat and completion use different models and your GPU cannot hold both, they swap each other out; either use the same model for both, use a smaller completion model, or accept the swap.

## Context size

Ollama's default context window is small. For chat and review with long inputs, make a variant with a bigger context:

```
# Modelfile
FROM qwen2.5-coder:7b-instruct
PARAMETER num_ctx 16384
```

```sh
ollama create qwen2.5-coder:7b-instruct-16k -f Modelfile
```

and use that tag in the chat provider. Larger context uses more memory. Completion does not need a large window; twinny keeps FIM prompts short.

## Reaching Ollama from elsewhere

Ollama listens on `127.0.0.1` only. To let another machine or a container call it, start it with:

```sh
OLLAMA_HOST=0.0.0.0 ollama serve
```

(or set `OLLAMA_HOST` in the service's environment), then point the provider at that machine's LAN address. Anyone on the network can then use it, so do this only on networks you trust.

For your own machines, [Devices](/twinny-docs/providers/devices/) is the better option: it needs no change to Ollama, works across networks, and only paired devices can connect.

## Ollama in Docker or WSL

- **Ollama in a container, VS Code on the host**: publish the port (`-p 11434:11434`) and use `localhost`.
- **VS Code in a container (Dev Containers), Ollama on the host**: use `host.docker.internal` as the hostname, or the host's LAN address.
- **WSL**: Ollama installed in Windows is reachable from WSL at the Windows host address; Ollama installed inside WSL is `localhost` from a WSL-based VS Code.

## twinny's Ollama settings

These are used beyond a single provider, for listing models and for the Ollama that this machine shares with paired devices:

| Setting | Default | |
| --- | --- | --- |
| `twinny.ollamaHostname` | `0.0.0.0` | Treated as localhost when calling |
| `twinny.ollamaApiPort` | `11434` | |
| `twinny.ollamaUseTls` | `false` | |
| `twinny.keepAlive` | `5m` | Sent with each request |

## Tips

- **Speed**: `ollama ps` should show `100% GPU`. If it shows CPU, the model is too big for the VRAM; pick a smaller one.
- **Quantisation**: the default tags are 4-bit. `:7b-instruct-q8_0` is higher quality and twice the memory; `:7b-instruct-q3_K_M` is smaller and slightly worse.
- **Several models at once**: recent Ollama versions can keep more than one loaded when memory allows (`OLLAMA_MAX_LOADED_MODELS`).
- **Logs**: `journalctl -u ollama` on Linux, or the Ollama app's log on macOS and Windows, show what the server did with a request.

---
title: llama.cpp
description: Using llama.cpp's llama-server with twinny for completion, chat and embeddings.
---

[llama.cpp](https://github.com/ggml-org/llama.cpp) is the inference engine behind most local servers. Running its own `llama-server` gives you full control over the model file, context size, GPU offload and threads, with the least overhead. You manage the GGUF files yourself.

## Start a server

Download a GGUF (for example from Hugging Face) and start:

```sh
llama-server -m qwen2.5-coder-7b-instruct-q4_k_m.gguf \
  --port 8080 -c 8192 -ngl 99
```

- `-c` sets the context size; `-ngl 99` offloads every layer to the GPU.
- Add `--embedding` if this server should also answer embedding requests.
- `-hf user/repo` can download a model straight from Hugging Face in recent builds.

One `llama-server` serves one model. Run a second one on another port for a different completion model:

```sh
llama-server -m qwen2.5-coder-1.5b-q8_0.gguf --port 8081 -c 4096 -ngl 99
```

## In twinny

**Add provider** → **llama.cpp**. Defaults:

| Job | Path | Notes |
| --- | --- | --- |
| Chat | `/v1` | OpenAI-compatible chat |
| Autocomplete | `/completion` | llama.cpp's native route, so the FIM prompt is rendered by twinny |
| Embeddings | `/embedding` | Server must run with `--embedding` |

The model name is informational for llama.cpp, since the server has exactly one model loaded; twinny still uses it to pick the FIM template when set to *Automatic*, so name it after the family (`qwen2.5-coder-1.5b`) or choose the template by hand.

Change the port on the provider if you used something other than 8080. Because the generic *OpenAI-compatible server* preset also defaults to 8080, first-run discovery credits whichever answers to llama.cpp first.

## Tips

- Quantisation is in the file name: `q4_k_m` is the usual balance; `q8_0` is near-lossless and twice the size.
- `--flash-attn` and `-ctk q8_0 -ctv q8_0` reduce memory for large contexts on supported GPUs.
- The server prints each request's timings to its console, which is useful when tuning completion latency.
- Docker: `ghcr.io/ggml-org/llama.cpp:server` (or `:server-cuda`) with `-v /path/to/models:/models -p 8080:8080` and the same flags.

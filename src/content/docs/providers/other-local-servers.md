---
title: Other local servers
description: Open WebUI, LiteLLM, Oobabooga, vLLM, TGI and anything else that speaks the OpenAI API.
---

Any server that implements the OpenAI chat completions API works for chat. Completion needs a `/v1/completions`-style route (or a native one twinny knows), and embeddings a `/v1/embeddings`-style route. twinny ships presets for the servers below; for anything else use the generic **OpenAI-compatible server** preset.

## OpenAI-compatible server (vLLM, TGI, SGLang, Jan, GPT4All, ...)

The catch-all preset. Defaults to `localhost:8080` with `/v1`, `/v1/completions` and `/v1/embeddings`. Change the port to match your server.

**vLLM**:

```sh
vllm serve Qwen/Qwen2.5-Coder-7B-Instruct --port 8000
```

Set the port to `8000` and the model name to `Qwen/Qwen2.5-Coder-7B-Instruct`. For completion, serve a base model (`Qwen/Qwen2.5-Coder-1.5B`) on another port; vLLM's `/v1/completions` accepts the raw FIM prompt twinny sends.

**Text Generation Inference**: expose the OpenAI-compatible endpoint (`/v1`) and set the port. TGI's completion route accepts raw prompts as well.

If the server requires a key, paste it into the API key field; it is sent as `Authorization: Bearer`.

## Open WebUI

[Open WebUI](https://openwebui.com/) fronts Ollama (or an OpenAI-compatible backend) with a web interface and user accounts. twinny can go through it, which is useful when Open WebUI is the thing exposed on your network.

| Job | Path |
| --- | --- |
| Chat | `/api` (twinny appends `/chat/completions`) |
| Autocomplete | `/ollama/api/generate` |
| Embeddings | `/ollama/api/embed` |

Default port `3000`. Every request needs your Open WebUI **API key** (Settings → Account in Open WebUI); paste it into the provider. Model names are the Ollama tags as Open WebUI lists them.

## LiteLLM

[LiteLLM](https://docs.litellm.ai/) is a proxy that presents many hosted and local APIs behind one OpenAI-compatible endpoint, with key management and spend tracking. Start it with a config or a single model:

```sh
litellm --model ollama/qwen2.5-coder:7b-instruct --port 4000
```

| Job | Path |
| --- | --- |
| Chat | `/v1` |
| Autocomplete | `/v1/chat/completions` |
| Embeddings | `/v1/embeddings` |

Chat through LiteLLM works well. Autocomplete depends on the upstream model accepting a raw prompt through LiteLLM's chat route; a base model behind Ollama does, a hosted chat-only model will not. If LiteLLM is configured with a master key, paste it into the provider.

## Oobabooga (text-generation-webui)

Start with the API extension on:

```sh
./start_linux.sh --api --listen
```

Load a model in the web UI (`http://localhost:7860`) before testing. The API is on port `5000`:

| Job | Path |
| --- | --- |
| Chat | `/v1` |
| Autocomplete | `/v1/completions` |
| Embeddings | `/v1/embeddings` |

Oobabooga serves whatever model is loaded, so the model name is informational; name it after the family so *Automatic* FIM template detection works, or pick the template by hand.

## Anything else

The provider form takes any hostname, port, protocol and path, and the **Test provider** button tells you whether the server answered and what it said. If a server needs a path twinny does not have a preset for, type it. For a completion route that expects a different prompt format, choose the **custom-template** FIM template and edit `~/.twinny/templates/fim.hbs`; see [Prompt templates](/twinny-docs/features/templates/#the-fim-template).

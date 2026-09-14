---
title: Choosing a model server
description: Local, hosted, or another of your devices, and what hardware runs which models.
---

twinny is only as good as the model behind it, and the model is only as fast as the machine it runs on. This page helps you pick a setup that suits your hardware and how you work.

## Three ways to run a model

| | Local server | Another of your devices | Hosted API |
| --- | --- | --- | --- |
| Where the model runs | This machine | A computer you own, over P2P | A vendor's servers |
| Your code goes to | Nowhere | Your other machine, encrypted | The vendor |
| Cost | Free | Free | Per token |
| Latency for completion | Best | Good on a LAN | Depends on the vendor |
| Model quality ceiling | Your hardware | Your other hardware | Highest |
| Works offline | Yes | On a LAN, yes | No |
| Setup | Install a server, pull a model | Pair once | Paste a key |

Most people end up mixing: a small local model for completion, where speed matters most and the task is narrow, and something bigger for chat and review, either on a desktop GPU via [Devices](/twinny-docs/providers/devices/) or a hosted model. twinny lets you choose per job.

## Which local server

| Server | Best for | Notes |
| --- | --- | --- |
| [Ollama](/twinny-docs/providers/ollama/) | Almost everyone | One command to install and pull models; runs as a service; native completion and embedding endpoints; what Devices shares |
| [LM Studio](/twinny-docs/providers/lm-studio/) | Browsing and trying models in a GUI | Desktop app with a built-in server; good for Windows and macOS users who like a UI |
| [llama.cpp](/twinny-docs/providers/llama-cpp/) | Control and minimal overhead | You pick the GGUF file and every flag; best raw speed; no model management |
| [vLLM, TGI and others](/twinny-docs/providers/other-local-servers/) | Serving a team from a GPU box | OpenAI-compatible; higher throughput; more setup |

If in doubt, use Ollama.

## What hardware runs what

Model size is measured in parameters (1.5B, 7B, 14B...). At the usual 4-bit quantisation, memory needed is roughly **0.6 GB per billion parameters plus some headroom for context**. The model must fit in fast memory, GPU VRAM or Apple unified memory, to be quick; spilling to system RAM or running on the CPU works but is slower.

| Memory available to the model | Completion | Chat and edits |
| --- | --- | --- |
| CPU only, 8 GB RAM | `qwen2.5-coder:1.5b-base` | `qwen2.5-coder:1.5b-instruct` or `3b-instruct`. Slow but usable |
| 4 to 6 GB VRAM | `qwen2.5-coder:1.5b-base` | `qwen2.5-coder:3b-instruct` |
| 8 GB VRAM | `qwen2.5-coder:1.5b-base` or `7b-base` | `qwen2.5-coder:7b-instruct` |
| 12 to 16 GB VRAM, or 16 GB+ Apple silicon | `qwen2.5-coder:7b-base` | `qwen2.5-coder:14b-instruct` |
| 24 GB VRAM, or 32 GB+ Apple silicon | `qwen2.5-coder:7b-base` | `qwen2.5-coder:32b-instruct`, `codestral` |

These are starting points, not rules. Other good families are in [Supported models](/twinny-docs/providers/supported-models/).

Two things matter more than raw size:

- **Completion wants speed.** A suggestion that arrives after two seconds is one you have already typed past. A 1.5B or 3B base model on the GPU is often a better completion experience than a 7B one, even on hardware that can run the 7B. Chat can afford to wait.
- **Only one model is resident at a time on small GPUs.** If chat and completion use different models on the same server, each request may swap the other out. Ollama keeps models loaded for `twinny.keepAlive` (5 minutes by default); with enough VRAM both stay resident.

## When to use a hosted API

- You want the best possible answers for chat, review and edits and your code is not confidential.
- You have no GPU and a slow CPU.
- You want Codestral for completion without running it yourself. Mistral's hosted Codestral is the one hosted model twinny recommends for autocomplete.

Hosted providers are listed with their capabilities on the [Hosted APIs](/twinny-docs/providers/hosted-apis/) page. Anthropic, Groq, Cohere, Perplexity and Gemini are chat-only in twinny; they have no completions endpoint twinny can drive for fill-in-the-middle.

## When to use a device

You have a capable machine somewhere, a desktop, a home server, a workstation at the office, and you code on a laptop. Run Ollama there, share it from twinny or with the `twinny-node` command line, and pair the laptop once. The laptop then uses that GPU for anything you like, over an encrypted link that works on the same network or across the internet where routers allow. See [Devices](/twinny-docs/providers/devices/).

## Context windows

Every model has a maximum context, the amount of text it can read at once. twinny keeps prompts small on purpose: completion prompts are built from a window of lines around the cursor plus a bounded amount of context, and review diffs are split into parts. If a server reports that a prompt is too long, lower `twinny.contextLength` for completion or `twinny.reviewMaxDiffChars` for review, or raise the server's context setting (`num_ctx` in Ollama, `-c` in llama.cpp).

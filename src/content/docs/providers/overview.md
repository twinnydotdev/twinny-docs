---
title: Providers overview
description: The three jobs, presets, the provider form, and how twinny talks to servers.
---

A **provider** is one model on one server, used for one job. twinny has three jobs:

| Type | What it does | What it needs |
| --- | --- | --- |
| **Chat** | Answers in the chat panel, inline edits, code actions, code review, commit messages, terminal helpers | Any instruct or chat model |
| **Autocomplete** (FIM) | Inline suggestions as you type | A model trained for fill-in-the-middle: usually a **base** or **code** variant |
| **Embeddings** | Indexes the workspace so chat can pull in related code | An embedding model such as `nomic-embed-text` |

You can have many providers of each type. One of each is **active**: chat and embeddings are chosen with **Use this provider** in the Providers tab, and the active autocomplete provider is also shown in the status bar tooltip.

Open the Providers tab from the robot icon at the top of the sidebar, or run **Manage twinny providers**.

## First run

With no provider configured, twinny asks the usual local addresses for a model list at once: Ollama, LM Studio, llama.cpp, Oobabooga, LiteLLM, Open WebUI, and a generic OpenAI-compatible server on port 8080. Of those that answer, the first in that order is used to create a chat, autocomplete and embeddings provider, each only if a suitable model is installed. Model fit is judged from the name: for completion, a name containing `code`, `coder`, `fim` or a known FIM family (`starcoder`, `codestral`, `codegemma`, `stable-code`); for embeddings, `embed`, `minilm`, `bge`, `e5` or `nomic`; for chat, an `instruct` or `chat` name first, then anything that is not a code or embedding model. An instruct model with `coder` in its name counts as a code model too, so check which model autocomplete got.

If nothing answers, the welcome screen offers **Search again** and **Choose a provider**.

## Presets

**Add provider** shows presets grouped into *On your machine*, *Another machine* (a [Twinny gateway](/twinny-docs/teams/connect/#adding-a-gateway-provider-by-hand)) and *Hosted APIs*; the local group shows four and a **Show more** link for the rest. **Custom Provider** opens a blank form instead. A local preset fills in the server's hostname, port and path for the chosen job and asks the server for its models; the form picks the first that fits and you can change it. A hosted preset fills in a sensible model name and asks for a key.

### Local servers

| Server | Chat | Autocomplete | Embeddings | Page |
| --- | --- | --- | --- | --- |
| Ollama | `localhost:11434` `/v1` | `/api/generate` | `/api/embed` | [Ollama](/twinny-docs/providers/ollama/) |
| LM Studio | `localhost:1234` `/v1` | `/v1/completions` | `/v1/embeddings` | [LM Studio](/twinny-docs/providers/lm-studio/) |
| llama.cpp (`llama-server`) | `localhost:8080` `/v1` | `/completion` | `/embedding` | [llama.cpp](/twinny-docs/providers/llama-cpp/) |
| Oobabooga | `localhost:5000` `/v1` | `/v1/completions` | `/v1/embeddings` | [Other local servers](/twinny-docs/providers/other-local-servers/) |
| LiteLLM | `localhost:4000` `/v1` | `/v1/chat/completions` | `/v1/embeddings` | [Other local servers](/twinny-docs/providers/other-local-servers/) |
| Open WebUI | `localhost:3000` `/api` | `/ollama/api/generate` | `/ollama/api/embed` | [Other local servers](/twinny-docs/providers/other-local-servers/) |
| OpenAI-compatible server | `localhost:8080` `/v1` | `/v1/completions` | `/v1/embeddings` | [Other local servers](/twinny-docs/providers/other-local-servers/) |

For chat the path is the API **base**; twinny appends `/chat/completions`, and a chat path saved with `/chat/completions` on the end is shortened to the base. For autocomplete and embeddings the path is the full route.

Autocomplete and embeddings presets exist for Ollama, LM Studio, llama.cpp and the OpenAI-compatible server. For Oobabooga, LiteLLM and Open WebUI there is only a chat preset; for their other jobs choose **Custom Provider** and pick the server in the **Provider** list, which fills in the paths above. The same goes for QVAC, which has no preset; see [Other local servers](/twinny-docs/providers/other-local-servers/#qvac).

### Hosted APIs

| Provider | Chat | Autocomplete | Embeddings |
| --- | --- | --- | --- |
| OpenAI | ✓ | | ✓ |
| Anthropic | ✓ | | |
| Mistral | ✓ | ✓ Codestral | |
| DeepSeek | ✓ | ✓ | |
| OpenRouter | ✓ | ✓ | |
| Gemini | ✓ | | |
| Groq | ✓ | | |
| Cohere | ✓ | | |
| Perplexity | ✓ | | |

Details, model names and where to get keys are on [Hosted APIs](/twinny-docs/providers/hosted-apis/).

### A Twinny gateway

The **Twinny gateway** provider talks to a team's `twinny-server` for chat, autocomplete or embeddings, using a gateway key kept in VS Code's secret storage. **Connect to team** sets it up for you; see [Connect to your team](/twinny-docs/teams/connect/).

### Another device

The **Twinny device (P2P)** provider uses Ollama on another of your computers. It is created from the **Devices** section of the Providers tab, not from a preset. See [Devices](/twinny-docs/providers/devices/).

## The provider form

| Field | Notes |
| --- | --- |
| Label | A name, shown in menus and the status bar |
| Type | Chat, Autocomplete or Embeddings |
| Provider | The server or API family; decides defaults and request shape |
| Hostname | Just the host, e.g. `localhost`. A pasted URL such as `https://my-box:8080/v1` is split into protocol, host, port and path |
| Port | Blank means the protocol's default |
| Protocol | `http` or `https` |
| API path | See the tables above |
| Model name | Chosen from the server's list when it can be fetched (**Choose from the server's models**), otherwise typed |
| FIM template | Autocomplete only. **Automatic** picks the format from the model name; set it by hand if suggestions look wrong |
| Repository level | Autocomplete only. Sends neighbouring files every time, in the Qwen2.5-Coder repository-level prompt format, whatever `twinny.fileContextEnabled` says |
| API key | Required for hosted APIs; optional for local servers, sent as a bearer token when set |

Hosted chat goes through a fixed public endpoint, so hostname, port and path are hidden for it. Device providers have no endpoint fields at all.

The form validates as you type and shows the URL a request will go to under **Will call**. **Test provider** sends a small request for the provider's job and shows either success or the error the server returned, with the URL it called.

## Managing providers

- **Use this provider** makes it the active one for its type.
- **Copy** duplicates a provider, for the same server with another model.
- **Export** and **Import** move the list between machines as JSON. See [Import and export](/twinny-docs/providers/import-export/).
- **Reset** removes every provider and returns to the first-run screen.

By default providers are kept in VS Code's global state. Set `twinny.providerStorageLocation` to `file` to keep them in a file inside the extension's global storage instead, which is more resilient when you work across remotes.

## How requests are made

twinny has one inference layer with three kinds of adapter:

- **HTTP**: a plain streaming request to the address you gave. Used for every local server, for DeepSeek, for paired devices, and for the completion and embedding endpoints of hosted APIs. Chat goes to `<path>/chat/completions` in the OpenAI format; completion uses the server's native route (`/api/generate` for Ollama, `/completion` for llama.cpp, `/v1/completions` elsewhere) with the FIM prompt rendered for the model.
- **Hosted**: the vendor's own SDK for chat with Anthropic, OpenAI, Mistral, Groq, OpenRouter, Cohere, Perplexity and Gemini. These have fixed endpoints. OpenAI chat that carries [agent mode](/twinny-docs/features/agent-mode/) tools goes to its Responses API (`/v1/responses`) instead.
- **Gateway**: the Twinny protocol (`/twinny/v1`) to a `twinny-server`, for the Twinny gateway provider.

A device provider is an HTTP provider whose address is a loopback gateway inside the extension; that gateway forwards to a paired machine's Ollama over the P2P link.

Every failure is turned into one of a small set of kinds (unavailable, model missing, unauthorised, rate-limited, timeout, prompt too long...) with a plain message, so the notification you see says what to do. The raw error is kept in the log.

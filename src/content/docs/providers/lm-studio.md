---
title: LM Studio
description: Using LM Studio's local server with twinny.
---

[LM Studio](https://lmstudio.ai/) is a desktop app for finding, downloading and running models with a graphical interface. It includes an OpenAI-compatible local server that twinny can use for all three jobs.

## Set up

1. Install LM Studio and download a model from its Discover tab. For chat pick an instruct model (`Qwen2.5-Coder-7B-Instruct`); for completion a base or code model (`Qwen2.5-Coder-1.5B`); for embeddings an embedding model (`nomic-embed-text`).
2. Open the **Developer** tab and start the server. The default port is `1234`.
3. Load the model(s) you want to serve. LM Studio can load several at once when memory allows, and can load on demand if *just-in-time loading* is on.

## In twinny

**Add provider** → **LM Studio**. twinny asks the server for its model list and fills in the first match for the job. Defaults:

| Job | Path |
| --- | --- |
| Chat | `/v1` |
| Autocomplete | `/v1/completions` |
| Embeddings | `/v1/embeddings` |

The model name is the identifier LM Studio's server reports, which you can see in the Developer tab; it is often the repository name in lower case, e.g. `qwen2.5-coder-7b-instruct`.

## Notes

- Autocomplete uses the OpenAI-style `/v1/completions` route with a FIM prompt rendered for the model. *Automatic* template detection works from the model name; if the name does not contain the family (say a renamed GGUF), pick the template by hand.
- To use LM Studio from another machine, turn on *Serve on Local Network* in the server settings and point the provider at the machine's address. Or run Ollama on that machine and use [Devices](/twinny-docs/providers/devices/).
- The server's context length is set per model in LM Studio's model settings. Raise it for review and long chats.
- If requests fail with a model-not-found error, the model is not loaded. Load it in LM Studio or enable just-in-time loading.

---
title: FAQ
description: Short answers to common questions about twinny.
---

### Is twinny free?

Yes. It is open source under the MIT licence, with no account and no paid tier. Running a hosted API through it costs whatever that vendor charges.

### Does my code leave my machine?

Only to the server you configured. With a local server, nothing leaves. With a paired device, prompts go to your other machine over an encrypted link. With a hosted API, prompts go to that vendor. twinny itself collects nothing. See [Status bar, logs and privacy](/twinny-docs/features/status-and-logs/#privacy).

### Does it work offline?

Yes, with a local server. Everything, including the workspace index and its reranker, runs on your machine.

### Which model should I use?

For a quick answer: `qwen2.5-coder:1.5b-base` for completion and `qwen2.5-coder:7b-instruct` for chat on Ollama. For the reasoning, see [Choosing a model server](/twinny-docs/getting-started/choosing-a-server/) and [Supported models](/twinny-docs/providers/supported-models/).

### Why are my completions nonsense, or full of tokens like `<PRE>`?

Either the model is an instruct model (use the base or code variant) or the FIM template does not match the model (set it by hand on the provider). See [Troubleshooting](/twinny-docs/getting-started/troubleshooting/#code-completion).

### Why is completion slow?

The model is too big for your hardware or is running on the CPU. Use a smaller base model, check `ollama ps` shows it on the GPU, and turn off file context. See [Choosing a model server](/twinny-docs/getting-started/choosing-a-server/#what-hardware-runs-what).

### Can I use one model for everything?

For chat and completion, an instruct model will complete but poorly, and a base model will chat but poorly. Two small models cost less memory than one big one. Embeddings always need an embedding model.

### Can I use it with Cursor, Windsurf or VSCodium?

VSCodium and other Open VSX builds: yes, from Open VSX. Forks of VS Code that support standard extensions generally work, but they are not tested.

### Does it work over Remote SSH, WSL or Dev Containers?

Yes. twinny runs on the remote side, so "localhost" means the remote. See [Installation](/twinny-docs/getting-started/installation/#remote-development).

### Can I share one GPU machine with my laptop?

Yes, that is what [Devices](/twinny-docs/providers/devices/) is for. No port forwarding, no account.

### What is the difference between chat and inline edit?

Chat answers in the sidebar and you decide what to do with the answer. Inline edit changes the code in the editor and shows you the diff. Use edit for "change this"; use chat for "explain this" or "what should I do about this".

### Does twinny run an agent that edits my files on its own?

No. Every change is something you asked for and can see before it is kept: a suggestion you accept, a diff you accept, a command you confirm. This is by design.

### How do I change the prompts?

Edit the Handlebars files in `~/.twinny/templates/`. See [Prompt templates](/twinny-docs/features/templates/).

### How do I change the sidebar language?

`twinny.locale`. English, Chinese (simplified and Hong Kong), German, Spanish, Japanese, French, Italian, Portuguese, Russian, Korean and Dutch are included.

### Where are my conversations stored?

In VS Code's global state for the installation. They are not synced by Settings Sync.

### Can twinny read my whole repository?

Chat reads what you attach, and `@workspace` searches an index you build. Nothing is read or sent without one of those. See [Context and mentions](/twinny-docs/features/context/).

### What happened to Symmetry?

The Symmetry network (sharing inference with strangers through twinny.dev) has been removed. Sharing between your own machines is now done with [Devices](/twinny-docs/providers/devices/), which needs no account and no third party.

### How do I report a bug or ask for a feature?

[github.com/twinnydotdev/twinny/issues](https://github.com/twinnydotdev/twinny/issues). Include the versions, the server and model, and the relevant lines from the Twinny output channel.

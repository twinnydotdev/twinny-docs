---
title: Troubleshooting
description: What each error means, where to look, and how to fix the common problems.
---

## First, look here

1. **Check setup** at the top of the Providers tab tests each job and names the failing provider.
2. **Test provider** on the provider form shows the exact error the server returned.
3. The **Twinny** output channel (**Twinny - Show logs**, or the status bar menu) has one line per request with the model, timing and stop reason. Set the channel's log level to *Debug* to see the full prompt and reply. API keys are redacted.

## Error messages

Errors surface as notifications and in the chat. Each one names the provider and, where relevant, the URL it called.

| Message | Meaning | What to do |
| --- | --- | --- |
| **Could not connect to _provider_ at _url_** | Nothing is listening at that address | Start the server. Check the hostname and port on the provider. In a remote or container, remember "localhost" is the remote |
| **_provider_ returned a server error (5xx)** | The server crashed or ran out of memory | Look at the server's own log. Try a smaller model or a smaller context |
| **_provider_ rejected the request as unauthorised** | Missing or wrong API key | Paste the key into the provider. For local servers behind a proxy, the proxy may want a key too |
| **_provider_ does not have the model _name_** | The model is not on the server | `ollama pull name`, load it in LM Studio, or pick another from the list in the form |
| **_provider_ returned 404 at _url_** | The API path is wrong | Compare with the defaults on [Providers](/twinny-docs/providers/overview/#local-servers). For chat the path is the base (`/v1`), not `/v1/chat/completions` |
| **The prompt was too long for _model_** | The server's context window is smaller than the request | Lower `twinny.contextLength` or `twinny.reviewMaxDiffChars`, or raise the server's context size |
| **_provider_ is rate limiting requests** | HTTP 429 from a hosted API | Wait, or upgrade the plan |
| **The request to _provider_ timed out** | No answer within the limit; the model may still be loading | Try again. The first request after a model swap is slow |
| **_provider_ cannot do this** | The provider does not support the job, e.g. FIM on Anthropic | Pick a provider that does |
| **_provider_ does not support FIM** | A chat-only hosted API set as autocomplete | See [Hosted APIs](/twinny-docs/providers/hosted-apis/) for which support completion |

## Code completion

**No suggestions at all.**
- Check the status bar: `</> off` means auto-suggest is off. Click it to turn on, or press `Alt+\`.
- Is an autocomplete provider set? *Check setup* says *Not set* if not.
- Is the language enabled? See `twinny.enabledLanguages`.
- Output panes, search results and the terminal never get suggestions.
- Another extension may own inline suggestions. Disable Copilot or similar to test.

**Suggestions are chatter, explanations or repeat the code.** The model is an instruct model. Use the base or code variant; see [Supported models](/twinny-docs/providers/supported-models/).

**Suggestions contain `<PRE>`, `<|fim_middle|>` or similar tokens.** The FIM template does not match the model. Set it by hand on the provider form instead of *Automatic*.

**Suggestions never stop, or run on for many lines.** Lower `twinny.maxLines`, lower `twinny.temperature`, and prefer a model family that stops reliably (Qwen2.5-Coder, CodeLlama, DeepSeek Coder). StarCoder2 and CodeGemma are known to run on.

**Suggestions are slow.** Use a smaller model for completion (1.5B or 3B). Make sure the model is on the GPU, not the CPU (`ollama ps` shows where). If chat and completion use different models on a small GPU, they swap each other out; give them the same model or more VRAM. Turn off `twinny.fileContextEnabled` if it is on.

**Suggestions stop mid-statement.** Raise `twinny.numPredictFim`. twinny also cuts at the end of the enclosing block; that is intended.

## Chat and inline edit

**Nothing answers.** No chat provider is set, or the active one is failing. The empty chat says which model it will answer with.

**Answers are cut short.** Raise `twinny.numPredictChat`.

**The edit came back as prose, or with fences.** Small models sometimes explain instead of editing. Try a more direct instruction, or a larger model. The parser already strips fences and thinking blocks.

**Apply from chat put the code in the wrong place.** Apply matches the block against the file; if the block was heavily edited by the model it may not match. Reject and paste by hand, or select the target lines first and use `Ctrl+I`.

## Workspace index

**`@workspace` says there is no index.** Build one in the Embeddings tab.

**Nothing scored above the threshold.** Lower the rerank threshold in the Embeddings tab, or check that the index is current with **Update**.

**The index was built with a different model.** Vectors from different models do not mix. **Rebuild**.

**Indexing is slow.** It is bounded by the embedding server. A small model such as `nomic-embed-text` or `all-minilm` on the GPU indexes a mid-sized project in a couple of minutes. Exclude generated folders with `twinny.embeddingIgnoredGlobs`.

## Ollama specifics

- Ollama listens on `127.0.0.1:11434` by default. To reach it from another machine or a container, start it with `OLLAMA_HOST=0.0.0.0` and point the provider at the machine's LAN address. Or use [Devices](/twinny-docs/providers/devices/), which needs no such change.
- `twinny.ollamaHostname` defaults to `0.0.0.0`, which twinny treats as localhost when calling.
- If completions are cut short at odd places, Ollama's default context may be small. Create a Modelfile with `PARAMETER num_ctx 8192` or set the server's default.
- `ollama ps` shows what is loaded and whether it is on the GPU.

## Devices (P2P)

- **Offline** on the card: the node is not running, or UDP is blocked. Allow the node's port (49737) through the firewall on the sharing machine. Some corporate networks block UDP entirely.
- **Ollama is not running on the device**: the node is reachable but Ollama is not. Start it there.
- **Pairing code rejected**: codes work once and expire after ten minutes. Press **New pairing code** (or `p` on the CLI).
- **This device is no longer paired**: the sharing side removed you. Pair again.
- Across the internet, the connection is hole-punched. If both sides are behind strict NATs it may not succeed; a VPN between the machines (Tailscale, WireGuard) makes them "on the same network" and always works.

## Terminal features

- `@terminal`, **Fix the last terminal error** and the command writer read output through VS Code's shell integration. If they see nothing, check that shell integration is on (*Terminal › Integrated › Shell Integration: Enabled*) and that the shell is bash, zsh, fish or PowerShell.
- Commands run in a terminal named *Twinny*. The command writer pastes the command and waits for `Enter` in the confirmation box; nothing runs unconfirmed.

## Resetting

- **Providers**: **Reset** in the Providers tab removes them all and returns to the first-run screen.
- **Templates**: delete a file in `~/.twinny/templates/` and it is recreated from the default on the next start.
- **Index**: **Rebuild** in the Embeddings tab, or delete the workspace's folder under `~/.twinny/embeddings/`.
- **P2P identity** (extension): unpair all devices and stop sharing; the identity is in VS Code secret storage. Command line: delete `~/.twinny/node/identity.json`; paired devices must pair again.

## Reporting a bug

Open an issue at [github.com/twinnydotdev/twinny/issues](https://github.com/twinnydotdev/twinny/issues) with the twinny version, VS Code version, the server and model, and the relevant lines from the Twinny output channel at *Debug* level. Redact anything private; keys are redacted automatically.

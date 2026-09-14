---
title: Settings
description: Every twinny setting in VS Code, with its default and what it does.
---

Open with **Open twinny settings** (the gear icon in the sidebar) or search for `twinny` in VS Code settings. Providers, devices and the workspace index are configured in the sidebar rather than here; see [Providers](/twinny-docs/providers/overview/) and [Workspace index](/twinny-docs/features/workspace-index/).

## General

| Setting | Default | Description |
| --- | --- | --- |
| `twinny.enabled` | `true` | Turns the extension on or off. **Enable twinny** and **Disable twinny** in the command palette flip it |
| `twinny.locale` | `en` | Language of the sidebar UI: `en`, `zh-CN`, `zh-HK`, `de`, `es`, `es-CL`, `ja`, `fr`, `it`, `pt`, `ru`, `ko`, `nl` |
| `twinny.temperature` | `0.2` | Randomness of the model's output for chat and completion. Lower is more deterministic |
| `twinny.enableLogging` | `true` | Writes one line per request to the **Twinny** output channel: model, timing, size and why it stopped. Set the channel's log level to *Debug* to also see prompts and replies. Warnings and errors are written even when off |
| `twinny.githubToken` | `""` | Personal access token for listing and reviewing GitHub pull requests in private repositories |
| `twinny.providerStorageLocation` | `globalState` | Where provider configurations live. `globalState` is VS Code's global state; `file` is a file in the extension's global storage, which survives changing remotes or containers |

## Code completion

| Setting | Default | Description |
| --- | --- | --- |
| `twinny.autoSuggestEnabled` | `true` | Suggest as you type. When off, request a suggestion with `Alt+\` |
| `twinny.enabledLanguages` | `{ "*": true }` | Languages to complete in, by VS Code language id, e.g. `{ "*": true, "markdown": false }` |
| `twinny.debounceWait` | `300` | Milliseconds of quiet before a suggestion is requested |
| `twinny.contextLength` | `100` | Lines before and after the cursor sent in the prompt |
| `twinny.multilineCompletionsEnabled` | `true` | Allow suggestions of more than one line |
| `twinny.maxLines` | `40` | Longest multi-line suggestion |
| `twinny.numPredictFim` | `512` | Token budget per completion request. `-1` for no limit; twinny still stops at a sensible boundary |
| `twinny.recentEditsEnabled` | `true` | Include your last few changes, in any open file, as short diffs. Up to 6 changes and 2,500 characters |
| `twinny.lspContextEnabled` | `true` | Include matching IntelliSense symbols and the current call's signature. Up to 20 items, 2,000 characters, 150 ms wait |
| `twinny.fileContextEnabled` | `false` | Include snippets from neighbouring open files. Experimental; costs latency |
| `twinny.completionCacheEnabled` | `false` | Cache suggestions for identical prompts |
| `twinny.enableSubsequentCompletions` | `true` | Request another suggestion straight after one is accepted |

## Chat and review

| Setting | Default | Description |
| --- | --- | --- |
| `twinny.numPredictChat` | `512` | Maximum tokens in one chat answer |
| `twinny.reviewMaxDiffChars` | `16000` | Characters of diff per code-review request. Larger reviews are split into parts |

## Workspace index

| Setting | Default | Description |
| --- | --- | --- |
| `twinny.embeddingIgnoredGlobs` | `[]` | Extra glob patterns to skip when indexing, e.g. `**/*.md` or `**/fixtures/**`. Only source, config and documentation files are indexed to begin with |
| `twinny.embeddingUpdateOnSave` | `true` | Re-embed a file when it is saved and forget it when deleted, once the workspace has been indexed |

Chunk sizes, the rerank threshold, the snippet count and automatic use are set in the Embeddings tab of the sidebar.

## Ollama

Used for listing models in the provider form and device cards, and for the Ollama this machine shares with paired devices.

| Setting | Default | Description |
| --- | --- | --- |
| `twinny.ollamaHostname` | `0.0.0.0` | Hostname of the local Ollama. `0.0.0.0` is treated as localhost |
| `twinny.ollamaApiPort` | `11434` | Port of the local Ollama |
| `twinny.ollamaUseTls` | `false` | Use HTTPS to reach Ollama |
| `twinny.keepAlive` | `5m` | How long Ollama keeps a model loaded after a request: `5m`, `1h`, or `-1` for indefinitely |

## Devices (P2P)

| Setting | Default | Description |
| --- | --- | --- |
| `twinny.p2pPort` | `49737` | UDP port this computer listens on when sharing its Ollama. Allow it through the firewall, e.g. `sudo ufw allow 49737/udp`. Takes effect the next time sharing starts |

## Settings chosen in the sidebar

These are stored by twinny rather than in `settings.json`:

| Where | What |
| --- | --- |
| Providers tab | The providers, which one is active per job, paired devices, whether this computer is sharing |
| Embeddings tab | Chunk sizes, rerank threshold, snippet count, use-the-index-for-every-message |
| Manage templates | Which templates appear as chat suggestions |

## Per-workspace overrides

All `twinny.*` settings can be set at the workspace level in `.vscode/settings.json`, for example to disable suggestions in a documentation repository:

```json
{
  "twinny.autoSuggestEnabled": false,
  "twinny.embeddingIgnoredGlobs": ["**/generated/**"]
}
```

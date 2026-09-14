---
title: Import and export
description: Moving provider configurations between machines.
---

The Providers tab has **Export** and **Import** buttons that move the whole provider list as a JSON file. Use them to set up a second machine, to share a team configuration, or to keep a backup.

## Export

**Export** asks where to save and writes every provider as a JSON object keyed by provider id:

```json
{
  "b2c1…": {
    "id": "b2c1…",
    "label": "Ollama",
    "type": "chat",
    "provider": "ollama",
    "modelName": "qwen2.5-coder:7b-instruct",
    "apiHostname": "localhost",
    "apiPort": 11434,
    "apiProtocol": "http",
    "apiPath": "/v1",
    "apiKey": ""
  },
  "9f0e…": {
    "id": "9f0e…",
    "label": "Ollama FIM",
    "type": "fim",
    "provider": "ollama",
    "modelName": "qwen2.5-coder:1.5b-base",
    "apiHostname": "localhost",
    "apiPort": 11434,
    "apiProtocol": "http",
    "apiPath": "/api/generate",
    "apiKey": "",
    "fimTemplate": "automatic"
  }
}
```

**API keys are included in the export.** Treat the file as a secret, or blank the `apiKey` fields before sharing it.

## Import

**Import** asks for a file and accepts either the exported object or a plain array of providers. Each entry is normalised and validated the same way the form does (ports coerced to numbers, pasted URLs split, paths given a leading slash, fields that do not apply to the type dropped); entries that still fail validation are skipped, and the notification says how many were imported and how many skipped.

Ids are kept, so importing the same file again **updates** the matching providers rather than duplicating them. Providers in the file that are not on this machine are added; providers on this machine that are not in the file are left alone.

## Fields

| Field | Required | Notes |
| --- | --- | --- |
| `id` | | Any unique string. Generated if missing |
| `label` | ✓ | Display name |
| `type` | ✓ | `chat`, `fim` or `embedding` |
| `provider` | ✓ | `ollama`, `lmstudio`, `llamacpp`, `oobabooga`, `litellm`, `openwebui`, `openai-compatible`, `openai`, `anthropic`, `mistral`, `groq`, `openrouter`, `cohere`, `perplexity`, `gemini`, `deepseek`, or `twinny-p2p` |
| `modelName` | ✓ | |
| `apiHostname` | for endpoint providers | Hostname only |
| `apiPort` | | Number |
| `apiProtocol` | | `http` or `https` |
| `apiPath` | | Base for chat, full route otherwise |
| `apiKey` | for hosted APIs | |
| `fimTemplate` | fim only | `automatic`, `codellama`, `deepseek`, `codeqwen`, `codestral`, `codegemma`, `stable-code`, `starcoder`, `llama` or `custom-template` |
| `deviceId` | twinny-p2p only | The paired device's public key. A device provider only works on a machine that has paired with that device |

## Where providers are stored

By default in VS Code's global state for the installation. Set `twinny.providerStorageLocation` to `file` to keep them in a JSON file inside the extension's global storage directory instead; this survives changes that reset global state, and is easier to back up. Export before switching if you have providers you want to keep, then import them afterwards.

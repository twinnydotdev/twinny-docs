---
title: Hosted APIs
description: Using OpenAI, Anthropic, Mistral, DeepSeek, OpenRouter, Gemini, Groq, Cohere and Perplexity with twinny.
---

Hosted APIs give you large models without hardware. twinny treats them as providers like any other; the difference is that your code is sent to the vendor, and you pay per token. Keys are stored with the provider in VS Code's storage and are redacted from twinny's logs.

Chat with a hosted API goes through the vendor's SDK to its fixed endpoint, so the hostname, port and path fields are hidden. Completion and embeddings, where offered, are plain HTTP requests to the vendor's route.

## What each one can do

| Provider | Chat | Autocomplete (FIM) | Embeddings | Get a key |
| --- | --- | --- | --- | --- |
| OpenAI | ✓ | | ✓ `/v1/embeddings` | [platform.openai.com](https://platform.openai.com/) |
| Anthropic | ✓ | | | [console.anthropic.com](https://console.anthropic.com/) |
| Mistral | ✓ | ✓ Codestral `/v1/fim/completions` | | [console.mistral.ai](https://console.mistral.ai/) |
| DeepSeek | ✓ | ✓ `/beta/completions` | | [platform.deepseek.com](https://platform.deepseek.com/) |
| OpenRouter | ✓ | ✓ `/api/v1/completions` | | [openrouter.ai](https://openrouter.ai/) |
| Gemini | ✓ | | | [aistudio.google.com](https://aistudio.google.com/) |
| Groq | ✓ | | | [console.groq.com](https://console.groq.com/) |
| Cohere | ✓ | | | [dashboard.cohere.com](https://dashboard.cohere.com/) |
| Perplexity | ✓ | | | [perplexity.ai/settings/api](https://www.perplexity.ai/settings/api) |

Anthropic, Groq, Cohere, Perplexity and Gemini are chat-only: they have no completions endpoint twinny can drive with a fill-in-the-middle prompt. The form will not let you create an autocomplete provider for them.

## Presets

**Add provider** → *Hosted APIs* lists each with a default model name you can change:

| Provider | Default chat model | Notes |
| --- | --- | --- |
| OpenAI | `gpt-4.1` | Embeddings preset uses `text-embedding-3-small` |
| Anthropic | `claude-sonnet-4-20250514` | |
| DeepSeek | `deepseek-chat` | Completion uses the same key with `/beta/completions`; `deepseek-coder` models work for FIM |
| Gemini | `gemini-2.5-pro-preview-05-06` | |
| Groq | `llama-3.3-70b-versatile` | Very fast; good for chat with open models |
| Mistral | `mistral-small-latest` | The **Codestral** preset (`codestral-latest`) is the recommended hosted autocomplete model |
| OpenRouter | `openai/gpt-4.1` | One key for hundreds of models; names are `vendor/model` |
| Cohere | `command-r-plus` | |
| Perplexity | `llama-3.1-sonar-small-128k-online` | Answers can include web search results |

Model names change as vendors release new ones; use whatever the vendor's documentation lists. twinny does not validate hosted model names until a request is made, and a wrong name comes back as a *model not found* error.

## Codestral for completion

Mistral's Codestral is trained for fill-in-the-middle and served at a dedicated FIM endpoint, which makes it the one hosted option twinny recommends for autocomplete:

1. **Add provider** → Autocomplete → **Codestral**.
2. Paste a Mistral API key. Codestral may need its own key from the Codestral section of the Mistral console, depending on your plan.
3. The FIM template is preset to `codestral`.

Latency is network-bound, so expect suggestions to arrive a little later than from a local model.

## Mixing local and hosted

A common setup: a local 1.5B model for completion (fast, private, free, good enough for the next few lines) and a hosted model for chat, review and edits. Each job's active provider is independent, so this needs no switching.

## Privacy and cost

- Everything in a request goes to the vendor: the prompt, the attached files, `@workspace` results, review diffs. Do not use a hosted provider for code you may not share.
- Completion sends a request on every pause in typing. With a hosted autocomplete provider that adds up; watch the vendor's usage page or set `twinny.debounceWait` higher.
- twinny sends nothing to any vendor other than the ones you configure, and nothing at all to twinny's authors.

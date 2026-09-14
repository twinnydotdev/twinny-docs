---
title: Supported models
description: Models that work well with twinny for chat, code completion and embeddings.
---

twinny works with any model your server can run, but the three jobs want different kinds of model. The lists below are models that have been tried and work well. If you find another that works, please [open an issue or pull request](https://github.com/twinnydotdev/twinny/issues).

## Chat

Any model trained to follow instructions works for chat, inline edits, code review and commit messages. Smaller models are fine for short questions and edits; reviews and long conversations benefit from a bigger one.

| Model | Sizes | Notes |
| --- | --- | --- |
| [`qwen2.5-coder`](https://ollama.com/library/qwen2.5-coder) `-instruct` | 1.5b, 3b, 7b, 14b, 32b | The best all-round code family at every size |
| [`llama3.1`](https://ollama.com/library/llama3.1), [`llama3.2`](https://ollama.com/library/llama3.2) | 3b, 8b, 70b | Strong general chat |
| [`deepseek-coder-v2`](https://ollama.com/library/deepseek-coder-v2) | 16b | Good at code, needs memory |
| [`codestral`](https://ollama.com/library/codestral) | 22b | Excellent for code; also a FIM model |
| [`mistral`](https://ollama.com/library/mistral), [`mistral-nemo`](https://ollama.com/library/mistral-nemo) | 7b, 12b | |
| [`codellama:7b-instruct`](https://ollama.com/library/codellama:instruct) | 7b, 13b, 34b | Older but reliable |
| [`phind-codellama`](https://ollama.com/library/phind-codellama) | 34b | |

Hosted chat models are listed on [Hosted APIs](/twinny-docs/providers/hosted-apis/).

Vision models (`llama3.2-vision`, `llava`, hosted GPT and Claude models) accept images pasted into the chat.

## Code completion (fill-in-the-middle)

Only models trained with fill-in-the-middle (FIM) tokens can complete code between what is before and after the cursor. For most families that is the **base** or **code** variant. Instruct models will produce suggestions, but they tend to chatter or explain instead of completing.

twinny picks the prompt format from the model name when the FIM template is set to **Automatic**. The table shows which names it recognises.

| Family | Recommended tags | Template | Repo-level context |
| --- | --- | --- | --- |
| Qwen2.5-Coder | [`qwen2.5-coder:1.5b-base`](https://ollama.com/library/qwen2.5-coder:1.5b-base), [`qwen2.5-coder:7b-base`](https://ollama.com/library/qwen2.5-coder:7b-base) | `codeqwen` (any name containing `qwen`) | ✓ |
| CodeLlama | [`codellama:7b-code`](https://ollama.com/library/codellama:7b-code), [`codellama:13b-code`](https://ollama.com/library/codellama:13b-code) | `codellama` | |
| DeepSeek Coder | [`deepseek-coder:6.7b-base`](https://ollama.com/library/deepseek-coder:6.7b-base), [`deepseek-coder:1.3b-base`](https://ollama.com/library/deepseek-coder:1.3b-base) | `deepseek` | |
| Codestral | [`codestral`](https://ollama.com/library/codestral), or Mistral's hosted `codestral-latest` | `codestral` | |
| StarCoder2 | [`starcoder2:3b`](https://ollama.com/library/starcoder2:3b), [`starcoder2:7b`](https://ollama.com/library/starcoder2:7b) | `starcoder` | ✓ |
| Granite Code | [`granite-code:3b-base`](https://ollama.com/library/granite-code), [`granite-code:8b-base`](https://ollama.com/library/granite-code) | `starcoder` | ✓ |
| CodeGemma | [`codegemma:2b-code`](https://ollama.com/library/codegemma:2b-code), [`codegemma:7b-code`](https://ollama.com/library/codegemma:7b-code) | `codegemma` | ✓ |
| Stable Code | [`stable-code:3b-code`](https://ollama.com/library/stable-code:3b-code) | `stable-code` | |
| CodeGeeX | `codegeex4` | `starcoder` | ✓ |

*Repo-level context* means the model has tokens for naming files, so neighbouring files are passed as separate blocks rather than commented text.

Notes:

- A 1.5B to 7B model is the sweet spot for autocomplete: fast enough to keep up with typing, good enough to be useful. Start with `qwen2.5-coder:1.5b-base` and move up if your hardware has room. The `34b` CodeLlama does not do well at FIM.
- `starcoder2` and `codegemma` sometimes fail to stop. Lowering `twinny.temperature` and `twinny.maxLines` helps.
- If a model's name does not match any family, twinny falls back to the CodeLlama format. Set the template by hand in the provider form.
- For a model that needs its own prompt format, choose **custom-template** and edit `~/.twinny/templates/fim.hbs`; see [Prompt templates](/twinny-docs/features/templates/#the-fim-template).

## Embeddings

Embedding models turn text into vectors for the [workspace index](/twinny-docs/features/workspace-index/). twinny recognises a model as an embedding model if its name contains `embed`, `minilm`, `bge`, `e5` or `nomic`.

| Model | Size | Notes |
| --- | --- | --- |
| [`nomic-embed-text`](https://ollama.com/library/nomic-embed-text) | 137M | Good quality, 8k token context. The recommended default |
| [`all-minilm`](https://ollama.com/library/all-minilm) | 23M | Very small and fast; its 256-token window means twinny embeds each chunk in windows |
| [`mxbai-embed-large`](https://ollama.com/library/mxbai-embed-large) | 335M | Higher quality, slower |
| [`bge-m3`](https://ollama.com/library/bge-m3) | 567M | Multilingual |
| [`snowflake-arctic-embed`](https://ollama.com/library/snowflake-arctic-embed) | 22M to 335M | |
| OpenAI `text-embedding-3-small` | hosted | Via the OpenAI embeddings preset |

Changing the embedding model means rebuilding the index, since vectors from different models do not mix. The reranker that orders results is separate and built in; it does not depend on the embedding model.

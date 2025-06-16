---
title: Supported Models
description: A list of AI models compatible with twinny for different features.
---

twinny is a configurable extension, meaning many AI models are technically supported. However, not all models perform optimally with twinny in every scenario. This page lists models that have been tested and are recommended for specific features.

If you discover a model that works well with twinny but isn't listed here, please [open an issue or pull request](https://github.com/rjmacarthy/twinny/issues) to suggest its addition.

### Chat Models

Most chat models trained for instruction-following should work with twinny. Here are some recommended examples:


- [`llama3.1`](https://ollama.com/library/llama3.1)
- [`codellama:7b-instruct`](https://ollama.com/library/codellama:instruct)
- [`phind-codellama`](https://ollama.com/library/phind-codellama)
- [`mistral`](https://ollama.com/library/mistral)
- [`qwen2.5-coder:7b-instruct`](https://ollama.com/library/qwen2.5-coder:7b-instruct)
- [`codestral`](https://ollama.com/library/codestral)

### Code Completion (Fill-in-the-Middle) Models

Only certain models are trained to support the fill-in-the-middle technique effectively. The following are examples of models recommended for this type of code completion. If you find another model that works well, please let us know.

#### Qwen2.5-coder Models

- [`qwen2.5-coder:7b-base`](https://ollama.com/library/qwen2.5-coder:7b-base)

#### Codellama Models

Use the `code` suffixed versions of Codellama models.

- [`codellama:code`](https://ollama.com/library/codellama:code)
- [`codellama:13b-code`](https://ollama.com/library/codellama:13b-code)

Note: The `34b` version of Codellama (e.g., `codellama:34b-code`) does not perform well for fill-in-the-middle tasks.

#### Deepseek Coder Models

Use the `base` versions of Deepseek Coder models.

- [`deepseek-coder:base`](https://ollama.com/library/deepseek-coder:base)

Note: Models that are not `base` versions (e.g., `instruct` versions) do not work well for fill-in-the-middle.

#### Starcoder Models

Use the `base` versions of Starcoder models. The default Ollama tags for Starcoder usually point to the `base` versions.

- [`starcoder`](https://ollama.com/library/starcoder)
- [`starcoder2`](https://ollama.com/library/starcoder2) (e.g., [`starcoder2:7b`](https://ollama.com/library/starcoder2:7b))

Note: `starcoder2` may sometimes fail to stop generating text appropriately. Lowering the temperature and increasing the repeat penalty settings can help mitigate this. For potentially better results with Starcoder2, consider using a specific size like [`starcoder2:7b`](https://ollama.com/library/starcoder2:7b).

#### Stablecode Models

Use the `code` suffixed versions of Stablecode models.

- [`stable-code:3b-code`](https://ollama.com/library/stable-code:3b-code)

#### Codegemma Models

Use the `code` suffixed versions of Codegemma models.

- [`codegemma:7b-code`](https://ollama.com/library/codegemma:7b-code)

Note: `codegemma` may also sometimes fail to stop generating text appropriately. Lowering the temperature and increasing the repeat penalty settings can help.
---
title: Supported models
description: A list of supported models for twinny.
---

twinny is a configurable extension/interface which means many models are technically supported. However, not all models work well with twinny in certain scenarios.  The following is a list of the models that have been tested and found to work well with twinny.  If you find a model that works but is not listed here, please let us know so we can add it to the list or open a pull request to add it.

### Chat

In theory any chat model which is trained for instructing will work with twinny.  The following are some example of models recommended for chat.


- [`llama3.1`](https://ollama.com/library/llama3.1)
- [`codellama:7b-instruct`](https://ollama.com/library/codellama:instruct)
- [`phind-codellama`](https://ollama.com/library/phind-codellama)
- [`mistral`](https://ollama.com/library/mistral)
- [`qwen2.5-coder`](https://ollama.com/library/qwen2.5-coder:7b-instruct)
- [`codestral`](https://ollama.com/library/codestral)

### Fill-in-middle

Only certain models support fill in the middle due to their training data.  The following are some example of models recommended for fill in the middle.  If you find a model that works but is not listed here, please let us know so we can add it to the list or open a pull request to add it.

#### Qwen2.5-coder

- [`qwen2.5-coder:7b-base`](https://ollama.com/library/qwen2.5-coder:7b-base)

#### Codellama models

`code` versions of codellama models.

- [`codellama:code`](https://ollama.com/library/codellama:code)
- [`codellama:13b-code`](https://ollama.com/library/codellama:13b-code)
  
Note: The _34b_ version of codellama does not work well with fill in the middle.

#### Deepseek Coder models

`base` versions of deepseek-coder models.

- [`deepseek-coder:base`](https://ollama.com/library/deepseek-coder:base)

Note: Models which are not base versions do not work well with fill in the middle.

#### Starcoder models

`base` versions of starcoder models. The default and base models are the same.

- [`starcoder`](https://ollama.com/library/starcoder)
- [`starcoder2`](https://ollama.com/library/starcoder2)

Note: Starcoder2 doesn't always stop when it is finished.  Lowering the temperature and upping the repeat penalty helps with this issue.

#### Stablecode models

`code` versions of stablecode models.

- [`stable-code:3b-code`](https://ollama.com/library/stable-code:3b-code)

#### Codegemma models

`code` versions of codegemma models.

- [`codegemma`](https://ollama.com/library/codegemma:7b-code)

Note: CodeGemma doesn't always stop when it is finished.  Lowering the temperature and upping the repeat penalty helps with this issue.
---
title: 支持的模型  
description: Twinny 支持的模型列表  
---

Twinny 是一个可配置的扩展/接口，这意味着许多模型在技术上都可以被支持。然而，并非所有模型在某些场景下都能与 Twinny 良好配合。以下是已测试并与 Twinny 配合良好的模型列表。如果您发现某个模型有效但未列出，请告知我们，我们会将其添加到列表中，或者您也可以提交 pull request 来添加它。

### 聊天模型

理论上，任何经过训练用于指令的聊天模型都能与 Twinny 配合使用。以下是一些推荐用于聊天的模型示例。


- [`llama3.1`](https://ollama.com/library/llama3.1)
- [`codellama:7b-instruct`](https://ollama.com/library/codellama:instruct)
- [`phind-codellama`](https://ollama.com/library/phind-codellama)
- [`mistral`](https://ollama.com/library/mistral)
- [`qwen2.5-coder`](https://ollama.com/library/qwen2.5-coder:7b-instruct)
- [`codestral`](https://ollama.com/library/codestral)

### 填充中间部分模型

由于训练数据的原因，只有某些模型支持填充中间部分。以下是一些推荐用于填充中间部分的模型示例。如果您发现某个模型有效但未列出，请告知我们，我们会将其添加到列表中，或者您也可以提交 pull request 来添加它。

#### Qwen2.5-coder 模型

- [`qwen2.5-coder:7b-base`](https://ollama.com/library/qwen2.5-coder:7b-base)

#### Codellama 模型

`code` 版本的 Codellama 模型。

- [`codellama:code`](https://ollama.com/library/codellama:code)
- [`codellama:13b-code`](https://ollama.com/library/codellama:13b-code)

注意：`codellama:34b` 版本在填充中间部分时效果不佳。

#### Deepseek Coder 模型

`base` 版本的 Deepseek-Coder 模型。

- [`deepseek-coder:base`](https://ollama.com/library/deepseek-coder:base)

注意：非 `base` 版本的模型在填充中间部分时效果不佳。

#### Starcoder 模型

`base` 版本的 Starcoder 模型。默认和基础模型相同。

- [`starcoder`](https://ollama.com/library/starcoder)
- [`starcoder2`](https://ollama.com/library/starcoder2)

注意：Starcoder2 在完成时并不总是会停止。通过降低温度并增加重复惩罚可以缓解这一问题。

使用 [Starcoder2 7b](https://ollama.com/library/starcoder2:7b) 获得最佳效果。

#### Stablecode 模型

`code` 版本的 Stablecode 模型。

- [`stable-code:3b-code`](https://ollama.com/library/stable-code:3b-code)

#### Codegemma 模型

`code` 版本的 Codegemma 模型。

- [`codegemma`](https://ollama.com/library/codegemma:7b-code)

注意：Codegemma 在完成时并不总是会停止。通过降低温度并增加重复惩罚可以缓解这一问题。
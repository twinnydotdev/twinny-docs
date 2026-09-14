---
title: 支持的模型
description: 适用于 twinny 对话、代码补全和嵌入的模型。
---

twinny 可以使用你的服务器能运行的任何模型，但三项工作需要不同类型的模型。下面列出的是经过尝试且效果良好的模型。如果你发现其他好用的模型，请[提交 issue 或 pull request](https://github.com/twinnydotdev/twinny/issues)。

## 对话

任何经过指令训练的模型都可用于对话、内联编辑、代码审查和提交信息。小模型足以应付简短问题和编辑；审查和长对话则受益于更大的模型。

| 模型 | 规格 | 说明 |
| --- | --- | --- |
| [`qwen2.5-coder`](https://ollama.com/library/qwen2.5-coder) `-instruct` | 1.5b、3b、7b、14b、32b | 各规格下最全面的代码模型系列 |
| [`llama3.1`](https://ollama.com/library/llama3.1)、[`llama3.2`](https://ollama.com/library/llama3.2) | 3b、8b、70b | 通用对话能力强 |
| [`deepseek-coder-v2`](https://ollama.com/library/deepseek-coder-v2) | 16b | 擅长代码，需要较多内存 |
| [`codestral`](https://ollama.com/library/codestral) | 22b | 代码表现优秀；也是 FIM 模型 |
| [`mistral`](https://ollama.com/library/mistral)、[`mistral-nemo`](https://ollama.com/library/mistral-nemo) | 7b、12b | |
| [`codellama:7b-instruct`](https://ollama.com/library/codellama:instruct) | 7b、13b、34b | 较旧但可靠 |
| [`phind-codellama`](https://ollama.com/library/phind-codellama) | 34b | |

托管对话模型见[托管 API](/twinny-docs/zh-cn/providers/hosted-apis/)。

视觉模型（`llama3.2-vision`、`llava`、托管的 GPT 和 Claude 模型）接受粘贴到对话中的图片。

## 代码补全（fill-in-the-middle）

只有使用 fill-in-the-middle（FIM）标记训练的模型才能在光标前后的内容之间补全代码。对大多数系列来说是 **base** 或 **code** 变体。instruct 模型也会给出建议，但往往会啰嗦或解释，而不是补全。

FIM 模板设为**自动**时，twinny 根据模型名称选择提示格式。下表列出它能识别的名称。

| 系列 | 推荐标签 | 模板 | 仓库级上下文 |
| --- | --- | --- | --- |
| Qwen2.5-Coder | [`qwen2.5-coder:1.5b-base`](https://ollama.com/library/qwen2.5-coder:1.5b-base)、[`qwen2.5-coder:7b-base`](https://ollama.com/library/qwen2.5-coder:7b-base) | `codeqwen`（任何包含 `qwen` 的名称） | ✓ |
| CodeLlama | [`codellama:7b-code`](https://ollama.com/library/codellama:7b-code)、[`codellama:13b-code`](https://ollama.com/library/codellama:13b-code) | `codellama` | |
| DeepSeek Coder | [`deepseek-coder:6.7b-base`](https://ollama.com/library/deepseek-coder:6.7b-base)、[`deepseek-coder:1.3b-base`](https://ollama.com/library/deepseek-coder:1.3b-base) | `deepseek` | |
| Codestral | [`codestral`](https://ollama.com/library/codestral)，或 Mistral 托管的 `codestral-latest` | `codestral` | |
| StarCoder2 | [`starcoder2:3b`](https://ollama.com/library/starcoder2:3b)、[`starcoder2:7b`](https://ollama.com/library/starcoder2:7b) | `starcoder` | ✓ |
| Granite Code | [`granite-code:3b-base`](https://ollama.com/library/granite-code)、[`granite-code:8b-base`](https://ollama.com/library/granite-code) | `starcoder` | ✓ |
| CodeGemma | [`codegemma:2b-code`](https://ollama.com/library/codegemma:2b-code)、[`codegemma:7b-code`](https://ollama.com/library/codegemma:7b-code) | `codegemma` | ✓ |
| Stable Code | [`stable-code:3b-code`](https://ollama.com/library/stable-code:3b-code) | `stable-code` | |
| CodeGeeX | `codegeex4` | `starcoder` | ✓ |

*仓库级上下文*指模型有标记文件名的 token，相邻文件会作为独立块传入，而不是注释文本。

说明：

- 1.5B 到 7B 的模型是自动补全的最佳区间：跟得上输入速度，又足够有用。从 `qwen2.5-coder:1.5b-base` 开始，硬件有余量再往上。`34b` 的 CodeLlama 在 FIM 上表现不佳。
- `starcoder2` 和 `codegemma` 有时不会停止。降低 `twinny.temperature` 和 `twinny.maxLines` 有帮助。
- 模型名称不匹配任何系列时，twinny 回退到 CodeLlama 格式。可在提供者表单中手动设置模板。
- 需要自定义提示格式的模型，选择 **custom-template** 并编辑 `~/.twinny/templates/fim.hbs`；见[提示词模板](/twinny-docs/zh-cn/features/templates/#fim-模板)。

## 嵌入

嵌入模型把文本转成向量，用于[工作区索引](/twinny-docs/zh-cn/features/workspace-index/)。名称包含 `embed`、`minilm`、`bge`、`e5` 或 `nomic` 的模型会被 twinny 识别为嵌入模型。

| 模型 | 大小 | 说明 |
| --- | --- | --- |
| [`nomic-embed-text`](https://ollama.com/library/nomic-embed-text) | 137M | 质量好，8k token 上下文。推荐默认 |
| [`all-minilm`](https://ollama.com/library/all-minilm) | 23M | 非常小且快；256 token 窗口意味着 twinny 会分窗口嵌入每个分块 |
| [`mxbai-embed-large`](https://ollama.com/library/mxbai-embed-large) | 335M | 质量更高，更慢 |
| [`bge-m3`](https://ollama.com/library/bge-m3) | 567M | 多语言 |
| [`snowflake-arctic-embed`](https://ollama.com/library/snowflake-arctic-embed) | 22M 至 335M | |
| OpenAI `text-embedding-3-small` | 托管 | 通过 OpenAI 嵌入预设 |

更换嵌入模型需要重建索引，因为不同模型的向量不能混用。对结果排序的重排序器是独立且内置的，不依赖嵌入模型。

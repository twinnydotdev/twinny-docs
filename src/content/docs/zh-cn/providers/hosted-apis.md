---
title: 托管 API
description: 在 twinny 中使用 OpenAI、Anthropic、Mistral、DeepSeek、OpenRouter、Gemini、Groq、Cohere 和 Perplexity。
---

托管 API 让你无需硬件就能使用大模型。twinny 把它们当作普通提供者；区别在于你的代码会发送给供应商，并按 token 付费。密钥随提供者保存在 VS Code 存储中，并会从 twinny 的日志中脱敏。

与托管 API 的对话通过供应商的 SDK 发往其固定端点，因此主机名、端口和路径字段被隐藏。补全和嵌入（如果提供）是发往供应商路由的普通 HTTP 请求。

## 各家能做什么

| 提供者 | 对话 | 自动补全（FIM） | 嵌入 | 获取密钥 |
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

Anthropic、Groq、Cohere、Perplexity 和 Gemini 仅支持对话：它们没有 twinny 可以用 fill-in-the-middle 提示驱动的 completions 端点。表单不允许为它们创建自动补全提供者。

## 预设

**添加提供者** → *托管 API* 列出各家及可修改的默认模型名称：

| 提供者 | 默认对话模型 | 说明 |
| --- | --- | --- |
| OpenAI | `gpt-4.1` | 嵌入预设使用 `text-embedding-3-small` |
| Anthropic | `claude-sonnet-4-20250514` | |
| DeepSeek | `deepseek-chat` | 补全使用同一密钥和 `/beta/completions`；`deepseek-coder` 模型可用于 FIM |
| Gemini | `gemini-2.5-pro-preview-05-06` | |
| Groq | `llama-3.3-70b-versatile` | 非常快；适合用开源模型对话 |
| Mistral | `mistral-small-latest` | **Codestral** 预设（`codestral-latest`）是推荐的托管自动补全模型 |
| OpenRouter | `openai/gpt-4.1` | 一个密钥用数百个模型；名称为 `vendor/model` |
| Cohere | `command-r-plus` | |
| Perplexity | `llama-3.1-sonar-small-128k-online` | 回答可包含网页搜索结果 |

供应商发布新模型时名称会变化；以供应商文档列出的为准。twinny 在发出请求前不会校验托管模型名称，名称错误会返回*模型未找到*错误。

## 用 Codestral 做补全

Mistral 的 Codestral 经过 fill-in-the-middle 训练，并在专用 FIM 端点提供服务，因此是 twinny 推荐的唯一托管自动补全选项：

1. **添加提供者** → 自动补全 → **Codestral**。
2. 粘贴 Mistral API 密钥。视套餐而定，Codestral 可能需要 Mistral 控制台 Codestral 区域的单独密钥。
3. FIM 模板已预设为 `codestral`。

延迟受网络限制，建议会比本地模型稍晚到达。

## 混用本地与托管

常见配置：本地 1.5B 模型做补全（快、私密、免费，足以补全接下来几行），托管模型做对话、审查和编辑。每项工作的当前提供者相互独立，无需切换。

## 隐私与费用

- 请求中的一切都会发给供应商：提示、附加的文件、`@workspace` 结果、审查 diff。不要把托管提供者用于不可共享的代码。
- 补全在每次输入停顿时都会发请求。使用托管自动补全提供者时累积起来不少；留意供应商的用量页面，或调高 `twinny.debounceWait`。
- 除你配置的供应商外，twinny 不向任何人发送任何内容，也完全不向 twinny 的作者发送。

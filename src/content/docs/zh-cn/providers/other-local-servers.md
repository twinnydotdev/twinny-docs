---
title: 其他本地服务器
description: Open WebUI、LiteLLM、Oobabooga、vLLM、TGI 以及任何支持 OpenAI API 的服务。
---

任何实现了 OpenAI chat completions API 的服务器都可用于对话。补全需要 `/v1/completions` 风格的路由（或 twinny 认识的原生路由），嵌入需要 `/v1/embeddings` 风格的路由。twinny 为下列服务器提供预设；其他服务器使用通用的 **OpenAI 兼容服务器**预设。

## OpenAI 兼容服务器（vLLM、TGI、SGLang、Jan、GPT4All……）

兜底预设。默认 `localhost:8080`，路径 `/v1`、`/v1/completions` 和 `/v1/embeddings`。改端口以匹配你的服务器。

**vLLM**：

```sh
vllm serve Qwen/Qwen2.5-Coder-7B-Instruct --port 8000
```

端口设为 `8000`，模型名称设为 `Qwen/Qwen2.5-Coder-7B-Instruct`。补全时在另一个端口提供 base 模型（`Qwen/Qwen2.5-Coder-1.5B`）；vLLM 的 `/v1/completions` 接受 twinny 发送的原始 FIM 提示。

**Text Generation Inference**：暴露 OpenAI 兼容端点（`/v1`）并设置端口。TGI 的补全路由同样接受原始提示。

如果服务器需要密钥，粘贴到 API 密钥字段；它以 `Authorization: Bearer` 发送。

## Open WebUI

[Open WebUI](https://openwebui.com/) 为 Ollama（或 OpenAI 兼容后端）提供网页界面和用户账号。twinny 可以经由它访问，当 Open WebUI 是网络上暴露的服务时很有用。

| 工作 | 路径 |
| --- | --- |
| 对话 | `/api`（twinny 追加 `/chat/completions`） |
| 自动补全 | `/ollama/api/generate` |
| 嵌入 | `/ollama/api/embed` |

默认端口 `3000`。每个请求都需要你的 Open WebUI **API 密钥**（Open WebUI 中 Settings → Account）；粘贴到提供者。模型名称是 Open WebUI 列出的 Ollama 标签。

## LiteLLM

[LiteLLM](https://docs.litellm.ai/) 是一个代理，把众多托管和本地 API 汇集到一个 OpenAI 兼容端点之后，并提供密钥管理和花费统计。用配置文件或单个模型启动：

```sh
litellm --model ollama/qwen2.5-coder:7b-instruct --port 4000
```

| 工作 | 路径 |
| --- | --- |
| 对话 | `/v1` |
| 自动补全 | `/v1/chat/completions` |
| 嵌入 | `/v1/embeddings` |

经 LiteLLM 的对话效果良好。自动补全取决于上游模型能否通过 LiteLLM 的对话路由接受原始提示；Ollama 后面的 base 模型可以，仅支持对话的托管模型则不行。如果 LiteLLM 配置了主密钥，粘贴到提供者。

## Oobabooga（text-generation-webui）

开启 API 扩展启动：

```sh
./start_linux.sh --api --listen
```

测试前先在网页界面（`http://localhost:7860`）加载模型。API 在 `5000` 端口：

| 工作 | 路径 |
| --- | --- |
| 对话 | `/v1` |
| 自动补全 | `/v1/completions` |
| 嵌入 | `/v1/embeddings` |

Oobabooga 提供的是已加载的模型，模型名称仅供参考；按系列命名以便*自动* FIM 模板检测生效，或手动选择模板。

## 其他任何服务

提供者表单接受任意主机名、端口、协议和路径，**测试提供者**按钮会告诉你服务器是否响应及其返回内容。如果服务器需要 twinny 没有预设的路径，直接输入。若补全路由期望不同的提示格式，选择 **custom-template** FIM 模板并编辑 `~/.twinny/templates/fim.hbs`；见[提示词模板](/twinny-docs/zh-cn/features/templates/#fim-模板)。

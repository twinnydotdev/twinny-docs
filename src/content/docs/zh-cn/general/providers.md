---
title: 推理提供者  
description: 推理提供者是将 Twinny 与外部模型和服务连接的一种方式。  
---

这些示例配置作为起点，具体的调整可能需要根据您的硬件和软件环境进行。


> 注意：Twinny 聊天（非自动补全）应与任何符合 OpenAI API 规范的 API 兼容。


### Ollama（默认配置）

#### 自动补全

- **主机名：** `localhost`
- **端口：** `11434`
- **路径：** `/api/generate`
- **模型名称：** `codellama:7b-code`
- **FIM 模板：** `codellama`

#### 聊天

- **主机名：** `localhost`
- **端口：** `11434`
- **路径：** `/v1/chat/completions`
- **模型名称：** `codellama:7b-instruct` 

### 使用 Ollama 打开 WebUI

Open WebUI 可作为 Ollama 的代理，简单地配置端点以匹配 OpenWeb UI 提供的服务。

#### 自动补全

- **主机名：** `localhost`
- **端口：** OpenWebUI 服务的端口，通常为 `8080` 或 `3000`。
- **路径：** `/ollama/api/generate`
- **模型名称：** `codellama:7b-code`
- **FIM 模板：** 选择一个与模型匹配的模板，如 `codellama` 用于 `codellama:7b-code` 或 `deepseek` 用于 `deepseek-coder`。

#### 聊天

- **主机名：** `localhost`
- **端口：** OpenWebUI 服务的端口，通常为 `8080` 或 `3000`。
- **路径：** `/ollama/v1/chat/completions`
- **模型名称：** `codellama:7b-instruct` 或任何有效的指令模型。

### LM Studio

#### 自动补全

- **主机名：** `localhost`
- **端口：** `1234`
- **路径：** `/v1/completions`
- **模型名称：** 基础模型，例如 `codellama-7b.Q5_K_M.gguf`
- **LM Studio 预设：** CodeLlama Completion
- **FIM 模板：** 选择一个与模型匹配的模板，如 `codellama` 用于 `CodeLlama-7B-GGUF` 或 `deepseek` 用于 `deepseek-coder:6.7b-base-q5_K_M`。

#### 聊天

- **主机名：** `localhost`
- **端口：** `1234`
- **路径：** `/v1/chat/completions`
- **模型名称：** `codellama:7b-instruct` 或您偏好的指令模型。
- **LM Studio 预设：** 默认或 `CodeLlama Instruct`

### LiteLLM

#### 自动补全

LiteLLM 技术上支持使用 `custom-template` FIM 模板进行自动补全，并通过编辑 `fim.hbs` 文件实现，然而结果将根据您的模型和设置有所不同。

#### 聊天

- **主机名：** `localhost`
- **端口：** `4000`
- **路径：** `/v1/chat/completions`

启动 LiteLLM 使用以下命令：

```bash
litellm --model gpt-4-turbo
```

### Llama.cpp

#### 自动补全

在终端中使用以下 Docker 命令启动 Llama.cpp：

例如，使用 Docker 和 `codellama-7b.Q5_K_M.gguf`：

```bash
docker run -p 8080:8080 --gpus all --network bridge -v /path/to/your/models:/models local/llama.cpp:full-cuda --server -m /models/codellama-7b.Q5_K_M.gguf -c 2048 -ngl 43 -mg 1 --port 8080 --host 0.0.0.0
```

配置您的提供商设置如下：

- **主机名：** `localhost`
- **端口：** `8080`
- **路径：** `/completion`
- **FIM 模板：** 选择一个与模型匹配的模板，如 `codellama` 用于 `CodeLlama-7B-GGUF` 或 `deepseek` 用于 `deepseek-coder:6.7b-base-q5_K_M`。

#### 聊天

Llama.cpp 的聊天功能表现不稳定。如果您获得了良好的结果，请通过打开问题或拉取请求与我们分享。

- **主机名：** `localhost`
- **端口：** `8080`
- **路径：** `/completion`
- **模型名称：** `CodeLlama-7B-GGUF` 或其他强大的指令模型。


### Oobabooga

```bash
bash start_linux.sh --api --listen
```

#### 自动补全

访问 `http://0.0.0.0:7860/` 并加载您的模型：

- **主机名：** `localhost`
- **端口：** `5000`
- **路径：** `/v1/completions`
- **模型名称：** `CodeLlama-7B-GGUF` 或其他有效的指令模型。
- **FIM 模板：** 选择一个与模型匹配的模板，如 `codellama` 用于 `CodeLlama-7B-GGUF` 或 `deepseek` 用于 `deepseek-coder:6.7b-base-q5_K_M`。

#### 聊天

在 Linux 上，Oobabooga 的聊天功能未能成功：

- **主机名：** `localhost`
- **端口：** `5000`
- **路径：** `/v1/chat/completions`
- **模型名称：** `CodeLlama-7B-GGUF`

### Symmetry

Symmetry 是一款去中心化工具，允许您连接到计算资源网络。它可以作为 Twinny 的推理提供商，通过其点对点网络提供访问多种模型的功能。

#### 使用 Symmetry

1. 在 Twinny 扩展设置中，选择您想要的模型。
2. 点击扩展中的 "Connect to Symmetry" 按钮。
3. 扩展将自动连接到 Symmetry 网络，并使用所选模型。

这个简化的过程让您可以轻松连接到 Symmetry 网络，无需手动配置。

> 注意：使用 Symmetry 时，请注意您的请求是由网络中的其他节点处理的。在必要时，请考虑数据的敏感性，并选择可信的提供商。
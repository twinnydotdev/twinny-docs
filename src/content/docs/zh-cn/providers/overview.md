---
title: 提供者概述
description: 三项工作、预设、提供者表单，以及 twinny 如何与服务器通信。
---

一个**提供者**指某台服务器上的某个模型，用于某一项工作。twinny 有三项工作：

| 类型 | 用途 | 需要 |
| --- | --- | --- |
| **对话** | 对话面板回答、内联编辑、代码操作、代码审查、提交信息、终端助手 | 任何 instruct 或 chat 模型 |
| **自动补全**（FIM） | 输入时的内联建议 | 经过 fill-in-the-middle 训练的模型：通常是 **base** 或 **code** 变体 |
| **嵌入** | 为工作区建立索引，让对话能引入相关代码 | 嵌入模型，如 `nomic-embed-text` |

每种类型可以有多个提供者。每种各有一个**当前**提供者：对话和嵌入在提供者标签页用**使用此提供者**选择，当前自动补全提供者还会显示在状态栏提示中。

点击侧边栏顶部的机器人图标或运行 **Manage twinny providers** 打开提供者标签页。

## 首次运行

没有配置任何提供者时，twinny 会同时向本机的常用地址请求模型列表：Ollama、LM Studio、llama.cpp、Oobabooga、LiteLLM、Open WebUI，以及 8080 端口上的通用 OpenAI 兼容服务器。在有响应的服务器中，按上述顺序排在最前的那个会被用来创建对话、自动补全和嵌入提供者，且仅在安装了合适模型时才创建。模型是否合适从名称判断：补全要求名称含 `code`、`coder`、`fim` 或已知的 FIM 系列（`starcoder`、`codestral`、`codegemma`、`stable-code`）；嵌入要求含 `embed`、`minilm`、`bge`、`e5` 或 `nomic`；对话优先选名称含 `instruct` 或 `chat` 的模型，其次是既非代码也非嵌入的模型。名称含 `coder` 的 instruct 模型也算代码模型，所以请检查自动补全分到的是哪个模型。

没有服务器响应时，欢迎界面提供**再次搜索**和**选择提供者**。

## 预设

**添加提供者**显示分为*本机*、*另一台机器*（[Twinny 网关](/twinny-docs/teams/connect/#adding-a-gateway-provider-by-hand)）和*托管 API* 三组的预设；本地组先显示四个，其余通过 **Show more** 链接展开。**自定义提供程序** 则打开空白表单。本地预设会为所选工作填入服务器的主机名、端口和路径，并向服务器请求模型列表；表单选出第一个合适的模型，你可以修改。托管预设填入合理的模型名称并要求密钥。

### 本地服务器

| 服务器 | 对话 | 自动补全 | 嵌入 | 页面 |
| --- | --- | --- | --- | --- |
| Ollama | `localhost:11434` `/v1` | `/api/generate` | `/api/embed` | [Ollama](/twinny-docs/zh-cn/providers/ollama/) |
| LM Studio | `localhost:1234` `/v1` | `/v1/completions` | `/v1/embeddings` | [LM Studio](/twinny-docs/zh-cn/providers/lm-studio/) |
| llama.cpp（`llama-server`） | `localhost:8080` `/v1` | `/completion` | `/embedding` | [llama.cpp](/twinny-docs/zh-cn/providers/llama-cpp/) |
| Oobabooga | `localhost:5000` `/v1` | `/v1/completions` | `/v1/embeddings` | [其他本地服务器](/twinny-docs/zh-cn/providers/other-local-servers/) |
| LiteLLM | `localhost:4000` `/v1` | `/v1/chat/completions` | `/v1/embeddings` | [其他本地服务器](/twinny-docs/zh-cn/providers/other-local-servers/) |
| Open WebUI | `localhost:3000` `/api` | `/ollama/api/generate` | `/ollama/api/embed` | [其他本地服务器](/twinny-docs/zh-cn/providers/other-local-servers/) |
| OpenAI 兼容服务器 | `localhost:8080` `/v1` | `/v1/completions` | `/v1/embeddings` | [其他本地服务器](/twinny-docs/zh-cn/providers/other-local-servers/) |

对话的路径是 API **基路径**，twinny 自行追加 `/chat/completions`；以 `/chat/completions` 结尾保存的对话路径会被缩短为基路径。自动补全和嵌入的路径是完整路由。

Ollama、LM Studio、llama.cpp 和 OpenAI 兼容服务器有自动补全和嵌入预设。Oobabooga、LiteLLM 和 Open WebUI 只有对话预设；用于其他工作时，选择 **自定义提供程序**，在**提供者**列表中选中该服务器，上表中的路径会自动填入。QVAC 没有预设，同样如此；见[其他本地服务器](/twinny-docs/zh-cn/providers/other-local-servers/#qvac)。

### 托管 API

| 提供者 | 对话 | 自动补全 | 嵌入 |
| --- | --- | --- | --- |
| OpenAI | ✓ | | ✓ |
| Anthropic | ✓ | | |
| Mistral | ✓ | ✓ Codestral | |
| DeepSeek | ✓ | ✓ | |
| OpenRouter | ✓ | ✓ | |
| Gemini | ✓ | | |
| Groq | ✓ | | |
| Cohere | ✓ | | |
| Perplexity | ✓ | | |

详情、模型名称和获取密钥的地址见[托管 API](/twinny-docs/zh-cn/providers/hosted-apis/)。

### Twinny 网关

**Twinny gateway** 提供者连接团队的 `twinny-server`，用于对话、自动补全或嵌入，网关密钥保存在 VS Code 的密钥存储中。**Connect to team** 会替你设置好；见[连接到团队](/twinny-docs/teams/connect/)。

### 另一台设备

**Twinny device (P2P)** 提供者使用你另一台电脑上的 Ollama。它在提供者标签页的**设备**区域创建，而不是通过预设。见[设备](/twinny-docs/zh-cn/providers/devices/)。

## 提供者表单

| 字段 | 说明 |
| --- | --- |
| 标签 | 名称，显示在菜单和状态栏 |
| 类型 | 对话、自动补全或嵌入 |
| 提供者 | 服务器或 API 系列，决定默认值和请求格式 |
| 主机名 | 只填主机，如 `localhost`。粘贴 `https://my-box:8080/v1` 这样的完整 URL 会被拆分为协议、主机、端口和路径 |
| 端口 | 留空表示协议默认端口 |
| 协议 | `http` 或 `https` |
| API 路径 | 见上表 |
| 模型名称 | 能获取列表时从服务器的模型中选择（**从服务器的模型中选择**），否则手动输入 |
| FIM 模板 | 仅自动补全。**自动**根据模型名称选择格式；建议看起来不对时手动设置 |
| 存储库级别 | 仅自动补全。无论 `twinny.fileContextEnabled` 如何设置，每次都以 Qwen2.5-Coder 的仓库级提示格式发送相邻文件 |
| API 密钥 | 托管 API 必填；本地服务器可选，设置后作为 bearer token 发送 |

托管对话使用固定的公共端点，因此其主机名、端口和路径被隐藏。设备提供者没有任何端点字段。

表单在输入时校验，并在 **Will call** 下显示请求将发往的 URL。**测试提供者**为该提供者的工作发送一个小请求，显示成功或服务器返回的错误以及调用的 URL。

## 管理提供者

- **使用此提供者**将其设为该类型的当前提供者。
- **复制**复制一个提供者，用于同一服务器的另一个模型。
- **导出**和**导入**以 JSON 在机器间迁移列表。见[导入与导出](/twinny-docs/zh-cn/providers/import-export/)。
- **重置**删除所有提供者并回到首次运行界面。

提供者默认保存在 VS Code 全局状态中。把 `twinny.providerStorageLocation` 设为 `file` 可改为保存在扩展全局存储目录中的文件里，跨远程环境工作时更稳妥。

## 请求是如何发出的

twinny 有一个推理层，包含三类适配器：

- **HTTP**：向你指定的地址发出普通的流式请求。用于所有本地服务器、DeepSeek、已配对设备，以及托管 API 的补全和嵌入端点。对话以 OpenAI 格式发往 `<路径>/chat/completions`；补全使用服务器的原生路由（Ollama 的 `/api/generate`，llama.cpp 的 `/completion`，其他为 `/v1/completions`），并按模型渲染 FIM 提示。
- **托管**：用供应商自己的 SDK 与 Anthropic、OpenAI、Mistral、Groq、OpenRouter、Cohere、Perplexity 和 Gemini 对话。端点固定。带有[智能体模式](/twinny-docs/zh-cn/features/agent-mode/)工具的 OpenAI 对话改走其 Responses API（`/v1/responses`）。
- **网关**：通过 Twinny 协议（`/twinny/v1`）连接 `twinny-server`，供 Twinny gateway 提供者使用。

设备提供者是一个 HTTP 提供者，其地址是扩展内的回环网关；该网关通过 P2P 连接转发到已配对机器的 Ollama。

每个失败都会被归为少数几类（不可用、模型缺失、未授权、限流、超时、提示过长……）并附上清晰说明，让你看到的通知告诉你该做什么。原始错误保留在日志中。

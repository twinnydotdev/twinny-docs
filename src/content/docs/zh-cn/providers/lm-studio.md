---
title: LM Studio
description: 在 twinny 中使用 LM Studio 的本地服务器。
---

[LM Studio](https://lmstudio.ai/) 是一个用图形界面查找、下载和运行模型的桌面应用。它内置 OpenAI 兼容的本地服务器，twinny 可用于全部三项工作。

## 设置

1. 安装 LM Studio，在 Discover 标签页下载模型。对话选 instruct 模型（`Qwen2.5-Coder-7B-Instruct`）；补全选 base 或 code 模型（`Qwen2.5-Coder-1.5B`）；嵌入选嵌入模型（`nomic-embed-text`）。
2. 打开 **Developer** 标签页并启动服务器。默认端口 `1234`。
3. 加载要提供的模型。内存允许时 LM Studio 可同时加载多个，开启*即时加载*时也能按需加载。

## 在 twinny 中

**添加提供者** → **LM Studio**。twinny 向服务器请求模型列表并填入第一个匹配该工作的模型。默认值：

| 工作 | 路径 |
| --- | --- |
| 对话 | `/v1` |
| 自动补全 | `/v1/completions` |
| 嵌入 | `/v1/embeddings` |

模型名称是 LM Studio 服务器报告的标识符，可在 Developer 标签页看到；通常是小写的仓库名，如 `qwen2.5-coder-7b-instruct`。

## 说明

- 自动补全使用 OpenAI 风格的 `/v1/completions` 路由，并按模型渲染 FIM 提示。*自动*模板检测依据模型名称；如果名称不含系列（例如改名过的 GGUF），请手动选择模板。
- 要从其他机器使用 LM Studio，在服务器设置中开启 *Serve on Local Network*，并把提供者指向该机器地址。或者在那台机器上运行 Ollama 并使用[设备](/twinny-docs/zh-cn/providers/devices/)。
- 服务器的上下文长度在 LM Studio 的模型设置中按模型设置。审查和长对话时调高。
- 请求以模型未找到失败，说明模型未加载。在 LM Studio 中加载或开启即时加载。

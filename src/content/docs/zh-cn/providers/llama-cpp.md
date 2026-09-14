---
title: llama.cpp
description: 在 twinny 中使用 llama.cpp 的 llama-server 进行补全、对话和嵌入。
---

[llama.cpp](https://github.com/ggml-org/llama.cpp) 是大多数本地服务器背后的推理引擎。直接运行它的 `llama-server` 可以完全控制模型文件、上下文大小、GPU 卸载和线程数，开销最小。GGUF 文件由你自己管理。

## 启动服务器

下载 GGUF（例如从 Hugging Face）并启动：

```sh
llama-server -m qwen2.5-coder-7b-instruct-q4_k_m.gguf \
  --port 8080 -c 8192 -ngl 99
```

- `-c` 设置上下文大小；`-ngl 99` 把所有层卸载到 GPU。
- 如果该服务器还要回答嵌入请求，加上 `--embedding`。
- 较新版本可用 `-hf user/repo` 直接从 Hugging Face 下载模型。

一个 `llama-server` 只服务一个模型。为不同的补全模型在另一个端口再启动一个：

```sh
llama-server -m qwen2.5-coder-1.5b-q8_0.gguf --port 8081 -c 4096 -ngl 99
```

## 在 twinny 中

**添加提供者** → **llama.cpp**。默认值：

| 工作 | 路径 | 说明 |
| --- | --- | --- |
| 对话 | `/v1` | OpenAI 兼容对话 |
| 自动补全 | `/completion` | llama.cpp 原生路由，FIM 提示由 twinny 渲染 |
| 嵌入 | `/embedding` | 服务器需以 `--embedding` 运行 |

对 llama.cpp 来说模型名称仅供参考，因为服务器只加载了一个模型；但设为*自动*时 twinny 仍用它选择 FIM 模板，所以请按系列命名（`qwen2.5-coder-1.5b`）或手动选择模板。

如果端口不是 8080，在提供者中修改。由于通用的 *OpenAI 兼容服务器*预设也默认 8080，首次运行发现会把响应者优先归为 llama.cpp。

## 提示

- 量化在文件名中：`q4_k_m` 是常见的平衡点；`q8_0` 接近无损，体积翻倍。
- 在支持的 GPU 上，`--flash-attn` 和 `-ctk q8_0 -ctv q8_0` 可减少大上下文的内存占用。
- 服务器会在控制台打印每个请求的耗时，便于调优补全延迟。
- Docker：`ghcr.io/ggml-org/llama.cpp:server`（或 `:server-cuda`），加上 `-v /path/to/models:/models -p 8080:8080` 和相同参数。

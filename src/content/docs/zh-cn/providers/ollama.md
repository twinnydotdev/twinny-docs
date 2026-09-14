---
title: Ollama
description: "为 twinny 设置 Ollama：模型、上下文、远程访问与调优。"
---

[Ollama](https://ollama.com/) 是 twinny 支持最完善的本地服务器。它作为后台服务运行，一条命令拉取模型，提供原生的补全（`/api/generate`）和嵌入（`/api/embed`）端点，以及 OpenAI 兼容的对话 API（`/v1`）。它也是[设备](/twinny-docs/zh-cn/providers/devices/)在机器间共享的对象。

## 安装与拉取

从 [ollama.com/download](https://ollama.com/download) 安装（macOS、Windows、Linux）。然后：

```sh
ollama pull qwen2.5-coder:7b-instruct   # 对话、编辑、审查
ollama pull qwen2.5-coder:1.5b-base     # 补全
ollama pull nomic-embed-text            # 工作区索引（可选）
```

`ollama list` 显示已有模型；`ollama ps` 显示已加载的模型及是否在 GPU 上。

## 让 twinny 自动设置

Ollama 运行时，twinny 的首次运行发现会在 11434 端口找到它，并为每项有合适模型的工作创建提供者。之后，**添加提供者** → **Ollama** 对单项工作做同样的事，从服务器列出模型供你选择。

twinny 使用的默认值：

| 工作 | 路径 | 模型名称 |
| --- | --- | --- |
| 对话 | `/v1`（twinny 追加 `/chat/completions`） | 如 `qwen2.5-coder:7b-instruct` |
| 自动补全 | `/api/generate` | 如 `qwen2.5-coder:1.5b-base`，FIM 模板*自动* |
| 嵌入 | `/api/embed` | 如 `nomic-embed-text` |

模型名称就是 Ollama 标签，与 `ollama list` 打印的完全一致。

## 保持模型加载

Ollama 在一段时间不活动后卸载模型，下一个请求要付出加载时间。每个请求都会附带 `twinny.keepAlive`（默认 `5m`）来控制：`1h`、`24h`，或 `-1` 表示常驻。如果对话和补全使用不同模型而 GPU 放不下两个，它们会互相换出；要么两者用同一模型，要么补全用更小的模型，要么接受换出。

## 上下文大小

Ollama 的默认上下文窗口较小。对于输入较长的对话和审查，创建一个更大上下文的变体：

```
# Modelfile
FROM qwen2.5-coder:7b-instruct
PARAMETER num_ctx 16384
```

```sh
ollama create qwen2.5-coder:7b-instruct-16k -f Modelfile
```

然后在对话提供者中使用该标签。更大的上下文占用更多内存。补全不需要大窗口；twinny 会保持 FIM 提示简短。

## 从其他地方访问 Ollama

Ollama 只监听 `127.0.0.1`。要让其他机器或容器调用它，用以下方式启动：

```sh
OLLAMA_HOST=0.0.0.0 ollama serve
```

（或在服务的环境中设置 `OLLAMA_HOST`），然后把提供者指向该机器的局域网地址。此时网络上的任何人都能使用它，因此只在可信网络上这样做。

对于你自己的机器，[设备](/twinny-docs/zh-cn/providers/devices/)是更好的选择：无需更改 Ollama，可跨网络工作，且只有配对的设备能连接。

## Docker 或 WSL 中的 Ollama

- **Ollama 在容器中，VS Code 在宿主机**：发布端口（`-p 11434:11434`）并使用 `localhost`。
- **VS Code 在容器中（Dev Containers），Ollama 在宿主机**：主机名用 `host.docker.internal`，或宿主机的局域网地址。
- **WSL**：安装在 Windows 中的 Ollama 可从 WSL 通过 Windows 主机地址访问；安装在 WSL 内的 Ollama 对基于 WSL 的 VS Code 来说就是 `localhost`。

## twinny 的 Ollama 设置

这些设置用在单个提供者之外：列出模型，以及本机共享给已配对设备的 Ollama：

| 设置 | 默认 | |
| --- | --- | --- |
| `twinny.ollamaHostname` | `0.0.0.0` | 调用时视为 localhost |
| `twinny.ollamaApiPort` | `11434` | |
| `twinny.ollamaUseTls` | `false` | |
| `twinny.keepAlive` | `5m` | 随每个请求发送 |

## 提示

- **速度**：`ollama ps` 应显示 `100% GPU`。显示 CPU 说明模型超出显存，换更小的。
- **量化**：默认标签是 4 位。`:7b-instruct-q8_0` 质量更高、内存翻倍；`:7b-instruct-q3_K_M` 更小、略差。
- **同时多个模型**：较新的 Ollama 在内存允许时可保持多个模型加载（`OLLAMA_MAX_LOADED_MODELS`）。
- **日志**：Linux 上 `journalctl -u ollama`，macOS 和 Windows 上 Ollama 应用的日志，显示服务器如何处理请求。

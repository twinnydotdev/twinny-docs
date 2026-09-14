---
title: 选择模型服务器
description: 本地、托管或你的另一台设备，以及什么硬件能跑什么模型。
---

twinny 的能力取决于背后的模型，模型的速度取决于运行它的机器。本页帮助你根据硬件和工作方式选择合适的方案。

## 运行模型的三种方式

| | 本地服务器 | 你的另一台设备 | 托管 API |
| --- | --- | --- | --- |
| 模型运行在 | 本机 | 你拥有的另一台电脑，通过 P2P | 供应商的服务器 |
| 你的代码去向 | 不离开本机 | 你的另一台机器，加密传输 | 供应商 |
| 费用 | 免费 | 免费 | 按 token 计费 |
| 补全延迟 | 最佳 | 局域网内良好 | 取决于供应商 |
| 模型质量上限 | 你的硬件 | 你另一台机器的硬件 | 最高 |
| 离线可用 | 是 | 局域网内是 | 否 |
| 设置 | 安装服务器、拉取模型 | 配对一次 | 粘贴密钥 |

大多数人最终会混用：补全用小型本地模型（速度最重要，任务范围窄），对话和审查用更大的模型，通过[设备](/twinny-docs/zh-cn/providers/devices/)使用台式机 GPU，或使用托管模型。twinny 允许按工作分别选择。

## 选哪个本地服务器

| 服务器 | 适合 | 说明 |
| --- | --- | --- |
| [Ollama](/twinny-docs/zh-cn/providers/ollama/) | 几乎所有人 | 一条命令安装和拉取模型；作为服务运行；原生补全和嵌入端点；设备功能共享的对象 |
| [LM Studio](/twinny-docs/zh-cn/providers/lm-studio/) | 在图形界面中浏览和试用模型 | 带内置服务器的桌面应用；适合喜欢 UI 的 Windows 和 macOS 用户 |
| [llama.cpp](/twinny-docs/zh-cn/providers/llama-cpp/) | 精细控制与最小开销 | 自选 GGUF 文件和每个参数；原始速度最佳；无模型管理 |
| [vLLM、TGI 等](/twinny-docs/zh-cn/providers/other-local-servers/) | 用 GPU 服务器为团队提供服务 | OpenAI 兼容；吞吐量更高；设置更多 |

拿不准就用 Ollama。

## 什么硬件跑什么模型

模型大小以参数量计（1.5B、7B、14B……）。在常见的 4 位量化下，所需内存大约是**每十亿参数 0.6 GB，再加上上下文的余量**。模型必须放进快速内存（GPU 显存或 Apple 统一内存）才能快；溢出到系统内存或在 CPU 上运行也能用，但更慢。

| 可用于模型的内存 | 补全 | 对话与编辑 |
| --- | --- | --- |
| 仅 CPU，8 GB 内存 | `qwen2.5-coder:1.5b-base` | `qwen2.5-coder:1.5b-instruct` 或 `3b-instruct`。慢但可用 |
| 4 至 6 GB 显存 | `qwen2.5-coder:1.5b-base` | `qwen2.5-coder:3b-instruct` |
| 8 GB 显存 | `qwen2.5-coder:1.5b-base` 或 `7b-base` | `qwen2.5-coder:7b-instruct` |
| 12 至 16 GB 显存，或 16 GB 以上 Apple 芯片 | `qwen2.5-coder:7b-base` | `qwen2.5-coder:14b-instruct` |
| 24 GB 显存，或 32 GB 以上 Apple 芯片 | `qwen2.5-coder:7b-base` | `qwen2.5-coder:32b-instruct`、`codestral` |

这些是起点而非规则。其他优秀的模型系列见[支持的模型](/twinny-docs/zh-cn/providers/supported-models/)。

比原始大小更重要的两点：

- **补全要快。** 两秒后才到的建议早已被你打过去了。GPU 上的 1.5B 或 3B base 模型往往比 7B 的补全体验更好，即使硬件跑得动 7B。对话可以等。
- **小显存上一次只驻留一个模型。** 如果对话和补全在同一服务器上使用不同模型，每个请求可能把另一个换出。Ollama 按 `twinny.keepAlive`（默认 5 分钟）保持模型加载；显存足够时两者都能驻留。

## 何时使用托管 API

- 你想要对话、审查和编辑的最佳效果，且代码不涉密。
- 没有 GPU 且 CPU 较慢。
- 想用 Codestral 做补全又不想自己运行。Mistral 托管的 Codestral 是 twinny 推荐的唯一托管自动补全模型。

各托管提供者及其能力见[托管 API](/twinny-docs/zh-cn/providers/hosted-apis/)。Anthropic、Groq、Cohere、Perplexity 和 Gemini 在 twinny 中仅支持对话；它们没有可用于 fill-in-the-middle 的 completions 端点。

## 何时使用设备

你在某处有一台能力强的机器（台式机、家庭服务器、办公室工作站），而在笔记本上写代码。在那台机器上运行 Ollama，从 twinny 或用 `twinny-node` 命令行共享，把笔记本配对一次。之后笔记本就能把那块 GPU 用于任何工作，通过加密连接，在同一网络内或（路由器允许时）跨互联网。见[设备](/twinny-docs/zh-cn/providers/devices/)。

## 上下文窗口

每个模型都有最大上下文，即一次能读取的文本量。twinny 有意保持提示精简：补全提示由光标周围的若干行加上有限的上下文构成，审查 diff 会切分成多部分。如果服务器报告提示过长，可以降低补全的 `twinny.contextLength` 或审查的 `twinny.reviewMaxDiffChars`，或提高服务器的上下文设置（Ollama 的 `num_ctx`，llama.cpp 的 `-c`）。

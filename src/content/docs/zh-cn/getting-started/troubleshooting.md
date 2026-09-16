---
title: 故障排除
description: 每条错误的含义、去哪里查看，以及常见问题的修复方法。
---

## 先看这里

1. 提供者标签页中提供者卡片上的**测试提供者**显示服务器返回的具体错误。
2. **Twinny** 输出通道（**Twinny - Show logs**，或状态栏菜单）每个请求一行，包含模型、耗时和停止原因。把通道日志级别设为 *Debug* 可看到完整提示和回复。API 密钥会被脱敏。

## 错误信息

错误以通知和对话内消息的形式出现。每条都注明提供者，以及相关时调用的 URL。

| 信息 | 含义 | 处理 |
| --- | --- | --- |
| **Could not connect to _provider_ at _url_** | 该地址无服务监听 | 启动服务器。检查提供者的主机名和端口。远程或容器中，“localhost” 指远程 |
| **_provider_ returned a server error (5xx)** | 服务器崩溃或内存不足 | 查看服务器自身日志。换更小的模型或更小的上下文 |
| **_provider_ rejected the request as unauthorised** | 缺少或错误的 API 密钥 | 把密钥粘贴到提供者。代理后的本地服务器可能也需要密钥 |
| **_provider_ does not have the model _name_** | 服务器上没有该模型 | `ollama pull name`，在 LM Studio 中加载，或在表单列表中选另一个 |
| **_provider_ returned 404 at _url_** | API 路径错误 | 对照[提供者](/twinny-docs/zh-cn/providers/overview/#本地服务器)的默认值。对话的路径是基路径（`/v1`），不是 `/v1/chat/completions` |
| **The prompt was too long for _model_** | 服务器的上下文窗口小于请求 | 降低 `twinny.contextLength` 或 `twinny.reviewMaxDiffChars`，或提高服务器的上下文大小 |
| **_provider_ is rate limiting requests** | 托管 API 返回 HTTP 429 | 等待，或升级套餐 |
| **The request to _provider_ timed out** | 限时内无响应；模型可能仍在加载 | 重试。模型切换后的第一个请求较慢 |
| **_provider_ cannot do this** | 提供者不支持该工作，如 Anthropic 的 FIM | 换一个支持的提供者 |
| **_provider_ does not support FIM** | 把仅支持对话的托管 API 设成了自动补全 | 见[托管 API](/twinny-docs/zh-cn/providers/hosted-apis/)了解哪些支持补全 |

## 代码补全

**完全没有建议。**
- 看状态栏：`</> off` 表示自动建议已关闭。点击开启，或按 `Alt+\`。
- 设置了自动补全提供者吗？没有的话提供者标签页的自动补全分区是空的。
- 该语言启用了吗？见 `twinny.enabledLanguages`。
- 输出面板、搜索结果和终端永远不会有建议。
- 其他扩展可能占用了内联建议。禁用 Copilot 等扩展测试。

**建议是闲聊、解释或重复代码。** 模型是 instruct 模型。改用 base 或 code 变体；见[支持的模型](/twinny-docs/zh-cn/providers/supported-models/)。

**建议中包含 `<PRE>`、`<|fim_middle|>` 之类的标记。** FIM 模板与模型不匹配。在提供者表单中手动设置模板，而不是*自动*。

**建议不停止，或连续输出很多行。** 降低 `twinny.maxLines` 和 `twinny.temperature`，优先选择能可靠停止的模型系列（Qwen2.5-Coder、CodeLlama、DeepSeek Coder）。StarCoder2 和 CodeGemma 已知会停不下来。

**建议很慢。** 补全用更小的模型（1.5B 或 3B）。确认模型在 GPU 上而非 CPU（`ollama ps` 显示位置）。如果对话和补全在小显存 GPU 上使用不同模型，它们会互相换出；改用同一模型或增加显存。若开启了 `twinny.fileContextEnabled`，关闭它。

**建议在语句中间停止。** 提高 `twinny.numPredictFim`。twinny 也会在所在块结束处截断，这是有意的。

## 对话与内联编辑

**没有回答。** 未设置对话提供者，或当前提供者失败。空对话会显示将用哪个模型回答。

**回答被截断。** 提高 `twinny.numPredictChat`。

**编辑返回的是文字说明或带围栏。** 小模型有时解释而不是编辑。换更直接的指令，或更大的模型。解析器已会去除围栏和思考块。

**从对话应用的代码放错了位置。** apply 会把代码块与文件匹配；如果模型大幅改写了代码块，可能匹配不上。拒绝后手动粘贴，或先选中目标行再用 `Ctrl+I`。

## 工作区索引

**`@workspace` 提示没有索引。** 在嵌入标签页建立索引。

**没有分块超过阈值。** 在嵌入标签页降低重排序阈值，或用**更新**确保索引是最新的。

**索引由不同模型构建。** 不同模型的向量不能混用。**重建**。

**索引很慢。** 速度受嵌入服务器限制。GPU 上的 `nomic-embed-text` 或 `all-minilm` 等小模型几分钟即可索引中等规模项目。用 `twinny.embeddingIgnoredGlobs` 排除生成的目录。

## Ollama 相关

- Ollama 默认只监听 `127.0.0.1:11434`。要从其他机器或容器访问，用 `OLLAMA_HOST=0.0.0.0` 启动，并把提供者指向该机器的局域网地址。或者使用[设备](/twinny-docs/zh-cn/providers/devices/)，无需此类更改。
- `twinny.ollamaHostname` 默认为 `0.0.0.0`，调用时 twinny 视为 localhost。
- 如果补全在奇怪的位置被截断，可能是 Ollama 默认上下文太小。用 Modelfile 设置 `PARAMETER num_ctx 8192`，或设置服务器默认值。
- `ollama ps` 显示已加载的模型及是否在 GPU 上。

## 设备（P2P）

- 卡片显示**离线**：节点未运行，或 UDP 被阻断。在共享机器的防火墙上放行节点端口（49737）。部分企业网络完全阻断 UDP。
- **设备上的 Ollama 未运行**：节点可达但 Ollama 未运行。在那台机器上启动它。
- **配对码被拒绝**：配对码只能用一次，十分钟后过期。点击**新配对码**（或命令行按 `p`）。
- **此设备已不再配对**：共享方移除了你。重新配对。
- 跨互联网时连接靠打洞。双方都在严格 NAT 之后时可能失败；在两台机器间建立 VPN（Tailscale、WireGuard）会使它们“同网”，总能成功。

## 终端功能

- `@terminal`、**修复最后的终端错误**和命令编写器通过 VS Code 的 shell 集成读取输出。如果它们看不到内容，检查 shell 集成是否开启（*Terminal › Integrated › Shell Integration: Enabled*），以及 shell 是否为 bash、zsh、fish 或 PowerShell。
- 命令在名为 *Twinny* 的终端中运行。命令编写器把命令放入确认框并等待 `Enter`；未确认不会运行。

## 重置

- **提供者**：提供者标签页的**重置**删除全部并回到首次运行界面。
- **模板**：删除 `~/.twinny/templates/` 中的文件，下次启动时从默认值重建。
- **索引**：嵌入标签页的**重建**，或删除 `~/.twinny/embeddings/` 下该工作区的文件夹。
- **P2P 身份**（扩展）：取消所有设备配对并停止共享；身份在 VS Code 密钥存储中。命令行：删除 `~/.twinny/node/identity.json`；已配对设备需重新配对。

## 报告 bug

在 [github.com/twinnydotdev/twinny/issues](https://github.com/twinnydotdev/twinny/issues) 提交 issue，附上 twinny 版本、VS Code 版本、服务器与模型，以及 *Debug* 级别下 Twinny 输出通道的相关行。请去除隐私内容；密钥会自动脱敏。

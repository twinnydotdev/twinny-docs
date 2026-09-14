---
title: 设置
description: VS Code 中 twinny 的所有设置、默认值及作用。
---

用 **Open twinny settings**（侧边栏的齿轮图标）打开，或在 VS Code 设置中搜索 `twinny`。提供者、设备和工作区索引在侧边栏中配置，不在这里；见[推理提供者](/twinny-docs/zh-cn/providers/overview/)和[工作区索引](/twinny-docs/zh-cn/features/workspace-index/)。

## 通用

| 设置 | 默认 | 说明 |
| --- | --- | --- |
| `twinny.enabled` | `true` | 开关扩展。命令面板中的 **Enable twinny** 和 **Disable twinny** 可切换 |
| `twinny.locale` | `en` | 侧边栏界面语言：`en`、`zh-CN`、`zh-HK`、`de`、`es`、`es-CL`、`ja`、`fr`、`it`、`pt`、`ru`、`ko`、`nl` |
| `twinny.temperature` | `0.2` | 对话和补全输出的随机性。越低越确定 |
| `twinny.enableLogging` | `true` | 每个请求向 **Twinny** 输出通道写一行：模型、耗时、大小和停止原因。把通道日志级别设为 *Debug* 还可看到提示和回复。关闭时仍会写入警告和错误 |
| `twinny.githubToken` | `""` | 用于列出和审查私有仓库 GitHub 拉取请求的个人访问令牌 |
| `twinny.providerStorageLocation` | `globalState` | 提供者配置的保存位置。`globalState` 为 VS Code 全局状态；`file` 为扩展全局存储中的文件，切换远程或容器时得以保留 |

## 代码补全

| 设置 | 默认 | 说明 |
| --- | --- | --- |
| `twinny.autoSuggestEnabled` | `true` | 输入时自动建议。关闭后用 `Alt+\` 请求建议 |
| `twinny.enabledLanguages` | `{ "*": true }` | 启用补全的语言（VS Code 语言 id），例如 `{ "*": true, "markdown": false }` |
| `twinny.debounceWait` | `300` | 请求建议前的静默毫秒数 |
| `twinny.contextLength` | `100` | 提示中包含的光标前后行数 |
| `twinny.multilineCompletionsEnabled` | `true` | 允许多行建议 |
| `twinny.maxLines` | `40` | 多行建议的最大长度 |
| `twinny.numPredictFim` | `512` | 每次补全请求的 token 预算。`-1` 为不限；twinny 仍会在合理边界停止 |
| `twinny.recentEditsEnabled` | `true` | 包含你在任何打开文件中的最近几次修改（简短 diff）。最多 6 次修改、2,500 字符 |
| `twinny.lspContextEnabled` | `true` | 包含匹配的 IntelliSense 符号和当前调用的签名。最多 20 项、2,000 字符、等待 150 毫秒 |
| `twinny.fileContextEnabled` | `false` | 包含相邻打开文件的片段。实验性；增加延迟 |
| `twinny.completionCacheEnabled` | `false` | 缓存相同提示的建议 |
| `twinny.enableSubsequentCompletions` | `true` | 接受一条建议后立即请求下一条 |

## 对话与审查

| 设置 | 默认 | 说明 |
| --- | --- | --- |
| `twinny.numPredictChat` | `512` | 单条对话回答的最大 token 数 |
| `twinny.reviewMaxDiffChars` | `16000` | 每次代码审查请求的 diff 字符数。更大的审查会被分成多部分 |

## 工作区索引

| 设置 | 默认 | 说明 |
| --- | --- | --- |
| `twinny.embeddingIgnoredGlobs` | `[]` | 索引时额外跳过的 glob 模式，例如 `**/*.md` 或 `**/fixtures/**`。本身只索引源代码、配置和文档文件 |
| `twinny.embeddingUpdateOnSave` | `true` | 工作区索引完成后，保存文件时重新嵌入，删除时移出索引 |

分块大小、重排序阈值、片段数量和自动使用在侧边栏的嵌入标签页中设置。

## Ollama

用于在提供者表单和设备卡片中列出模型，以及本机共享给已配对设备的 Ollama。

| 设置 | 默认 | 说明 |
| --- | --- | --- |
| `twinny.ollamaHostname` | `0.0.0.0` | 本地 Ollama 的主机名。`0.0.0.0` 视为 localhost |
| `twinny.ollamaApiPort` | `11434` | 本地 Ollama 的端口 |
| `twinny.ollamaUseTls` | `false` | 用 HTTPS 访问 Ollama |
| `twinny.keepAlive` | `5m` | 请求后 Ollama 保持模型加载的时间：`5m`、`1h`，或 `-1` 表示一直保持 |

## 设备（P2P）

| 设置 | 默认 | 说明 |
| --- | --- | --- |
| `twinny.p2pPort` | `49737` | 本机共享 Ollama 时监听的 UDP 端口。需在防火墙放行，例如 `sudo ufw allow 49737/udp`。下次开始共享时生效 |

## 在侧边栏中选择的设置

这些由 twinny 保存，而不在 `settings.json` 中：

| 位置 | 内容 |
| --- | --- |
| 提供者标签页 | 提供者、每项工作的当前提供者、已配对设备、本机是否在共享 |
| 嵌入标签页 | 分块大小、重排序阈值、片段数量、每条消息都使用索引 |
| 管理模板 | 哪些模板作为对话建议显示 |

## 按工作区覆盖

所有 `twinny.*` 设置都可以在 `.vscode/settings.json` 中按工作区设置，例如在文档仓库中禁用建议：

```json
{
  "twinny.autoSuggestEnabled": false,
  "twinny.embeddingIgnoredGlobs": ["**/generated/**"]
}
```

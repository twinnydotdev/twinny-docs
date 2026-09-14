---
title: 代码补全
description: 输入时的 fill-in-the-middle 代码补全、提示如何构建，以及如何调优。
---

twinny 在你输入时以灰色文字在光标处给出代码建议。按 `Tab` 接受，或继续输入以忽略。建议来自当前的**自动补全**提供者，它必须使用经过 fill-in-the-middle（FIM）训练的模型。见[支持的模型](/twinny-docs/zh-cn/providers/supported-models/#代码补全fill-in-the-middle)。

## 自动与手动

默认在停止输入片刻后自动给出建议（`twinny.debounceWait`，300 毫秒）。要关闭自动建议，点击状态栏的 `</>` 图标并选择自动建议开关，或将 `twinny.autoSuggestEnabled` 设为 `false`。此时状态栏显示 `</> off`，仍可用 `Alt+\` 手动请求建议。

`Alt+\` 也是 GitHub Copilot 的默认快捷键，如果两个扩展都安装了，请在*键盘快捷方式*中改掉其中一个。twinny 的绑定在 VS Code 内置命令 **Trigger Inline Suggestion** 上。

用 `twinny.enabledLanguages` 可对特定语言关闭补全，例如 `{ "*": true, "markdown": false, "plaintext": false }`。输出面板、搜索结果和终端永远不会有建议。

## 一条建议是如何产生的

1. **触发。** 你停顿，或按 `Alt+\`。仍在进行中的旧请求会被取消。
2. **前缀与后缀。** twinny 取光标前后各 `twinny.contextLength` 行（上限 12,000 和 3,000 字符），让模型看到周围代码的形状。
3. **上下文。** 从下面的来源收集最多 6,000 字符的额外上下文。
4. **提示。** 该模型的 FIM 模板用模型自己的标记包裹前缀、后缀和上下文。
5. **流式输出。** 回复边到达边显示。建议到达合理的结尾时（见下文）twinny 提前停止，30 秒后放弃。
6. **整理。** 去掉后缀中已有的文本，匹配缩进，移除多余的模板标记。

每一步都记录在 **Twinny** 输出通道；*Debug* 级别可看到精确的提示和回复。

## 模型看到什么

| 上下文 | 设置 | 添加的内容 |
| --- | --- | --- |
| 周围行 | `twinny.contextLength`（100） | 当前文件中光标前后的行 |
| 最近的编辑 | `twinny.recentEditsEnabled`（开） | 你在任何打开文件中的最近几次修改，以简短 diff 呈现（最多 6 次、2,500 字符）。进行中的重命名或正在套用的模式会延续到建议中 |
| IntelliSense | `twinny.lspContextEnabled`（开） | 来自语言服务器的匹配符号和光标所在调用的签名（最多 20 项、2,000 字符、等待 150 毫秒）。模型因此知道存在哪些名称和参数 |
| 相邻文件 | `twinny.fileContextEnabled`（关） | 相关打开文件的片段，最多 3 个文件。对大项目有帮助，但增加延迟 |

具有仓库级 FIM 标记的模型（Qwen2.5-Coder、StarCoder2、CodeGemma、Granite、CodeGeeX）以独立命名块的形式获得额外文件；其他模型以注释块的形式放在前缀之上。

## 长度与停止

小模型不知道何时停止，所以 twinny 替它们决定：

- `twinny.multilineCompletionsEnabled`（开）允许多行建议；`twinny.maxLines`（40）限制其长度。关闭后建议在第一个换行处结束。
- `twinny.numPredictFim`（512）是每次请求的 token 预算。`-1` 取消限制。
- 回复流式到达时，twinny 用 tree-sitter 解析并在所在块或语句结束处截断，因此函数建议在其右花括号处结束，而不会冲进下一个函数。
- 后缀中已有的文本会被去掉，所以在 `foo(|)` 内补全不会多出一个 `)`。
- 该模型系列的停止标记（`<EOT>`、`<|endoftext|>`、`<|file_sep|>` 等）结束回复。
- `twinny.enableSubsequentCompletions`（开）在接受一条建议后立即请求下一条，形成连续接受。
- `twinny.temperature`（0.2）同时作用于对话和补全。建议啰嗦时调低；在大多数服务器上 0 完全确定。

## FIM 模板

各模型系列用不同的标记表示前缀、后缀和中间部分。自动补全提供者有一个 **FIM 模板**字段：

| 模板 | 模型 | 标记 |
| --- | --- | --- |
| `codellama` | CodeLlama，以及未知名称的回退 | `<PRE> … <SUF> … <MID>` |
| `deepseek` | DeepSeek Coder | `<｜fim▁begin｜> … <｜fim▁hole｜> … <｜fim▁end｜>` |
| `codeqwen` | Qwen2.5-Coder、CodeQwen | `<|fim_prefix|> … <|fim_suffix|> … <|fim_middle|>`，上下文用 `<|repo_name|>` 和 `<|file_sep|>` |
| `codestral` | Codestral | `[SUFFIX] … [PREFIX] …` |
| `starcoder` | StarCoder、StarCoder2、Granite Code、CodeGeeX | `<fim_prefix> … <fim_suffix> … <fim_middle>`，带 `<repo_name>` 和 `<file_sep>` |
| `codegemma` | CodeGemma | `<|fim_prefix|> … <|fim_suffix|> … <|fim_middle|>`，带 `<|file_separator|>` |
| `stable-code` | Stable Code | 与 `starcoder` 相同的标记 |
| `llama` | 普通 Llama base 模型 | 与 `codellama` 相同的标记 |
| `custom-template` | 其他任何模型 | 由 `~/.twinny/templates/fim.hbs` 渲染 |

- **自动**（默认）根据模型名称按以下顺序匹配：`codellama`、`deepseek`、`codestral`、`qwen`、`codegemma`、`stable-code`、`starcoder`、`granite`、`codegeex`、`llama`。其他名称回退到 `codellama`。
- 模型名称不常见或建议中出现可见标记时，手动选择模板。
- 光标后没有文本时就没有可填的“中间”，而 base 模型续写纯文本比处理空后缀更可靠；此时 twinny 只发送前缀。

自定义模板的写法见[提示词模板](/twinny-docs/zh-cn/features/templates/#fim-模板)。

## 缓存

`twinny.completionCacheEnabled`（关）记住相同提示的建议。加速重复请求，代价是内存。

## 获得好建议

- **用 base 模型，小，且在 GPU 上。** `qwen2.5-coder:1.5b-base` 在大多数硬件上不到一秒响应，擅长接下来几行；这胜过一个在你早已打过去之后才到的大模型。
- **先写注释。** 一行描述接下来做什么的注释，然后在下一行停顿，多行建议就有了目标。
- **好好命名。** 前缀中的名称是模型最强的线索。IntelliSense 上下文补上它看不到的名称。
- **让最近的编辑为你服务。** 手动改一个调用点，接下来的建议会遵循同样的模式。
- **关掉不需要的。** 只想要单行就关闭多行。建议来得晚就降低 `twinny.contextLength` 或关闭文件上下文。

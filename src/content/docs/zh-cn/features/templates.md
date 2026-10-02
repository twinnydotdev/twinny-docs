---
title: 提示词模板
description: twinny 发送的每个提示都是可编辑的 Handlebars 文件。
---

twinny 用 `~/.twinny/templates/` 中的 [Handlebars](https://handlebarsjs.com/) 模板构建提示。文件夹在 twinny 启动时创建，每个模板一个文件；你编辑过的文件会替代默认值。缺失或为空的文件会回退到内置版本，无法渲染的文件也一样，原因写入 **Twinny** 输出通道。要打开文件夹，点击侧边栏顶部的 **Manage twinny templates**（书本图标），再点 **Open template editor**，或从命令面板运行 **Edit twinny templates**（4.3.5 及以后）；文件夹会在新窗口中打开。

## 模板列表

| 文件 | 用于 | 变量 |
| --- | --- | --- |
| `system.hbs` | 每个对话请求的系统消息。连接到设置了团队系统提示的团队网关时，团队系统提示排在它之前 | `systemMessage`、`osName`、`defaultShell`、`homedir`、`cwd` |
| `explain.hbs` | Explain（右键） | `code`、`language` |
| `refactor.hbs`、`add-types.hbs`、`generate-docs.hbs`、`fix-code.hbs` | 保留用于对话建议；右键命令现在通过内联编辑使用内置指令 | `code`、`language` |
| `add-tests.hbs` | 对话建议 | `code`、`language` |
| `commit-message.hbs` | 生成提交信息 | `code`（diff） |
| `review.hbs` | 代码审查，每部分 | `code`（diff）、`title`、`part` |
| `review-summary.hbs` | 代码审查，最终总结 | `code`（各部分）、`title` |
| `relevant-code.hbs` | 引出 `@workspace` 结果的段落 | `code`（带标签的分块） |
| `fim.hbs` | FIM 模板为 **custom-template** 时的补全 | `prefix`、`suffix`、`context`、`fileName`（完整路径）、`language`、`systemMessage` |
| `fim-system.hbs` | `fim.hbs` 中的 `{{systemMessage}}`；默认为空 | |

代码使用三重花括号（`{{{code}}}`），Handlebars 才不会做 HTML 转义。Handlebars 的内置语法如 `{{#if part}}…{{/if}}` 可用，另外注册了 `eq` 辅助函数，可写 `{{#if (eq language "python")}}…{{/if}}`。

## `systemMessage` 变量

每个模板都可以使用 `{{systemMessage}}`。存在 `<任务>-system.hbs` 时它是该文件的内容（`review.hbs` 对应 `review-system.hbs`，`fim.hbs` 对应 `fim-system.hbs`），否则是 `system.hbs` 的内容。它只出现在模板放置它的位置：默认模板都没有使用它，`<任务>-system.hbs` 文件也不会改变请求的系统消息。审查和提交信息以单条用户消息发送，不带系统消息，因此针对它们的指令应写进 `review.hbs` 或 `commit-message.hbs`。

## 示例

**用另一种语言回答。** 在 `system.hbs` 中：

```handlebars
You are a helpful, respectful and honest coding assistant.
Always reply in Chinese, using markdown. Keep code identifiers in English.
Be clear and concise.
```

**审查中的团队约定。** 在 `review.hbs` 开头加入：

```handlebars
Our conventions: TypeScript strict mode, no default exports, errors are thrown
not returned, tests live next to the source. Flag departures from these.
```

**Conventional Commits。** 替换 `commit-message.hbs`：

```handlebars
Write a git commit message for the diff below in Conventional Commits form:
`type(scope): subject`, where type is one of feat, fix, refactor, docs, test,
chore, perf, build. Subject in the imperative, under 72 characters, no full stop.
Add a body only if it explains something the subject cannot.
Reply with the message only.

{{{code}}}
```

## FIM 模板

`fim.hbs` 只在自动补全提供者的 FIM 模板设为 **custom-template** 时使用。默认是 CodeLlama 格式：

```handlebars
<PRE>{{{prefix}}} <SUF> {{{suffix}}} <MID>
```

写出你的模型期望的格式。假设某模型使用 `<fim-pre>`、`<fim-suf>` 和 `<fim-mid>` 标记并带文件头：

```handlebars
<file>{{fileName}}</file>
{{{context}}}
<fim-pre>{{{prefix}}}<fim-suf>{{{suffix}}}<fim-mid>
```

`context` 是[模型看到什么](/twinny-docs/zh-cn/features/code-completion/#模型看到什么)中描述的补全上下文（开启 `twinny.fileContextEnabled` 时的相邻文件、最近的编辑、定义、IntelliSense），每块位于一行 `// File: <名称>` 之下。两点注意：

- **停止词仍按模型名称选择。** 名称不匹配已知系列时使用 CodeLlama 的停止集，模型自己的结束标记可能不在其中。请按最接近的系列命名模型，否则建议会由 `twinny.maxLines` 截断。
- **空白很重要。** 有的模型要求标记后有空格，有的不要；请严格照抄模型卡片上的格式。

## 对话建议

**Manage twinny templates**（书本图标）选择编辑器中选中代码时，哪些模板作为建议按钮显示在消息框上方。每个按钮对当前选区运行其模板。你加入文件夹的模板也会出现在该列表中；系统消息以及由功能自行填充的模板（`commit-message`、`review`、`review-summary`、`relevant-code`、`fim`）不在其中。

## 重置

删除模板文件后会立即使用内置版本；下次 twinny 启动时该文件会被写回。删除整个文件夹则重置全部。

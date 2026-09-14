---
title: 提示词模板
description: twinny 发送的每个提示都是可编辑的 Handlebars 文件。
---

twinny 用 `~/.twinny/templates/` 中的 [Handlebars](https://handlebarsjs.com/) 模板构建提示。文件夹在首次启动时创建，每个模板一个文件；你编辑过的文件会替代默认值，删除的文件会从默认值重建。运行 **Edit twinny templates**（铅笔图标）打开文件夹。

## 模板列表

| 文件 | 用于 | 变量 |
| --- | --- | --- |
| `system.hbs` | 每个对话请求的系统消息 | `systemMessage`、`osName`、`defaultShell`、`homedir`、`cwd` |
| `explain.hbs` | Explain（右键） | `code`、`language` |
| `refactor.hbs`、`add-types.hbs`、`generate-docs.hbs`、`fix-code.hbs` | 保留用于对话建议；右键命令现在通过内联编辑使用内置指令 | `code`、`language` |
| `add-tests.hbs` | 对话建议 | `code`、`language` |
| `commit-message.hbs` | 生成提交信息 | `code`（diff） |
| `review.hbs` | 代码审查，每部分 | `code`（diff）、`title`、`part` |
| `review-summary.hbs` | 代码审查，最终总结 | `code`（各部分）、`title` |
| `relevant-code.hbs` | 引出 `@workspace` 结果的段落 | `code`（带标签的分块） |
| `fim.hbs` | FIM 模板为 **custom-template** 时的补全 | `prefix`、`suffix`、`context`、`fileName`、`language`、`systemMessage` |
| `fim-system.hbs` | 自定义 FIM 模板的系统消息；默认为空 | |

代码使用三重花括号（`{{{code}}}`），Handlebars 才不会做 HTML 转义。Handlebars 的内置语法如 `{{#if part}}…{{/if}}` 可用，另外注册了 `eq` 辅助函数，可写 `{{#if (eq language "python")}}…{{/if}}`。

## 按任务的系统消息

名为 `<任务>-system.hbs` 的文件会为单个任务覆盖系统消息：`explain-system.hbs` 用于 Explain，`review-system.hbs` 用于审查，`commit-message-system.hbs` 用于提交信息。没有时使用 `system.hbs`。

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

`context` 是以注释块形式呈现的相邻文件（除非开启 `twinny.fileContextEnabled`，否则为空）。两点注意：

- **停止词仍按模型名称选择。** 名称不匹配已知系列时使用 CodeLlama 的停止集，模型自己的结束标记可能不在其中。请按最接近的系列命名模型，否则建议会由 `twinny.maxLines` 截断。
- **空白很重要。** 有的模型要求标记后有空格，有的不要；请严格照抄模型卡片上的格式。

## 对话建议

**Manage twinny templates**（书本图标）选择哪些模板在空对话中作为建议按钮显示。每个按钮对当前选区运行其模板。你加入文件夹的模板也会出现在该列表中。

## 重置

删除模板文件并重启 VS Code，或运行 **Edit twinny templates**；默认值会被写回。删除整个文件夹则重置全部。

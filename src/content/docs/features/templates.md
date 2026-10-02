---
title: Prompt templates
description: Every prompt twinny sends is a Handlebars file you can edit.
---

twinny builds its prompts from [Handlebars](https://handlebarsjs.com/) templates in `~/.twinny/templates/`. The folder is created when twinny starts, with a file per template; a file you edit is used instead of the default from then on. A file that is missing or empty falls back to the built-in copy, as does one that will not render, with the reason in the **Twinny** output channel. To open the folder, click **Manage twinny templates** (the book icon) at the top of the sidebar, then **Open template editor**; the folder opens in a new window.

## The templates

| File | Used by | Variables |
| --- | --- | --- |
| `system.hbs` | The system message for every chat request. Connected to a team gateway that sets a team system prompt, that prompt goes before it | `systemMessage`, `osName`, `defaultShell`, `homedir`, `cwd` |
| `explain.hbs` | Explain (right-click) | `code`, `language` |
| `refactor.hbs`, `add-types.hbs`, `generate-docs.hbs`, `fix-code.hbs` | Kept for chat suggestions; the right-click commands now use inline edit with built-in instructions | `code`, `language` |
| `add-tests.hbs` | Chat suggestion | `code`, `language` |
| `commit-message.hbs` | Generate commit message | `code` (the diff) |
| `review.hbs` | Code review, per part | `code` (the diff), `title`, `part` |
| `review-summary.hbs` | Code review, closing summary | `code` (the parts), `title` |
| `relevant-code.hbs` | The block that introduces `@workspace` results | `code` (the labelled chunks) |
| `fim.hbs` | Completion, when the FIM template is **custom-template** | `prefix`, `suffix`, `context`, `fileName` (the full path), `language`, `systemMessage` |
| `fim-system.hbs` | `{{systemMessage}}` inside `fim.hbs`; empty by default | |

Use triple braces (`{{{code}}}`) for code so Handlebars does not HTML-escape it. Handlebars' built-ins such as `{{#if part}}…{{/if}}` work, and an `eq` helper is registered for `{{#if (eq language "python")}}…{{/if}}`.

## The `systemMessage` variable

Every template can use `{{systemMessage}}`. It is the text of `<task>-system.hbs` when that file exists (`review-system.hbs` for `review.hbs`, `fim-system.hbs` for `fim.hbs`), otherwise the text of `system.hbs`. It goes only where a template puts it: the default templates do not use it, and a `<task>-system.hbs` file does not change the system message of the request. Reviews and commit messages are sent as a single user message with no system message, so instructions for them belong in `review.hbs` or `commit-message.hbs`.

## Examples

**Answer in another language.** In `system.hbs`:

```handlebars
You are a helpful, respectful and honest coding assistant.
Always reply in Japanese, using markdown. Keep code identifiers in English.
Be clear and concise.
```

**Team conventions in reviews.** Prepend to `review.hbs`:

```handlebars
Our conventions: TypeScript strict mode, no default exports, errors are thrown
not returned, tests live next to the source. Flag departures from these.
```

**Conventional Commits.** Replace `commit-message.hbs`:

```handlebars
Write a git commit message for the diff below in Conventional Commits form:
`type(scope): subject`, where type is one of feat, fix, refactor, docs, test,
chore, perf, build. Subject in the imperative, under 72 characters, no full stop.
Add a body only if it explains something the subject cannot.
Reply with the message only.

{{{code}}}
```

## The FIM template

`fim.hbs` is used only when the autocomplete provider's FIM template is set to **custom-template**. The default is the CodeLlama format:

```handlebars
<PRE>{{{prefix}}} <SUF> {{{suffix}}} <MID>
```

Write the format your model expects. For a hypothetical model with `<fim-pre>`, `<fim-suf>` and `<fim-mid>` tokens and a file header:

```handlebars
<file>{{fileName}}</file>
{{{context}}}
<fim-pre>{{{prefix}}}<fim-suf>{{{suffix}}}<fim-mid>
```

`context` holds the completion context described in [What the model sees](/twinny-docs/features/code-completion/#what-the-model-sees) (neighbouring files when `twinny.fileContextEnabled` is on, recent edits, definitions, IntelliSense), each block under a `// File: <name>` line. Two cautions:

- **Stop words are still chosen from the model name.** If the name does not match a known family, the CodeLlama stop set is used, and the model's own end token may not be in it. Name the model after the closest family, or expect the suggestion to be cut by `twinny.maxLines` instead.
- **Whitespace matters.** Some models want a space after a token and some do not; copy the format from the model card exactly.

## Chat suggestions

**Manage twinny templates** (the book icon) chooses which templates appear as suggestion buttons above the message box while code is selected in the editor. Each button runs its template over the current selection. Templates you add to the folder appear in that list; system messages and the templates a feature fills in (`commit-message`, `review`, `review-summary`, `relevant-code`, `fim`) are left out.

## Resetting

Delete a template file and the built-in copy is used straight away; the file is written back the next time twinny starts. Deleting the whole folder resets everything.

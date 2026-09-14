---
title: Prompt templates
description: Every prompt twinny sends is a Handlebars file you can edit.
---

twinny builds its prompts from [Handlebars](https://handlebarsjs.com/) templates in `~/.twinny/templates/`. The folder is created on first start with a file per template; a file you edit is used instead of the default from then on, and a file you delete is recreated from the default. Run **Edit twinny templates** (the pencil icon) to open the folder.

## The templates

| File | Used by | Variables |
| --- | --- | --- |
| `system.hbs` | The system message for every chat request | `systemMessage`, `osName`, `defaultShell`, `homedir`, `cwd` |
| `explain.hbs` | Explain (right-click) | `code`, `language` |
| `refactor.hbs`, `add-types.hbs`, `generate-docs.hbs`, `fix-code.hbs` | Kept for chat suggestions; the right-click commands now use inline edit with built-in instructions | `code`, `language` |
| `add-tests.hbs` | Chat suggestion | `code`, `language` |
| `commit-message.hbs` | Generate commit message | `code` (the diff) |
| `review.hbs` | Code review, per part | `code` (the diff), `title`, `part` |
| `review-summary.hbs` | Code review, closing summary | `code` (the parts), `title` |
| `relevant-code.hbs` | The block that introduces `@workspace` results | `code` (the labelled chunks) |
| `fim.hbs` | Completion, when the FIM template is **custom-template** | `prefix`, `suffix`, `context`, `fileName`, `language`, `systemMessage` |
| `fim-system.hbs` | System message for the custom FIM template; empty by default | |

Use triple braces (`{{{code}}}`) for code so Handlebars does not HTML-escape it. Handlebars' built-ins such as `{{#if part}}…{{/if}}` work, and an `eq` helper is registered for `{{#if (eq language "python")}}…{{/if}}`.

## Per-task system messages

A file named `<task>-system.hbs` overrides the system message for one task: `explain-system.hbs` for Explain, `review-system.hbs` for reviews, `commit-message-system.hbs` for commit messages. Without one, `system.hbs` is used.

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

`context` holds neighbouring files as commented blocks (empty unless `twinny.fileContextEnabled` is on). Two cautions:

- **Stop words are still chosen from the model name.** If the name does not match a known family, the CodeLlama stop set is used, and the model's own end token may not be in it. Name the model after the closest family, or expect the suggestion to be cut by `twinny.maxLines` instead.
- **Whitespace matters.** Some models want a space after a token and some do not; copy the format from the model card exactly.

## Chat suggestions

**Manage twinny templates** (the book icon) chooses which templates appear as suggestion buttons in an empty chat. Each button runs its template over the current selection. Templates you add to the folder appear in that list.

## Resetting

Delete a template file and restart VS Code, or run **Edit twinny templates**; the default is written back. Deleting the whole folder resets everything.

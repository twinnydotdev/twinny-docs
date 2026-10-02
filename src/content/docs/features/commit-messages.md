---
title: Commit messages
description: Generate a commit message from the staged diff with one click.
---

In the Source Control view, the sparkle icon in the title bar runs **Twinny - Generate commit message**. twinny reads the diff, asks the chat provider for a message, and writes it into the commit box for you to edit before committing.

## Which diff

Staged changes if there are any; otherwise everything unstaged, and the status bar says so. Untracked files are not in either until you stage them. Stage the files you mean to commit first and the message describes exactly those. The command runs `git` in the first workspace folder, which must be a repository; if VS Code's Git view has no repository open, the message is copied to the clipboard instead.

The diff is capped at 24,000 characters, cut at a file or hunk boundary, so small local models are not overwhelmed; the model is told how many characters were left out. For very large commits, stage and commit in pieces.

## The message style

The default prompt (`commit-message.hbs`) asks for:

- the imperative mood ("Add", "Fix", "Refactor"),
- a subject line under 72 characters,
- a short body only when it explains something the subject cannot,
- the message alone, with no fences, quotes or explanation.

The reply is cleaned of thinking sections, stray fences, quotes and "Here is the commit message:" preambles anyway, since small models do not always comply. Only the diff is sent, as one user message with no system message.

## Making it yours

Edit `~/.twinny/templates/commit-message.hbs` to change the style. Common changes:

- **Conventional Commits**: ask for `type(scope): subject` with the allowed types listed.
- **Ticket references**: the template is given only the diff, so the model never sees the branch name. To pick up a ticket id from the branch, write the message from the chat with `@git` attached, which includes the branch.
- **Language**: ask for messages in your team's language.

See [Prompt templates](/twinny-docs/features/templates/) for the mechanics.

## From the chat

You can also write commit messages in the chat with `@git` attached, which is handy when you want to discuss the change first. The Source Control button is faster for the everyday case.

---
title: Chat
description: Ask about your code in the sidebar, with files, symbols, problems, git changes and terminal output as context.
---

The chat lives in the twinny sidebar. Type a question and press `Enter` or **Send**. Answers stream in, and you can stop one at any time with `Esc`, `Ctrl+C`, `Ctrl+Shift+/` or the stop button. Answers come from your active **chat** provider, chosen with **Use this provider** in the Providers tab; the empty chat shows which model will answer.

Turn on [agent mode](/twinny-docs/features/agent-mode/) with the switch at the bottom left of the composer, or `Shift+Tab`, to let the model read, search and edit files and run commands before it answers.

Open the chat in a full editor tab with **Open twinny panel chat** (the full-screen icon at the top of the sidebar) when you want more room, or to keep the sidebar for the Providers or Embeddings tab.

## The composer

The chat's keys work as in a terminal. Press `?` on an empty composer for the list, or run **Twinny - Chat keyboard shortcuts** from the view's `…` menu; every key is also on [Keyboard shortcuts](/twinny-docs/reference/keyboard-shortcuts/#in-the-chat).

- `Shift+Enter` starts a new line.
- `↑` and `↓` from an empty composer step through what you have sent, across conversations. Typing into a recalled prompt makes it your draft.
- `Esc` twice clears the draft, and `↑` brings a cleared draft back. `Ctrl+C` stops a reply, or clears the draft when nothing is streaming; with text selected it still copies.
- `Ctrl+L` starts a new conversation. `PgUp` and `PgDn` scroll the transcript without leaving the composer, and typing with the focus on the transcript goes to the composer.

A message sent while a reply is still running is **queued**, not lost: it waits under the transcript and goes out when the reply ends, one message per reply. Hover a queued message to drop it. Stopping the reply puts queued messages back in the composer instead of sending them.

## Adding context

Type `@` in the message box to attach context: a file, a symbol, the current problems, the git diff, the terminal's last output, or a search of the workspace index. Right-click a file or a selection for **Add file to context** and **Add Selection to Context**. Selected code is attached automatically when you send. Paste an image for vision models.

Every source, what it sends and its limits are on [Context and mentions](/twinny-docs/features/context/).

## Answers

Code blocks in an answer have actions:

- **copy** copies the block.
- **new file** opens it in a new untitled document with the right language.
- **insert** puts it into the active editor at the cursor, replacing any selection, with no diff to review.
- **apply** puts it into the active editor as an [inline edit](/twinny-docs/features/inline-edit/#apply-code-from-chat) you accept or reject: over the selection if there is one, otherwise over the lines it rewrites, or at the cursor.
- **terminal** pastes a shell block into the twinny terminal, ready to run when you press `Enter`.

Under each reply are the model that wrote it, how long it took and, when the backend reports token counts, tokens per second. These are saved with the conversation and never sent to the model. A reply you stopped says so, and the last one has **Continue**, which asks the model to carry on without starting over.

Under a message you can **edit** it and re-send (later messages are dropped), **regenerate** the answer, or **delete** it. When `@workspace` was used, a **context** line under the answer shows which chunks were retrieved, their reranker scores, and a preview, with a link to open each one at its lines.

## Conversations

Conversations are saved between sessions in VS Code's global state. Open **Conversation history** (the clock icon) to search them, rename or delete one, or clear them all; they are grouped by day. **Start a new chat** (the plus icon) or `Ctrl+L` begins a fresh conversation; the title of a conversation is generated from its first exchange.

**Open conversation as Markdown**, from the sidebar's `…` menu or the panel's toolbar, opens the whole conversation in a new editor.

The whole conversation is sent with each message, so a very long one eventually exceeds the model's context. Start a new conversation when the topic changes.

## Editor commands

Right-click selected code for:

- **Explain**, which asks the chat to explain the selection. When a workspace index exists, related code is looked up to inform the explanation.
- **Refactor**, **Add types**, **Generate docs** and **Edit with instruction...**, which change the code in place through [inline edit](/twinny-docs/features/inline-edit/).
- **Write tests**, which writes tests to a sibling test file.

## Suggestions in an empty chat

An empty chat shows a row of suggestion buttons built from the templates you have enabled in **Manage twinny templates** (the book icon). Each runs that template over the current selection. Turn off the ones you never use.

## Tokens and stopping

`twinny.numPredictChat` (512) caps the length of one answer. If answers are cut short, raise it; the model's own context window still applies. `twinny.temperature` (0.2) applies to chat too.

## Customising the prompts

The system message and every command's prompt are Handlebars files in `~/.twinny/templates/`. Change the tone, the language of answers, or the rules the model follows; see [Prompt templates](/twinny-docs/features/templates/).

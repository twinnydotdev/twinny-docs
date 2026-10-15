---
title: What's new
description: The features added to twinny in each release, with links to their pages. The full changelog is in the repository.
---

The full list of changes, fixes included, is in [CHANGELOG.md](https://github.com/twinnydotdev/twinny/blob/main/CHANGELOG.md) in the repository and on the extension's Marketplace page. This page is the short version: what you can do now that you could not before.

## 4.3.13 · 15 October 2026

- **Gateway: Buy seats goes to [twinny.dev's pricing](https://twinny.dev/#pricing)** instead of a payment link built into `twinny-server`, so a change of price or checkout needs no new release. Team seats are $15 a seat a month, billed yearly; see [Licensing and seats](/twinny-docs/teams/licensing/).

## 4.3.12 · 15 October 2026

- **[ChatGPT Plan](/twinny-docs/providers/hosted-apis/#chatgpt-plan) provider.** Chat and completions on the models your ChatGPT account can use, without an API key: pick **ChatGPT Plan** in the presets and **Sign in**. A **Reasoning effort** setting trades answer quality for speed. Embeddings are not offered, and `twinny-server` refuses the provider kind, since it needs the editor's sign-in.
- **Log lines go through the secret shield too**, in the extension's output channel and `twinny-server`'s stderr, so a credential put back into a reply is not written to the log.

## 4.3.11 · 15 October 2026

- **Completions work with `llama-server` in [router mode](/twinny-docs/providers/llama-cpp/#router-mode).** They failed with `400 model name is missing from the request`; completion requests now name the provider's model, and the chat's context size is read from a router-mode server too.

## 4.3.10 · 15 October 2026

- **[`@` mentions](/twinny-docs/features/context/#the--menu) list matches as you type.** `@useSugg` lists files, symbols and `@workspace`, `@problems`, `@git` and `@terminal` together. A bare `@` still opens the category menu.
- **`@symbol` mentions attach the symbol.** Before, the symbol's code never reached the model. Clicking one in a sent message opens the file at its line.

## 4.3.8 and 4.3.9 · 14 October 2026

- **[Undo what an agent reply changed](/twinny-docs/features/agent-mode/#undoing-a-reply).** A reply that changed files ends with the list of them and their line counts. Click a file to compare it with what it was; **undo** puts one back, **undo all** every file. Files a command changed inside a git repository are covered too.
- **[Agent settings](/twinny-docs/features/agent-mode/#agent-settings) in the chat.** A gear beside the agent switch sets changes, commands, where they run and steps per reply (new setting `twinny.chatToolsMaxSteps`, 12 by default), and forgets what was set to always run.
- **[MCP servers](/twinny-docs/features/agent-mode/#mcp-servers) in agent mode.** Name them in `twinny.chatToolsMcpServers` and their tools join agent mode. Local servers over standard input and output only. Each call asks, with **Always run** for that tool.
- **The agent sees the errors it causes.** After an edit, the model is told of new errors the editor reports in that file, and the step says `· 1 new error`.
- **[`AGENTS.md`](/twinny-docs/features/agent-mode/#project-instructions) is followed**, or `CLAUDE.md` or `.github/copilot-instructions.md` without one, and a folder's own `AGENTS.md` when the agent works there. Changes to them are always shown for review.
- **[Team rules for agent mode](/twinny-docs/teams/policy/#agent-mode).** `policy.agent`, or **Policy → Agent mode** on the admin page: turn agent mode off, make commands ask or take them away, make every change wait for review, block paths, turn MCP servers off. Extensions too old to follow the rules are refused agent requests while a team sets any.
- **A finished command can be copied or put in your terminal**, where nothing runs until you press `Enter`.
- **The `git` tool can no longer read files outside the workspace, or files `.gitignore` hides.** A command that leaves something running in the background now finishes, and ends what it left running.
- 4.3.9 changes only the version number.

## 4.3.7 · 7 October 2026

- **[Plugin](/twinny-docs/teams/plugins/#open-pull-requests-in-one-place) tokens are saved once, for any number of repositories.** A GitHub, GitLab, Gitea or Bitbucket plugin page has a **Tokens** panel: save a token once, then each repository reads with one of the saved tokens, picked in its **reads with** column. One classic token for everything, a fine-grained token per organisation, or a token per repository all work, and saving a token can list the repositories it reads so you can tick several at once.
- **One replace for an expired token.** **Replace** checks the new value with the host, then every repository on that token syncs with it. When the host refuses a token, the token and each repository on it say so.
- Tokens stored per repository in `repos.json` are folded into saved tokens on first start, with repository ids kept. An older `twinny-server` cannot read them: back up the file before rolling back.

## 4.3.6 · 6 October 2026

- **Grey suggestions in the [chat composer](/twinny-docs/features/chat/#the-composer).** As in the editor, a suggestion shows in grey after the cursor: `Tab` accepts it, `Ctrl+→` accepts one word, `Esc` puts it away. It finishes the word you are typing, or guesses the next one, from your own earlier prompts; once the conversation has a reply, a pause after a word asks the chat model for the rest of the message given the last three exchanges. Nothing is asked of the model while a reply is coming. `twinny.chatSuggestions` turns it off.
- **Gateway: sign-in requests are counted per developer behind a proxy.** `POST /twinny/v1/signin` allows five waiting requests per client address; behind nginx or Caddy on the same machine every developer arrived from the proxy's loopback address and shared five. It now takes the forwarded address, as the audit log does: `X-Forwarded-For` is believed only from a loopback peer.

## 4.3.5 · 2 October 2026

- **Edit twinny templates runs.** It was in the command palette but never registered; it now opens the [templates](/twinny-docs/features/templates/) folder.
- **Chilean Spanish is used when chosen** (`twinny.locale` set to `es-CL`); before, the sidebar fell back to the general Spanish translations.
- **`twinny.numPredictChat` is gone.** Nothing had read it since 3.21; chat sets no length limit of its own, so the provider's default applies.
- `twinny.temperature`'s description says it covers completions only, the inline edit's Stop button shows `⌃⇧/` on macOS, and the gateway preset names `twinny-server`.

## 4.3.2 to 4.3.4 · 2 October 2026

- **[Agent mode](/twinny-docs/features/agent-mode/)'s steps show where they happened in the reply**: what the model said, the tool it used, what it said next. A command waiting for you is at the bottom, where you are already looking. Conversations saved earlier show their steps at the top, as before.
- **Commands run in the background, with their output in the chat.** A command the model runs goes through `bash` from the workspace root instead of opening the **twinny tools** terminal, and prints into its step. It is stopped after two minutes, and nothing can answer a prompt. `twinny.chatToolsCommandsRunIn` set to `terminal` brings the terminal back.
- **An auto-run switch** next to the agent switch lets every command run without asking. Until you first flip it, `twinny.chatToolsCommands` decides, so commands still ask by default.
- **Always run, one command at a time.** A waiting command has **Always run** between Run and Skip: that exact command may run again without asking. **Twinny - Forget commands set to always run** clears the list.
- **Approve from the keyboard.** With a command or change waiting and the composer empty, `Enter` runs or applies it, `Shift+Enter` always runs it, and `Esc` skips it. See [Keyboard shortcuts](/twinny-docs/reference/keyboard-shortcuts/#in-the-chat).
- **Stop one command, not the whole reply.** A running command has a stop button on its line; the model gets the output so far and carries on.
- **[Recordings](/twinny-docs/teams/recording/#reviewing) fold an agent conversation into one row** with a step count, instead of a row per tool step, and the preview shows the developer's question. Storage and the training export are unchanged.
- The composer footer fits model names and its switches in a narrow panel, and the provider and model dropdowns open again (4.3.4).

## 4.3.0 and 4.3.1 · 1 October 2026

- **[Agent mode](/twinny-docs/features/agent-mode/), one key away.** A switch at the bottom left of the composer, or `Shift+Tab`, lets the chat model read, search and edit files and run commands in the workspace. The choice is kept for every window; until you first switch it, `twinny.chatTools` decides. While it is on the prompt turns to a bright `❯❯`, and it pulses while the model works.
- **Messages sent while a reply runs are queued, not lost.** They wait under the transcript, marked *queued*, and go out when the reply ends. Hover one to drop it; stopping the reply puts them back in the composer.
- **[Chat keys](/twinny-docs/reference/keyboard-shortcuts/#in-the-chat), as in a terminal.** `Ctrl+C` stops a reply or clears the draft, `Esc` twice clears the draft and `↑` brings it back, `Ctrl+L` starts a new conversation, `PgUp` and `PgDn` scroll the transcript. `Esc` and `Ctrl+C` stop a reply from anywhere in the chat. Press `?` on an empty composer for the list, or run **Twinny - Chat keyboard shortcuts**.
- Agent mode with Anthropic, Bedrock, Gemini and Cohere no longer fails after a tool that takes no arguments, and code in tool steps wraps as text in a narrow chat.

## 4.2.10 · 30 September 2026

- **Works in WSL remotes.** Opening a folder through WSL failed activation with `Cannot read properties of undefined (reading 'header')`, so chat never loaded and completions did nothing. The [workspace index](/twinny-docs/features/workspace-index/)'s LanceDB module now loads when the index is first opened rather than at startup, so a native module that fails to load turns embeddings off instead of stopping the extension.
- **No flicker while indexing.** The line naming the files being embedded keeps its place for the whole run instead of coming and going between files.

## 4.2.9 · 29 September 2026

- `twinny-server --version` and the gateway's `/twinny/v1` responses report the right version. The 4.2.8 package called itself 4.2.7.

## 4.2.8 · 28 September 2026

- **Share [plugins](/twinny-docs/teams/plugins/) with developers.** An admin shares a plugin with every developer or with the people they tick, from the plugin's card under **Plugins → Store**. A developer signs in to the gateway's page with their own key and sees only the plugins shared with them, without their settings. On GitHub, GitLab, Gitea and Bitbucket they read pulls and issues, review, ask about a review, post it as a comment, triage and apply the suggested labels; approving or requesting changes through the token stays with admins, as do repositories, tokens and the review model. The notifiers, SSO sign-in, shared context and backups are for admins only. Every change to who has what is in the [audit log](/twinny-docs/teams/operations/).
- **Your team's plugins, one click from VS Code, signed in.** When an admin shares a plugin with you, VS Code says so once with an **Open** button, and the Providers tab lists it under **Your team's plugins**; admins get **Your gateway's page**. The page opens with a one-time code that it trades for your key within a minute, so nobody sees, copies or pastes a key. *Twinny - Open your team's plugins* in the command palette does the same; against an older gateway it falls back to putting the key on the clipboard. See [Connect to your team](/twinny-docs/teams/connect/).
- **The page knows who you are on GitHub.** Opened from VS Code, it fills in your GitHub username from the account VS Code is signed in with, once, so pull requests waiting for your approval appear under **waiting for me**. It never replaces a name you set and is skipped on GitHub Enterprise.
- **Approve from the pull page.** An admin approves a [pull request](/twinny-docs/teams/plugins/#open-pull-requests-in-one-place) with one button next to its checks, as the repository's token, with no review text posted. GitHub, Gitea and GitLab pin the approval to the commit the page showed.
- **Qwen3-Coder completions through a gateway.** A chat-only [FIM](/twinny-docs/features/code-completion/#fim-templates) model's prompt now reaches `twinny-server` as the chat it was rendered from, instead of being refused.

## 4.2.7 · 24 September 2026

- **The completion model is loaded before you type.** When VS Code starts or regains focus, twinny asks a local model server (Ollama, LM Studio, llama.cpp, or an OpenAI-compatible server on this machine) to load the [completion](/twinny-docs/features/code-completion/) model, so the first suggestion of the day no longer waits for it: with CodeLlama 7B on Ollama, 11 to 17 seconds became 0.06. Nothing is sent when the model was used in the last four minutes, and hosted APIs are never called. `twinny.warmUpModel` turns it off.
- **The gateway shields secrets for every client.** `twinny-server` swaps credentials in prompts for placeholders before a request reaches a backend and puts them back in the reply, for the extension, the TUI and Neovim alike. It is a [gateway policy](/twinny-docs/teams/policy/#rules-the-gateway-applies), `policy.secretShield` or the admin page's **Policy** tab: `offMachine` (the default) covers hosted APIs, backends on other hosts and the team pool; `always` adds backends on the gateway's own host; `off` forwards prompts as they arrive.

## 4.2.6 · 24 September 2026

- **Secret shield.** API keys, tokens, private keys and passwords in a prompt are replaced with placeholders such as `REDACTED_GITHUB_TOKEN_1` before the request leaves your machine, and put back wherever the reply uses them, so the model never sees the value and the code it writes still works. Chat, completions, inline edit and embeddings are all covered. It knows the GitHub, GitLab, AWS, Stripe, Slack, OpenAI, Anthropic, Google, Hugging Face and npm token formats, PEM private keys, JWTs, passwords in URLs, and secret-named values in code and `.env` files; `process.env.X` and `<your-key>` are left alone. A chat reply shows **N secrets withheld** and which kinds. `twinny.secretShield` picks when it runs: `offMachine` (the default) for anything not on this computer, `always` for local servers too, or `off`. See [Privacy](/twinny-docs/features/status-and-logs/#privacy).

## 4.2.5 · 23 September 2026

All on the gateway's [pull-request reviews](/twinny-docs/teams/plugins/).

- **Reviews no longer end mid-sentence.** Reasoning models are asked not to think the standard OpenAI way (`reasoning_effort: "none"`), which Ollama's OpenAI-compatible route honours where `think: false` was ignored.
- **A cut-off answer says so.** A review the output cap cut is kept and tagged **cut short**, with the reason and how much of the budget went on thinking.
- **Ask about a review.** A box under a finished review takes questions; the exchange stays on the review as a thread and nothing in it is posted to the host.

## 4.2.4 · 23 September 2026

All in [chat](/twinny-docs/features/chat/).

- **Replies say who wrote them**: the model, how long it took and, when the backend reports it, tokens per second, under each reply and saved with the conversation.
- **Continue a stopped reply**, and **Esc stops a reply** while the composer has focus.
- **Earlier prompts with ↑ and ↓** from an empty composer, across conversations, as in a shell.
- **Insert at cursor** next to *apply* on code blocks: straight into the editor, no diff to review.
- **Open conversation as Markdown** from the sidebar's `…` menu or the panel toolbar.
- Long questions fold behind *Show more*, empty code blocks are not shown, and the sidebar keeps a half-written prompt, a streaming reply and its scroll position when you switch views and back.

## 4.2.2 and 4.2.3 · 23 September 2026

- **Qwen3-Coder completes code.** Models whose name contains `qwen3-coder` get a new [FIM template](/twinny-docs/features/code-completion/#fim-templates) that sends the fill-in-the-middle prompt as a chat turn, which is how that model was trained.
- A suggestion made in an empty file no longer follows whatever you type next.
- **[Prompt templates](/twinny-docs/features/templates/) are sturdier.** A template that is missing, blank or will not parse falls back to the built-in copy and says so in the output channel; prompts are no longer HTML-escaped; the `eq` helper is available to every template.

## 4.2.1 · 22 September 2026

- The Providers tab has a card for whoever has the models: the quick-start command and a link to the [gateway page](https://twinny.dev/#teams). The same link is the command *Twinny - Set up for your team*.
- One information message, once, two weeks after first use on a machine not connected to a team, saying the gateway exists.
- A **[30-day Team trial](/twinny-docs/teams/licensing/#trying-it-first)** with every feature, issued by email from twinny.dev, no card.

## 4.2 · 21 September 2026

All on the gateway side, for teams.

- **[Plugins](/twinny-docs/teams/plugins/)** on the admin page, switched on from a store, as a licence feature. GitHub, GitLab, Gitea and Bitbucket list every open pull request across the repositories you watch, with checks, approvals and where you stand; **review now** sends one to a chat model your gateway already serves, auto-review does it while the models are idle, and the review can be posted back to the host. Open issues are triaged the same way: labels, a duplicate, a priority, a first reply.
- **[Slack, Discord and Microsoft Teams](/twinny-docs/teams/plugins/#slack-discord-and-teams)** hear about finished reviews, new pulls, failing checks, backups and backends going down.
- **[SSO sign-in](/twinny-docs/teams/plugins/#sso-sign-in)** with any OpenID Connect provider: developers sign in and VS Code opens connected, no invites to send.
- **[Shared context](/twinny-docs/teams/plugins/#shared-context)**: one index of the team's repositories on the gateway, searched from every developer's chat.
- **[Backups](/twinny-docs/teams/plugins/#backups)** nightly to a directory or an S3-compatible bucket, optionally encrypted, restored from the command line.
- **[Audit log, read-only admins and metrics](/twinny-docs/teams/operations/)**: a hash-chained log of every admin change, admin keys that can only look, and Prometheus at `/metrics`.
- **[Costs](/twinny-docs/teams/operations/#costs)** on the Usage page when an alias has a price.
- **[Routing rules and a team system prompt](/twinny-docs/teams/policy/)** in team policy: keep a workspace on local backends or on named aliases, and put a prompt before every chat.
- **[A queue](/twinny-docs/teams/operations/#when-every-slot-is-busy)** instead of an error when every slot on the gateway is busy.
- A **Helm chart** for Kubernetes. See [Run a gateway](/twinny-docs/teams/gateway/#kubernetes).

## 4.1 · 18 September 2026

- **[Teams](/twinny-docs/teams/overview/)**: `twinny-server`, a gateway on the machine with the models that serves chat, autocomplete and embeddings to the whole team, with a key per developer, usage per person, an admin page, and [invite links](/twinny-docs/teams/gateway/#4-add-developers) that open VS Code.
- **[Team GPU pooling](/twinny-docs/teams/overview/)**: a developer flips *Share this computer* and their local server serves the team through the gateway.
- **[Licensing and seats](/twinny-docs/teams/licensing/)**: five seats free for good; a token bought by card raises the count and switches on [policy](/twinny-docs/teams/policy/) and [recording](/twinny-docs/teams/recording/).
- Mistral fixes for chat and autocomplete, and the right autocomplete prompt format behind a gateway alias.

## 4.0 · 7 to 17 September 2026

The 4.x rewrite of the extension.

- **[Code completion](/twinny-docs/features/code-completion/)** rebuilt around a completion stream with a termination policy, type-through continuation, context from imports, the language server and recent edits.
- **[Inline edit](/twinny-docs/features/inline-edit/)**: Ctrl+I, describe a change, accept or reject it per hunk in the editor.
- **[Context and mentions](/twinny-docs/features/context/)**: `@git`, `@terminal` and `@symbol` join files, problems and the workspace.
- **[Workspace index](/twinny-docs/features/workspace-index/)**: incremental, hybrid keyword and vector search, reranked, with sources shown under replies.
- **[Terminal](/twinny-docs/features/terminal/)**: write a command from a description, or fix the last error.
- **[Devices](/twinny-docs/providers/devices/)**: another of your computers as a backend over an encrypted peer-to-peer link, replacing Symmetry.
- **[Providers](/twinny-docs/providers/overview/)** discovered on first run, tested from the card, imported and exported.

---
title: Code completion
description: Fill-in-the-middle code completion as you type, how the prompt is built, and how to tune it.
---

twinny suggests code as you type, shown as ghost text at the cursor. Press `Tab` to accept a suggestion or keep typing to dismiss it. Suggestions come from your active **autocomplete** provider, which must use a model trained for fill-in-the-middle (FIM). See [Supported models](/twinny-docs/providers/supported-models/#code-completion-fill-in-the-middle).

## Automatic and manual

Suggestions are automatic by default, after a short pause in typing (`twinny.debounceWait`, 300 ms). To turn automatic suggestions off, click the `</>` icon in the status bar and choose the auto-suggest toggle, or set `twinny.autoSuggestEnabled` to `false`. The status bar then reads `</> off`, and you can still request a suggestion with `Alt+\`.

`Alt+\` is also GitHub Copilot's default, so if both extensions are installed rebind one of them in *Keyboard Shortcuts*. twinny's binding is on VS Code's built-in **Trigger Inline Suggestion** command.

Use `twinny.enabledLanguages` to turn completions off for particular languages, e.g. `{ "*": true, "markdown": false, "plaintext": false }`. Output panes, search results and terminals never get suggestions.

## How a suggestion is made

1. **Trigger.** You pause, or press `Alt+\`. An older request still in flight is cancelled.
2. **Prefix and suffix.** twinny takes `twinny.contextLength` lines before and after the cursor (capped at 12,000 and 3,000 characters), so the model sees the shape of the surrounding code.
3. **Context.** Up to 6,000 characters of extra context are gathered, from the sources below.
4. **Prompt.** The FIM template for the model wraps prefix, suffix and context in the model's own tokens.
5. **Stream.** The reply streams in and is shown as it arrives. twinny stops the stream early when the suggestion reaches a sensible end (see below) and gives up after 30 seconds.
6. **Format.** The result is trimmed of text the suffix already contains, indentation is matched, and stray template tokens are removed.

Every step is logged in the **Twinny** output channel; at *Debug* level you can read the exact prompt and reply.

## What the model sees

| Context | Setting | What it adds |
| --- | --- | --- |
| Surrounding lines | `twinny.contextLength` (100) | Lines before and after the cursor from the current file |
| Recent edits | `twinny.recentEditsEnabled` (on) | Your last few changes in any open file, as short diffs (up to 6 changes, 2,500 characters). A half-done rename or a pattern being applied across a file carries into suggestions |
| IntelliSense | `twinny.lspContextEnabled` (on) | Matching symbols and the signature of the call the cursor is inside, from the language server (up to 20 items, 2,000 characters, 150 ms wait). The model then knows what names and parameters exist |
| Neighbouring files | `twinny.fileContextEnabled` (off) | Snippets from related open files, up to 3 files. Helps on big projects, costs latency |

Models with repository-level FIM tokens (Qwen2.5-Coder, StarCoder2, CodeGemma, Granite, CodeGeeX) receive the extra files as separate named blocks; other models receive them as commented-out blocks above the prefix.

## Length and stopping

Small models do not know when to stop, so twinny decides for them:

- `twinny.multilineCompletionsEnabled` (on) allows suggestions spanning several lines; `twinny.maxLines` (40) caps them. With it off, suggestions end at the first line break.
- `twinny.numPredictFim` (512) is the token budget per request. `-1` removes the cap.
- While the reply streams, twinny parses it with tree-sitter and cuts at the end of the enclosing block or statement, so a function suggestion ends at its closing brace rather than running into the next one.
- Text the suffix already contains is trimmed, so completing inside `foo(|)` does not produce a second `)`.
- Stop tokens for the model family (`<EOT>`, `<|endoftext|>`, `<|file_sep|>` and so on) end the reply.
- `twinny.enableSubsequentCompletions` (on) requests another suggestion straight after one is accepted, for a chain of accepts.
- `twinny.temperature` (0.2) applies to both chat and completion. Lower it if suggestions ramble; 0 is fully deterministic on most servers.

## FIM templates

Each model family marks the prefix, suffix and middle with different tokens. The autocomplete provider has a **FIM template** field:

| Template | Models | Tokens |
| --- | --- | --- |
| `codellama` | CodeLlama, and the fallback for unknown names | `<PRE> … <SUF> … <MID>` |
| `deepseek` | DeepSeek Coder | `<｜fim▁begin｜> … <｜fim▁hole｜> … <｜fim▁end｜>` |
| `codeqwen` | Qwen2.5-Coder, CodeQwen | `<|fim_prefix|> … <|fim_suffix|> … <|fim_middle|>`, with `<|repo_name|>` and `<|file_sep|>` for context |
| `codestral` | Codestral | `[SUFFIX] … [PREFIX] …` |
| `starcoder` | StarCoder, StarCoder2, Granite Code, CodeGeeX | `<fim_prefix> … <fim_suffix> … <fim_middle>`, with `<repo_name>` and `<file_sep>` |
| `codegemma` | CodeGemma | `<|fim_prefix|> … <|fim_suffix|> … <|fim_middle|>`, with `<|file_separator|>` |
| `stable-code` | Stable Code | Same tokens as `starcoder` |
| `llama` | Plain Llama base models | Same tokens as `codellama` |
| `custom-template` | Anything else | Rendered from `~/.twinny/templates/fim.hbs` |

- **Automatic** (default) chooses from the model name, matching in this order: `codellama`, `deepseek`, `codestral`, `qwen`, `codegemma`, `stable-code`, `starcoder`, `granite`, `codegeex`, `llama`. Anything else falls back to `codellama`.
- Pick a template by hand if the model is named unusually or suggestions come back with visible tokens.
- With no text after the cursor there is no middle to fill, and base models continue plain text more reliably than they handle an empty suffix; twinny then sends the prefix alone.

See [Prompt templates](/twinny-docs/features/templates/#the-fim-template) for writing a custom one.

## Caching

`twinny.completionCacheEnabled` (off) remembers suggestions for identical prompts. It speeds up repeated requests at the cost of memory.

## Getting good suggestions

- **Use a base model, small and on the GPU.** `qwen2.5-coder:1.5b-base` answers in well under a second on most hardware and is good at the next few lines; that beats a bigger model that arrives after you have moved on.
- **Write the comment first.** A one-line comment describing what comes next, then a pause on the following line, gives multi-line suggestions something to aim at.
- **Name things well.** Names in the prefix are the model's strongest hint. IntelliSense context adds the names it cannot see.
- **Let recent edits work for you.** Change one call site by hand and the next suggestions follow the same pattern.
- **Turn off what you do not need.** If you only want one-liners, disable multi-line. If suggestions feel late, lower `twinny.contextLength` or turn off file context.

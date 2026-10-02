---
title: Inline edit
description: Describe a change and review it as a diff in the editor before accepting.
---

Inline edit rewrites code in place. You describe the change, twinny streams the result into the editor as a diff, and nothing is kept until you accept it. It uses your active **chat** provider.

## Editing a selection

1. Select the code to change. The selection is widened to whole lines; with nothing selected, twinny edits the line the cursor is on.
2. Press `Ctrl+I` (`Cmd+I` on macOS), or right-click and choose **Twinny - Edit with instruction...**.
3. Describe the change and press `Enter`.

The proposed change appears as removed lines (red) and added lines (green) where the selection was. While it streams, a **Stop** CodeLens above the region cancels and restores the original text.

When the model finishes you get **Accept** and **Reject** as CodeLens buttons above the change, and as keys:

| Action | Windows / Linux | macOS |
| --- | --- | --- |
| Accept the edit | `Ctrl+Shift+Enter` | `Cmd+Shift+Enter` |
| Reject the edit | `Ctrl+Shift+Backspace` | `Cmd+Shift+Backspace` |
| Stop while streaming | `Ctrl+Shift+/` | `Ctrl+Shift+/` |

A change that touches several separate places is split into **hunks**, and each hunk can be accepted or rejected on its own from its CodeLens. The top CodeLens then reads **Accept all** and **Reject all**, and the keys act on every hunk. Pressing `Ctrl+I` again while an edit is pending lets you **refine** it ("shorter", "keep the original names", "add a comment") instead of starting over.

You can keep editing elsewhere in the file while a change is pending: twinny tracks where the diff has moved to. An edit of your own that cuts through the pending lines drops the diff and leaves the text as it is; Undo (`Ctrl+Z`) reverts it. The old and new lines are both in the document while the change is pending, so saving the file then writes both; accept or reject first.

## What the model is asked

The prompt contains the selected code, up to 40 lines above and below it for context (at most 6,000 characters each side), the file name, the language, and your instruction, with strict directions to return only the rewritten code. Small models do not always comply, so the reply is parsed defensively: fenced blocks are unwrapped, "thinking" sections are removed, and indentation is matched to the original. If the model returns nothing usable you see *no changes suggested*.

The model sees only the selection and its surroundings, not the whole file, which keeps edits fast and focused. For a change that needs knowledge from elsewhere, mention it in the instruction ("use the `formatDate` helper from utils") or do it from chat with the relevant file attached and use **apply**.

## Preset edits

The right-click menu has ready-made instructions that run through inline edit on the selection. They need a selection:

- **Refactor** improves readability and efficiency without changing behaviour.
- **Add types** adds precise type annotations.
- **Generate docs** adds documentation comments in the language's standard format (JSDoc, docstrings, and so on).

**Explain** is different: it sends the selection to the chat and answers there.

## Fix with the lightbulb

On a line with an error or warning, the code-action lightbulb (`Ctrl+.`) offers **Fix with Twinny**. It runs an inline edit with the diagnostic's message as the instruction, so there is nothing to type. Only errors and warnings get the action, not hints, and the region is capped at 60 lines around the problem. Any selection also gets **Edit with Twinny** in the same menu.

## Write tests

**Twinny - Write tests** (right-click menu or command palette) writes tests for the selected code, or the whole file when nothing is selected, into a sibling test file named the way the language's runner expects:

| Language | Test file |
| --- | --- |
| JavaScript, TypeScript and most others | `foo.test.ts` |
| Python | `test_foo.py` |
| Go, Rust | `foo_test.go`, `foo_test.rs` |
| Ruby | `foo_spec.rb` |
| Java, Kotlin, Scala, C#, PHP | `FooTest.java` |

For JavaScript and TypeScript, twinny reads the framework from the nearest `package.json` (Vitest, Jest, Mocha, AVA or Jasmine) and tells the model to use it; with none declared the model picks. Other languages get the usual one: pytest, Go's `testing` package, Rust's `#[test]`, RSpec, JUnit 5, xUnit or PHPUnit. If the test file already exists, new tests are appended rather than replacing it; a new one opens unsaved beside the source, so nothing is written to disk until you save it. The result opens as a pending edit you accept or reject the same way. Running the command from a file that is itself a test file does nothing but say so.

## Apply code from chat

Every code block in the chat has an **apply** button. It puts the block into the **active editor** as an inline edit, so you review the change as a diff rather than pasting over your code:

- with a selection, the block replaces the selection;
- with no selection, twinny looks for the stretch of the file the block rewrites and shows the diff over it;
- if nothing matches, the block is inserted at the cursor.

Open the file you want to change before pressing apply. If the file already contains exactly that code, nothing happens and the status bar says so.

## Tips

- Short, imperative instructions work best with small models: "extract the loop into a function", "handle the null case", "convert to async/await".
- Select whole statements. The selection is widened to whole lines, so a selection that ends mid-statement sends half a statement.
- For repetitive changes across a file, do the first by hand and let [code completion](/twinny-docs/features/code-completion/) pick up the pattern from recent edits.

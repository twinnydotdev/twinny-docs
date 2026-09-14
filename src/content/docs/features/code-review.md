---
title: Code review
description: Review the working tree, a branch, or a GitHub pull request with your chat model.
---

The review tab reviews a diff without pasting it into the chat. The chat shows a summary of what is under review, and the model gets the diff in parts sized for its context window. Open it from the pull-request icon at the top of the sidebar, or run **Code reviewer**.

## Local changes

For the open git repository the tab shows the current branch and two buttons:

- **Review working tree**: staged and unstaged changes, with the count of changed files.
- **Review branch**: everything on this branch against a base. twinny suggests the remote's default branch, or a common name such as `main` or `master`, and you can type another.

Press one and the review streams into the chat as a normal conversation, so you can ask follow-up questions ("show me how you would fix the second issue") with the review as context.

## GitHub pull requests

The tab detects the GitHub repository from the `origin` remote and lists its open pull requests, most recently updated first, with draft status. Edit the owner and repository to review another project. Choose a pull request to review its diff the same way.

Public repositories work without a token. Private repositories, and heavy use of the GitHub API, need a personal access token in `twinny.githubToken` with `repo` read access. Only the pull request list and diff are fetched; twinny never writes to GitHub.

## What the model is asked

The review prompt (`review.hbs`) asks for a specific structure:

- **Summary**: two or three sentences on what the change does and how sound it looks.
- **Issues**: the most important problems first, at most eight, each with a severity marker (🔴 bug, 🟠 risk, 🟡 nit), the file and approximate line, what is wrong, and a concrete fix.
- **Suggestions**: optional improvements.
- **Verdict**: ready to merge, merge after fixes, or needs rework.

It is told to quote the relevant code, not to restate the diff, and not to ask for comments or documentation. You can change any of this in the template; see [Prompt templates](/twinny-docs/features/templates/).

## Long diffs

`twinny.reviewMaxDiffChars` (16,000) is the size of one part. A diff larger than that is split at file boundaries into parts, each reviewed in turn with its own heading in the chat, and then a closing summary is written from the parts (`review-summary.hbs`): the most important issues across all parts, most severe first, and one line on merge readiness.

Lower the setting for models with small context windows; raise it for large-context models to get fewer parts and a more coherent review. Lockfiles, binaries, minified files and build output are skipped so they do not use up the budget.

## Getting a good review

- Use the largest chat model you can for review. A 7B model finds obvious bugs; a 14B or 32B model, or a hosted one, is materially better at reasoning about a change.
- Review small changes often rather than one big change rarely. A review of 200 lines is more useful than a review of 2,000.
- Ask follow-ups. The diff summary stays in the conversation, so "is the null check on line 40 really needed?" works.
- Reviews are advisory. The model has not run the code and does not know your conventions unless the template tells it.

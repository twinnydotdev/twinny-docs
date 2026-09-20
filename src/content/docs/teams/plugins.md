---
title: Plugins
description: GitHub and GitLab pull requests on the admin page, reviewed by the models your gateway already serves. A licence feature.
---

Plugins are features the gateway ships with but that are not the gateway: switched off until an admin turns them on, each with its own files, its own routes and its own page. **Plugins → Store** on the admin page lists what your build carries. They are a licence feature. See [Licensing and seats](/twinny-docs/teams/licensing/).

Two come bundled today: **GitHub** and **GitLab**. Both do the same thing for their host.

## Open pull requests, in one place

Watch the repositories your team works in and the admin page shows every open pull request (merge request on GitLab) across them: checks passing or failing, mergeable or in conflict, approved or waiting for review, drafts marked. Filter by state, by repository or by text; open one to read its description and its diffs, highlighted like an editor shows them. The list syncs every five minutes and on **sync now**.

To watch a repository, give it as `owner/name` and a token that can read it:

- **GitHub**: a fine-grained token with read access to *Pull requests*, *Contents*, *Checks* and *Commit statuses*, or a classic token with the `repo` scope. Or set up a **GitHub App** once and every repository it is installed on can be watched with no token of its own; *pick from the App* lists them. The server signs its own requests with the App's private key, which never leaves it.
- **GitLab**: a project, group or personal access token with the `read_api` scope.

GitHub Enterprise Server and self-managed GitLab work by setting the host URL on the plugin's page. Tokens are checked against the host before they are kept, live in a file only the server's user can read, and are never shown again.

## Reviews by your own models

A pull's page has **review now**. The gateway sends the description and diffs to one of its chat aliases and keeps the answer on the server: a summary, issues found, suggestions, and a verdict. The review shows with the model, the time and who asked; a pull that has moved on marks it as being for an earlier commit. Nothing is posted to GitHub or GitLab.

Tick **auto-review** on a repository and its new and updated pulls are reviewed in the background: one at a time, newest first, never drafts, and only while no developer request is running, so completions and chats are never slowed down. Reviews are routed like any other request and appear in usage under `plugin:github` or `plugin:gitlab`, so the Usage page shows what they cost.

The prompt is kept small for local models: at most 24k characters of description and diff, with larger patches named but left out, and at most 1,500 tokens back. Pick the review model on the plugin's page; the first chat alias is used until you do.

## Without a licence

The store still lists the plugins, but none can be switched on. Plugins that were on stop when a licence lapses and start again, without anyone pressing the switch, when one is installed. The 14-day grace after expiry applies as it does to policy and recording.

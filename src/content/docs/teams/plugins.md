---
title: Plugins
description: Pull requests and issues from GitHub, GitLab, Gitea and Bitbucket reviewed by your own models and shared with the developers you choose, Slack, Discord and Teams notifications, SSO sign-in, shared context and backups. A licence feature.
---

Plugins are features the gateway ships with but that are not the gateway: switched off until an admin turns them on, each with its own files, its own routes and its own page. **Plugins → Store** on the admin page lists what your build carries. The pull-request plugins can be [shared with developers](#share-with-developers), who then use them with their own key. They are a licence feature. See [Licensing and seats](/twinny-docs/teams/licensing/).

Ten come bundled today: **GitHub**, **GitLab**, **Gitea / Forgejo** and **Bitbucket** for pull requests; **Slack**, **Discord** and **Microsoft Teams** for notifications; **SSO sign-in** with your identity provider; **Shared context**, one index of your repositories for every developer's chat; and **Backups**. The forges all do the same thing for their host.

## Open pull requests, in one place

Watch the repositories your team works in and the admin page shows every open pull request (merge request on GitLab) across them: checks passing or failing, mergeable or in conflict, approved or waiting for review. Every pull carries its approvals as the host reports them: who approved, who asked for changes, who is still asked, and how many the base branch requires. The page learns who you are from the token (or a name set under the host's settings; a developer the plugin is shared with sets their own) and marks your part in each pull, so a **waiting for me** view lists the pulls by others that still need your approval. Drafts stay out of the list until a toggle at the end of the filter row brings them in.

The toolbar is the same on every forge: one-click views with live counts, selects for repository, author, label, target branch and activity, a search, an order-by select and sortable column headers, all remembered per host in your browser. Each row links to the pull on the host; open one here to read its description and its diffs, highlighted like an editor shows them. The list syncs every five minutes and on **sync now**.

To watch a repository, give it as `owner/name` and a token that can read it:

- **GitHub**: a fine-grained token with read access to *Pull requests*, *Contents*, *Checks* and *Commit statuses*, or a classic token with the `repo` scope. Or set up a **GitHub App** once and every repository it is installed on can be watched with no token of its own; *pick from the App* lists them. The server signs its own requests with the App's private key, which never leaves it.
- **GitLab**: a project, group or personal access token with the `read_api` scope.
- **Gitea / Forgejo** (and Codeberg): set your instance's URL, then an access token with read access to repositories.
- **Bitbucket** (Cloud): `workspace/repo-slug` with an app password as `user:app-password`, or an API token.

GitHub Enterprise Server and self-managed GitLab work by setting the host URL on the plugin's page. Tokens are checked against the host before they are kept, live in a file only the server's user can read, and are never shown again.

## Reviews by your own models

A pull's page has **review now**. The gateway sends the description and diffs to one of its chat aliases and keeps the answer on the server: a summary, issues found, suggestions, and a verdict. The review shows with the model, the time and who asked; a pull that has moved on marks it as being for an earlier commit.

Open issues are listed too, and **triage** has a model suggest labels, a duplicate, a priority and a first reply, which you post or apply with a click (or let auto-triage suggest in the background). A finished review can be posted back to the host as a comment, a change request or an approval, with a footer naming the model; **auto-post** does that for every review without a click. Tick **auto-review** on a repository and its new and updated pulls are reviewed in the background: one at a time, newest first, never drafts, and only while no developer request is running, so completions and chats are never slowed down. Reviews are routed like any other request and appear in usage under `plugin:github` or `plugin:gitlab`, so the Usage page shows what they cost.

The prompt is kept small for local models: at most 24k characters of description and diff, with larger patches named but left out, and at most 4,000 tokens back. A reasoning model is asked not to think. A review the output cap cut off is kept but tagged **cut short**, with the reason and how much went on thinking. Pick the review model on the plugin's page; the first chat alias is used until you do.

Under a finished review is a box for questions. Each goes to the review model with the pull, the review and the earlier questions, and the exchange is kept on the review until the pull is reviewed again. Nothing in it is posted to the host.

An admin can also **approve** a pull with one button next to its checks, as the repository's token, with no review text posted. GitHub, Gitea and GitLab pin the approval to the commit the page showed. The button is not shown on your own pull, on one you already approved, or to developers the plugin is shared with.

## Share with developers

Admins use every plugin that is on. To let developers use the pull-request plugins too, choose **share** on the plugin's card under **Plugins → Store**: **every developer** (anyone with a key of their own) or **these people**, ticked by key name. **Admins only** is the default.

There is nothing to send anyone. The developer's VS Code tells them once that the plugin was shared, with an **Open** button, and lists it on the Providers tab; opening it signs them in to the gateway's page with a one-time code, so nobody sees, copies or pastes a key (see [Connect to your team](/twinny-docs/teams/connect/#plugins-shared-with-you)). Someone not using VS Code signs in at `https://<gateway>/admin` with their own key, made under **People**. They see the shared plugins and nothing else of the admin page, and on each one they can do what a reviewer does:

- read the open pulls and issues, and sync;
- **review now**, ask about a review, and post it to the host as a comment;
- **triage** an issue and post the reply and the suggested labels;
- set their own username on the host, so **waiting for me** means them.

Watching or removing repositories, tokens, auto-review and auto-post, the GitHub App, the host URL and the review model stay with admins. Slack, Discord, Teams, SSO sign-in, shared context and backups are for admins only and cannot be shared.

A few things to know before you share:

- **A posted review speaks as the token.** It goes to the host with the repository's token or the GitHub App, under that account, with a footer naming the model. So developers post reviews as comments only, once each, never as an approval or a change request, and apply only the labels the model suggested. The page records who asked and who posted, and the [audit log](/twinny-docs/teams/operations/#audit-log) records every write under the developer's name.
- **Grants follow the name.** A replaced key, an invite or an SSO sign-in under the same name keeps access; a revoked key loses it at once.
- **The shared token is nobody.** It never opens a plugin, even one shared with every developer, and neither does a demo's guest key.
- A plugin that is switched off, or a plan without plugins, is closed to developers as it is to admins.

## SSO sign-in

Developers sign in with your identity provider (Okta, Entra ID, Google Workspace, Keycloak, any OpenID Connect provider) at `https://<gateway>/twinny/v1/plugins/oidc/start` and VS Code opens connected with a key of their own; no invites, no codes read out. Restrict sign-in to your email domains, name the emails that become admins, and see recent sign-ins on the plugin's page. Signing in again refreshes the person's key and revokes the old one, so it doubles as lost-key recovery. Every sign-in lands in the audit log.

## Shared context

One index of your repositories, built on the gateway with an embeddings model it serves. Add repositories by clone URL; they are cloned shallow, chunked and embedded, and re-indexed on a schedule while the models are idle, embedding only what changed. Connected developers' chats merge hits from it into the relevant code they already gather from their own workspace, so a question about a service nobody has cloned still finds the right file.

## Backups

A nightly copy of what the gateway would miss (the configuration, keys, licence, invites, plugins and their files, usage; recordings if asked) to a directory on the server or to any S3-compatible bucket, with the last N kept. Set a passphrase and every archive is encrypted before it leaves the machine. **Test destination** checks the bucket or directory is writable; **back up now** makes one at once.

Restoring is done from the shell with the gateway stopped: `twinny-server backup restore <archive> --config <file>` prints what would be written where, and `--yes` does it. Archives are ordinary gzipped tar files (with a manifest whose hashes are checked) when not encrypted, so they open with `tar` too.

## Slack, Discord and Teams

Post what the other plugins report to the channels you choose: a review finished, asked for changes, failed or was posted; an issue triaged; a pull opened, approved from the page, or its checks failed; a backup was made or failed; a backend went down or came back; an SSO sign-in. Slack through incoming webhooks (Mattermost and Rocket.Chat take the same messages), Discord through channel webhooks as embeds, Microsoft Teams through a Workflows webhook as Adaptive Cards. One webhook per channel, each picking its events, with a **test** button and a log of recent deliveries. Webhook URLs are kept on the server and never shown again.

## Without a licence

The store still lists the plugins, but none can be switched on. Plugins that were on stop when a licence lapses and start again, without anyone pressing the switch, when one is installed. The 14-day grace after expiry applies as it does to policy and recording.

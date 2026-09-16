---
title: Recording
description: Keep the content of chat, autocomplete and embedding requests on your gateway, review it on the admin page, and export it as training data.
---

By default the gateway keeps metadata about requests and never their content. **Recording** changes that for the features you choose: the conversation and reply for chat, the code before and after the cursor and the completion for autocomplete, the inputs for embeddings. It is a licence feature. See [Licensing and seats](/twinny-docs/teams/licensing/).

Two reasons to want it: seeing what your team actually asks and gets, and building a dataset from your own code and your own developers to train or fine-tune a model later.

## What is kept

| Feature | Request | Reply |
| --- | --- | --- |
| Chat | every message in the conversation, and the options | the full assistant reply |
| Autocomplete | the text before the cursor, the text after it, and the options | the completion |
| Embeddings | the inputs | how many vectors of what size; never the vectors |

Every record also carries who (the key), which model and backend, when, how long, the outcome, and the token counts the backend reported.

## Switching it on

On the admin page, **Recordings → What to keep**: tick the features, set how many days to keep records, save. Or in the configuration:

```json
"recording": { "chat": true, "fim": true, "embeddings": false, "retentionDays": 90 }
```

Records older than the retention are deleted on a timer. Without a licence that includes recording, the settings are saved but nothing is kept, and the page says so.

## What developers see

Recording is disclosed, not hidden. The Connect to team screen shows "The gateway keeps the content of your chat conversations, autocomplete requests" before the developer agrees, the Providers tab shows the same line on the Managed by your team banner, and a change on your side reaches every developer at their next VS Code start.

This is a team decision made on the team's gateway, in the same way a company's email or source control is the company's. Put it in whatever your team agrees to, and be as specific as the banner is. A developer who does not accept it does not connect.

## Reviewing

The **Recordings** page lists records newest first, filtered by feature, developer, period or a text search. Open one to read the whole conversation as turns, or an autocomplete as before, completion, after.

## Exporting for training

The **export training data** button, or on the gateway machine:

```sh
twinny-server recordings export --route chat --since 30d > chat.jsonl
twinny-server recordings export --route fim > fim.jsonl
```

One example per line, in the shapes fine-tuning tools expect: chat as `{"messages": [ …, {"role": "assistant", "content": "…"}]}`, autocomplete as `{"prompt", "suffix", "completion"}`, embeddings as `{"input": […]}`. Failed and cancelled requests are left out. Add `--format raw` for the records exactly as stored.

## Where it lives

`~/.twinny/server/recordings/`, in one indexed SQLite file on Node 22 or newer (the Docker image), or one JSON-lines file per day on older Node. Either way it is content: treat the directory like source code, keep it on an encrypted disk, and include it in what you back up or deliberately do not.

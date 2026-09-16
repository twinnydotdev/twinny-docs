---
title: Connect to your team
description: "Use your team's gateway from VS Code: open the invite link, or enter the address and paste or request a key."
---

The easiest way in is an invite link from your admin. Failing that, you need the gateway's address (such as `https://ai.example.com`) and a personal key (`tsk_…`), which you can be given or request from inside VS Code. The key is yours alone; usage is reported per key, so lending it makes someone else's work show up as yours.

## With an invite link

Install twinny, then open the link your admin sent. It looks like `vscode://rjmacarthy.twinny/join?…` and opens VS Code on the twinny sidebar. Your key is made and stored in secret storage as the link opens, and you see the team's default models for chat, autocomplete and embeddings. Choose **Connect** and you are done. The link opens once; if it says it was used or expired, ask your admin for another. On Cursor or VSCodium, replace `vscode://` with `cursor://` or `vscodium://`.

## With the address and a key

1. Open the twinny sidebar and go to **Providers**.
2. Under **Using Twinny with your team?** choose **Connect to team**. On a fresh install the welcome screen has the same button under **Joining a team?**
3. Enter the gateway URL. Then either paste your key and **Check connection**, or choose **Request a key** (below).
4. twinny asks the gateway who you are and reads the models your admin has set as the team default for chat, autocomplete and embeddings. Nothing is sent to the models, so this takes a moment even when a model is still loading. You see your name as the gateway knows it and the alias for each feature.
5. Choose **Connect**. twinny creates one provider per feature the admin configured, makes them active, and stores your key in VS Code's secret storage. Nothing about your key is written to settings or exported with your provider list. To try a model, use **Test Provider** on its card afterwards.

Any providers you already had are kept; you can switch back to them at any time from the provider list.

### Requesting a key

**Request a key** shows a short code, such as `WXYZ-2345`. Read it to your gateway admin, in person or on a call. They see the request on the gateway's admin page with the name and machine your VS Code suggested, type your key name, and approve it. Your key arrives in VS Code within a few seconds, goes straight into secret storage, and the connection check runs by itself. The code is good for ten minutes and cannot be turned into a key by anyone but the admin.

## What happens to your code

Prompts and the code around your cursor go to the gateway and its backend, on your team's hardware, and nowhere else. The gateway records which model you used, how long it took and token counts. It keeps the content of your requests only if your team has switched recording on, and then it says so on the connect screen and on the Providers tab. See [Status bar, logs and privacy](/twinny-docs/features/status-and-logs/) for what twinny itself keeps.

## Messages you may see

- **"This gateway key was revoked on …"**: connect again with **Request a key**, or ask your admin for a new one.
- **"Your admin denied the sign-in request"** or **"The sign-in code expired"**: ask, then request again. Codes last ten minutes.
- **"This gateway key has no seat"**: the gateway has more keys than its plan allows. Your admin needs to add seats or revoke unused keys; nothing to do on your side.
- **"is rate limiting requests"**: the gateway is busy, or your key hit its own limit. It clears by itself within a minute.
- **"Could not connect"**: the gateway is unreachable from your machine. Check the address, VPN or tunnel, and that `https://<gateway>/healthz` answers from a browser.
- **"Your admin has not selected a default for this feature"**: the gateway has no team default for that feature yet. You can still add a **Twinny gateway** provider by hand and pick any alias it serves.

## Adding a gateway provider by hand

Connect to team is the short path. The long one is **Providers → Add → Twinny gateway** (under "Another machine"): enter the hostname, port and protocol, paste your key into **Gateway token**, and pick an alias from the list the gateway returns. Make one provider each for chat, autocomplete and embeddings if you want all three.

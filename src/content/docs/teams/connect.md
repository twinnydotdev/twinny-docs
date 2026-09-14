---
title: Connect to your team
description: Use your team's gateway from VS Code with the address and the personal key your admin gave you.
---

You need two things from whoever runs your team's gateway: its address (such as `https://ai.example.com`) and your personal key (`tsk_…`). The key is yours alone; usage is reported per key, so lending it makes someone else's work show up as yours.

## Connect

1. Open the twinny sidebar and go to **Providers**.
2. Under **Using Twinny with your team?** choose **Connect to team**.
3. Enter the gateway URL and your key, then **Check connection**.

twinny asks the gateway who you are and tests each model your admin has set as the team default for chat, autocomplete and embeddings. Usually under 25 seconds. You see your name as the gateway knows it, and for each feature whether the model answered and how fast.

4. Choose **Connect**. twinny creates one provider per feature the admin configured, makes them active, and stores your key in VS Code's secret storage. Nothing about your key is written to settings or exported with your provider list.

Any providers you already had are kept; you can switch back to them at any time from the provider list.

## What happens to your code

Prompts and the code around your cursor go to the gateway and its backend, on your team's hardware, and nowhere else. The gateway records which model you used, how long it took and token counts, never the content. See [Status bar, logs and privacy](/twinny-docs/features/status-and-logs/) for what twinny itself keeps.

## Messages you may see

- **"This gateway key was revoked on …"**: ask your admin for a new key and connect again.
- **"This gateway key has no seat"**: the gateway has more keys than its plan allows. Your admin needs to add seats or revoke unused keys; nothing to do on your side.
- **"is rate limiting requests"**: the gateway is busy, or your key hit its own limit. It clears by itself within a minute.
- **"Could not connect"**: the gateway is unreachable from your machine. Check the address, VPN or tunnel, and that `https://<gateway>/healthz` answers from a browser.
- **"Your admin has not selected a default for this feature"**: the gateway has no team default for that feature yet. You can still add a **Twinny gateway** provider by hand and pick any alias it serves.

## Adding a gateway provider by hand

Connect to team is the short path. The long one is **Providers → Add → Twinny gateway** (under "Another machine"): enter the hostname, port and protocol, paste your key into **Gateway token**, and pick an alias from the list the gateway returns. Make one provider each for chat, autocomplete and embeddings if you want all three.

---
title: Installation
description: Installing, updating and removing the twinny extension.
---

## From the Marketplace

Search for **twinny** in the Extensions view (`Ctrl+Shift+X`) and press Install, or open the [Marketplace page](https://marketplace.visualstudio.com/items?itemName=rjmacarthy.twinny) and press Install there.

From the command line:

```sh
code --install-extension rjmacarthy.twinny
```

## VSCodium and other builds

Builds that use Open VSX instead of the Microsoft marketplace can install from [open-vsx.org/extension/rjmacarthy/twinny](https://open-vsx.org/extension/rjmacarthy/twinny), or:

```sh
codium --install-extension rjmacarthy.twinny
```

## From a VSIX file

If you need to install without a marketplace, build a `.vsix` from the source and install it with **Extensions: Install from VSIX...** in the command palette, or:

```sh
code --install-extension twinny-<version>.vsix
```

Building takes a minute; see [Contributing](/twinny-docs/reference/contributing/#building-a-vsix).

## Remote development

twinny is a workspace extension: in a Remote SSH, WSL, Dev Container or Codespaces window it runs on the remote side, next to your code. That means:

- "localhost" in a provider means the **remote** machine. If your model server runs on your laptop and your code is in a container, point the provider at the laptop's address on the network, or run the server inside the container.
- Provider configuration is stored per VS Code installation. Set `twinny.providerStorageLocation` to `file` if you move between remotes often and want the list to survive, or use [Export and import](/twinny-docs/providers/import-export/).
- [Devices](/twinny-docs/providers/devices/) work from a remote as long as the remote can reach the network on UDP.

## After installing

twinny activates when VS Code starts. The first time, it looks for a model server on this machine and sets up providers if it finds one; otherwise it opens the Providers tab. Follow the [Quick start](/twinny-docs/getting-started/quick-start/).

You will see:

- a **twinny icon** in the activity bar, which opens the sidebar,
- a `</>` **status bar item** that shows a spinner while twinny is working,
- **Twinny** entries in the editor's right-click menu, the Explorer, the terminal's right-click menu, and the Source Control title bar.

## Updating

VS Code updates extensions automatically. Release notes are on the [releases page](https://github.com/twinnydotdev/twinny/releases). Provider configuration, templates and the workspace index are kept across updates.

## Disabling and uninstalling

- **Disable twinny** in the command palette turns the extension off without removing it; **Enable twinny** turns it back on. The status bar item hides while disabled.
- To stop only the suggestions, click the status bar item and toggle auto-suggest, or set `twinny.autoSuggestEnabled` to `false`.
- Uninstall from the Extensions view like any extension. Files twinny created outside VS Code stay until you delete them: `~/.twinny/templates/` (prompt templates), `~/.twinny/embeddings/` (workspace indexes) and `~/.twinny/node/` (the P2P node identity, if you used the command-line node).

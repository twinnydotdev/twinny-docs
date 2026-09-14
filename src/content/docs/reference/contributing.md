---
title: Contributing
description: Building twinny from source, running the tests, and where things are.
---

twinny is developed at [github.com/twinnydotdev/twinny](https://github.com/twinnydotdev/twinny) under the MIT licence. Contributions are welcome; for anything beyond a small fix, open an issue describing the change first so the design can be discussed. Pull requests go to the `development` branch.

## Building and running

Requirements: Node.js 18 or newer, npm, and VS Code.

```sh
git clone https://github.com/twinnydotdev/twinny.git
cd twinny
npm install
npm run build        # or: npm run watch
```

Open the folder in VS Code and press `F5` to launch an Extension Development Host with twinny loaded from the source. The webview is a React app bundled alongside the extension; `npm run watch` rebuilds both on change.

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run lint` / `npm run lint:fix` | ESLint over `src` |
| `npm test` | Builds, lints, then runs the test suite in a headless VS Code. On Linux without a display, run it as `xvfb-run npm test` |
| `npm run node` | Runs the `twinny-node` P2P command line from the build |
| `npm run vscode:package` | Builds a `.vsix` |

### Building a VSIX

```sh
npm install
npm run vscode:package
```

produces `twinny-<version>.vsix` in the folder, installable with **Extensions: Install from VSIX...**.

## Layout

```
src/
  index.ts              extension entry: commands, providers, wiring
  common/               shared by extension and webview: constants, types,
                        provider validation and discovery (pure, unit-tested)
  extension/
    chat/               chat service, context builder, mentions, history
    completion/         FIM provider, templates, parser, LSP and recent-edit context
    edit/               inline edit: diff regions, CodeLens, code actions, tests
    embeddings/         indexer, chunker, LanceDB store, hybrid search, reranker
    inference/          provider-agnostic adapters (HTTP, hosted SDKs) and errors
    p2p/                gateway, host, runtime for paired devices
    providers/          provider store, manager, probe, first-run setup
    review/             code review, git helpers, commit messages
    templates/          Handlebars templates and defaults
    terminal/           command writer, error fixer, shell-integration history
    webview/            sidebar and panel hosts, file handling
  node/                 the twinny-node command line
  p2p/                  the peer-to-peer protocol, pairing and identity (no vscode imports)
  webview/              the React sidebar: chat, providers, devices, embeddings, review
  test/suite/           tests, run inside VS Code
```

Two conventions worth knowing:

- Code in `src/common`, `src/p2p` and most of `src/extension/*` that does not import `vscode` is **pure** and has direct unit tests. Keep new logic there where you can, and keep the VS Code-facing layer thin.
- The webview and the extension talk through a typed message protocol in `src/common/messaging`. Add a message type there before using it on either side.

## Adding a provider preset

1. Add the provider id to `API_PROVIDERS` in `src/common/constants/providers.ts` and a display name to `PROVIDER_DISPLAY_NAMES`.
2. If it is an OpenAI-compatible local server, add it to `OPEN_AI_COMPATIBLE_PROVIDERS` and give it endpoint defaults in `src/common/provider-validation.ts`; add it to `LOCAL_SERVER_PROVIDERS` in `provider-discovery.ts` if first-run discovery should probe it.
3. If it is a hosted API, add it to `HOSTED_PROVIDERS` (and `CHAT_ONLY_PROVIDERS` if it has no completions endpoint) and wire the SDK in `src/extension/inference/adapters/hosted.ts`.
4. Add a preset in `src/webview/providers/presets.tsx` and a `preset-<id>` blurb in each locale under `src/webview/assets/locales/`.
5. Add a case to `src/test/suite/inference.test.ts`.

## Adding a FIM template

Add the format to `FIM_TEMPLATE_FORMAT` and a stop-word list in `src/common/constants/models.ts`, a render function and a model-name hint in `src/extension/completion/fim-templates.ts`, and a test in `fim-templates.test.ts`.

## Translations

The sidebar's strings live in `src/webview/assets/locales/<locale>.json`. To add a language, copy `en.json`, translate, and add the locale to the `twinny.locale` enum in `package.json`. To fix a translation, edit the file.

This documentation lives in [twinnydotdev/twinny-docs](https://github.com/twinnydotdev/twinny-docs), an Astro Starlight site; pages are Markdown under `src/content/docs/`, with the Chinese translation under `zh-cn/`. `npm run dev` previews it.

## Reporting bugs

Open an issue with the twinny version, VS Code version, server and model, and the relevant lines from the Twinny output channel at *Debug* level. Keys are redacted from the log automatically.

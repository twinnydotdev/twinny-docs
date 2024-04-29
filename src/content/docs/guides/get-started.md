---
title: Get started
description: A get started guide for twinny
---

### Using Ollama

1. Install the VS Code extension [here](https://marketplace.visualstudio.com/items?itemName=rjmacarthy.twinny) or [VSCodium here](https://open-vsx.org/extension/rjmacarthy/twinny).
2. Set up Ollama as the backend by default: [Install Ollama](https://ollama.com/)
3. Select your model from the [Ollama library](https://ollama.com/library) (e.g., `codellama:7b-instruct` for chats and `codellama:7b-code` for auto complete).

```sh
ollama run codellama:7b-instruct
ollama run codellama:7b-code
```

4. Open VS code (if already open a restart might be needed) and press `ctr + shift + T` to open the side panel.

You should see the 🤖 icon indicating that twinny is ready to use.

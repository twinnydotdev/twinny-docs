---
title: Quick start
description: A quick start guide for using twinny.
---

## Prerequisites

Before you start using twinny you need to have access to an inference provider.  An inference provider is a local or cloud hosted server that runs the AI models.

The recommended way to do this is to use [Ollama](https://ollama.com/).  Ollama makes it easy to run your models locally and exposes them as an OpenAI compatible API.  Performance will depend on your hardware and chosen model, see Ollama's documentation for more information.

## Installing the extension

1. Install the Visual Studio Code extension [here](https://marketplace.visualstudio.com/items?itemName=rjmacarthy.twinny) or for VSCodium [here](https://open-vsx.org/extension/rjmacarthy/twinny).

## Installing Ollama as an inference provider

1. Visit [Install Ollama](https://ollama.com/) and follow the instructions to install Ollama on your machine.
2. Choose a model from the list of models available on Ollama.  The recommended models are [codellama:7b-instruct](https://ollama.com/library/codellama:instruct) for chat and [codellama:7b-code](https://ollama.com/library/codellama:code) for fill-in-middle.

```sh
ollama run codellama:7b-instruct
ollama run codellama:7b-code
```

Once both the extension and Ollama are installed you can start using twinny.

1. Open VS code (if already open a restart might be needed) and press `CTRL+SHIFT+Z CTRL+SHIFT+T` to open the side panel.

You should see the 🤖 icon indicating that twinny is ready to use. The icon will change to a spinner when twinny is making a call to the inference provider.

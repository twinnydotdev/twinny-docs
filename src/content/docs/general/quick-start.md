---
title: Quick start
description: A quick start guide for using twinny.
---

## Prerequisites

To use twinny, you need access to an inference provider. An inference provider is a local or cloud-hosted server that runs the AI models.

The recommended way to set this up is by using [Ollama](https://ollama.com/). Ollama simplifies running AI models locally and exposes them through an OpenAI-compatible API. Performance will vary based on your hardware and the chosen model; please refer to Ollama's documentation for more details.

## Installing the extension

1. Install the Visual Studio Code extension [here](https://marketplace.visualstudio.com/items?itemName=rjmacarthy.twinny) or for VSCodium [here](https://open-vsx.org/extension/rjmacarthy/twinny).

## Installing Ollama as an inference provider

1. Visit the [Ollama installation page](https://ollama.com/) and follow the instructions to install Ollama on your machine.
2. Download a model to use with twinny. A good general-purpose model to start with is `codellama:7b-instruct`. You can run the following command in your terminal:

```sh
ollama pull codellama:7b-instruct
```

To run this model, or another of your choice (see the [Supported Models page](/twinny-docs/supported-models/) for more options), use:

```sh
ollama run your-chosen-model-name
```

For example, to run `codellama:7b-instruct`:

```sh
ollama run codellama:7b-instruct
```

Make sure the model is running in Ollama before proceeding.

## Using twinny

Once both the extension and an Ollama model are running, you can start using twinny:

1. Open VS Code. If it was already open during the extension installation, a restart might be necessary.
2. Look for the twinny icon in the side panel.

You should also see the 🤖 icon in the status bar, indicating that twinny is ready. This icon will change to a spinner when twinny is communicating with the inference provider.

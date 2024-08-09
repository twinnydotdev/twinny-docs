---
title: Chat
description: Chat with twinny
---

Chat with twinny and leverage workspace embeddings for enhanced context.

## Open Side Panel

To use twinny Chat, access it from the VSCode sidebar. twinny will retain the chat history between sessions. You can find the chat history by clicking on the History icon on the top panel.

## Context and Code Selection

When you highlight/select code in your editor, twinny will use that as the context for the chat message. If you have not selected any code, it will use the message alone and any previous messages. You can also right-click on selected code and select a twinny option to refactor, explain and perform other actions.

## Workspace Embeddings

twinny now supports workspace embeddings to provide more relevant context for your queries.

### How it Works

1. Your workspace documents are embedded and stored when you click the "Embed workspace documents" button.
2. When you send a message, twinny looks up relevant chunks from the embeddings.
3. These chunks are reranked and used as additional context for your query.

### Embedding Settings

- **Embedding Provider**: By default, twinny uses Ollama Embedding (all-minilm:latest) for embeddings.
- **Provider Details**:
  - Label: Ollama Embedding
  - Provider: ollama
  - Type: embedding
  - Hostname: 0.0.0.0
  - Path: /v1/embeddings
  - Protocol: http
  - Port: 11434

You can update these settings to use a different embedding provider if needed. In theory, most providers should work as long as they return the correct data structure.

For HTTPS providers like OpenAI, a local proxy such as LiteLLM is required for it to work.

### Rerank Probability Threshold

You can adjust the rerank probability threshold (default: 0.14) to control which results are included as context. A lower threshold means more results are likely to be included.

### Toggling Context

The database-like icon with lines allows you to turn on/off the use of embedded context for each message.

### Embedding Workspace Documents

To include your workspace documents in the embeddings, use the "Embed workspace documents" button in the settings panel.

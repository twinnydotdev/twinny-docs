---
title: Chat
description: Interact with twinny's chat feature and leverage workspace context.
---

twinny's chat interface allows you to ask questions, get explanations, and generate code. It can also leverage the context of your workspace for more relevant answers.

### Accessing Chat and History

To use twinny Chat, open it from the VS Code sidebar. twinny retains your chat history between sessions. You can access the history by clicking the "History" icon in the top panel of the twinny chat view.

### Providing Context for Messages

- **Code Selection**: If you select code in your editor before sending a message, twinny uses that selection as primary context.
- **Conversation History**: If no code is selected, twinny uses the current message and previous conversation history for context.
- **Right-Click Actions**: You can also right-click on selected code in the editor and choose from various twinny commands to refactor, explain, or perform other actions.

### Enhanced Context with Retrieval Augmented Generation (RAG)

twinny uses Retrieval Augmented Generation (RAG) to incorporate relevant information from your workspace documents into its responses, providing more accurate and context-aware assistance.

**How RAG Works:**

1.  **Create Embeddings**: First, you need to generate embeddings for your workspace documents. Click the "Embed workspace documents" button in the twinny settings panel. This process converts your documents into vector representations (embeddings) that twinny can understand and search.
2.  **Query Augmentation**: When you send a message using specific mentions (see below), twinny searches your workspace embeddings for the most relevant document chunks.
3.  **Contextual Response**: These retrieved chunks are then added as context to your original query, allowing the AI model to generate a more informed response.

**Using Mentions to Trigger RAG and Add Specific Context:**

-   `@workspace`: Include this mention in your chat message to instruct twinny to search across all your embedded workspace documents for relevant context.
-   `@file`: Type `@` followed by the name of a specific file in your workspace (e.g., `@myFile.ts`) to add that file's content as context to your query.
-   `@problems`: Use this mention to focus twinny's attention on reported problems or diagnostics within your codebase. (Note: This may draw from a different information source than workspace document embeddings.)

**Toggling RAG Context:**

You can toggle the use of RAG-retrieved context for each message by clicking the database-like icon in the chat input area. This allows you to control whether external workspace information is included.

### Configuring Embeddings

twinny requires an embedding provider to generate the vector representations of your workspace documents.

-   **Default Embedding Provider**: By default, twinny uses a local Ollama instance with an embedding model like `all-minilm:latest`.
-   **Default Connection Details (for Ollama)**:
    -   Provider: `ollama`
    -   Type: `embedding`
    -   Hostname: `127.0.0.1` (or `localhost`. Use `0.0.0.0` if Ollama is in a container and needs to be accessible from other containers/host)
    -   Path: `/api/embed`
    -   Protocol: `http`
    -   Port: `11434`

-   **Custom Providers**: You can update these settings to use a different embedding provider. Most providers that return a compatible data structure (an array of floating-point numbers) should work.
-   **HTTPS Providers**: For providers using HTTPS (e.g., OpenAI API), a local proxy like [LiteLLM](https://litellm.ai/) is required to bridge the connection, as twinny primarily expects an HTTP endpoint for embeddings.

**Rerank Probability Threshold:**

-   This setting (default: `0.14`) controls the sensitivity of the reranking process when multiple document chunks are retrieved.
-   A lower threshold includes more results as context, potentially increasing comprehensiveness but also noise. A higher threshold is more selective.

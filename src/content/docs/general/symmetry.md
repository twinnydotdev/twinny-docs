---
title: Symmetry Network
description: Explore Symmetry, a distributed computing network integrated with the twinny VS Code extension and accessible via an OpenAI-compatible API.
---

Symmetry is a distributed network enabling users to share and access computational resources. Initially part of the twinny VS Code extension, Symmetry is evolving into a versatile tool for developers, researchers, and data scientists, accessible through various means including an OpenAI-compatible API.

The Symmetry client is open-source and licensed under the Apache 2.0 license. You can find the project on GitHub: [twinnydotdev/symmetry](https://github.com/twinnydotdev/symmetry).

## Accessing Symmetry via OpenAI-Compatible API (twinny.dev)

Symmetry is accessible through an OpenAI-compatible API endpoint hosted at `https://twinny.dev`. This allows you to interact with models on the Symmetry network using standard OpenAI client libraries or direct HTTP requests, facilitating integration with existing applications.

**API Base URL**: `https://twinny.dev/v1`

### API Features and Endpoints

-   **Chat Completions**:
    -   **Endpoint**: `/chat/completions` (full path: `https://twinny.dev/v1/chat/completions`)
    -   **Description**: Used for chat-based interactions with models available on the Symmetry network.
    -   **Note**: This API is rate-limited to ensure fair usage. Requests exceeding the limit will receive a `429` status code. It also supports conversation management using an `id` field in your requests.

### Authentication

To use the `https://twinny.dev` API endpoint, you will need an API key. Refer to the [twinny.dev provider settings in twinny](/general/providers/#twinnydev-symmetry-network) for details on obtaining and using an API key.

### Example Request (Chat Completions)

```javascript
// Using fetch API with Node.js (ensure you have a fetch polyfill or use a library like node-fetch)
// In browsers, fetch is natively available.

async function getSymmetryChatCompletion(apiKey, modelName, userMessage) {
  try {
    const response = await fetch('https://twinny.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}` // Include your API key
      },
      body: JSON.stringify({
        model: modelName, // Specify the model available on Symmetry
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage }
        ],
        // stream: true // Responses are typically streamed as Server-Sent Events (SSE)
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${await response.text()}`);
    }

    // Assuming the response is SSE or a JSON object if not streaming
    // For SSE, you'd handle the stream appropriately.
    // For a non-streaming example (if supported):
    const data = await response.json();
    console.log(data.choices[0].message.content);

  } catch (error) {
    console.error('Error fetching chat completion:', error);
  }
}

// Example usage:
// getSymmetryChatCompletion('YOUR_API_KEY', 'some-model-on-symmetry', 'Hello, how are you?');
```
**Note on Streaming (SSE)**: The original example mentioned SSE. If the API primarily uses SSE, the client-side handling would involve `EventSource` or similar mechanisms to process the stream of events. The example above shows a basic JSON response handling for simplicity but includes a comment about streaming.

## Becoming a Symmetry Network Provider

Contributing your computational resources to the Symmetry network can be a rewarding way to support the community and make use of idle hardware.

### Why Become a Provider?

-   **Support Decentralized AI**: Contribute to building a distributed and accessible computing network.
-   **Utilize Idle Resources**: Put your spare computational power to good use.
-   **Future Incentives**: Be part of a network with potential for future incentive systems (e.g., token rewards, subject to network evolution).
-   **Gain Experience**: Learn about peer-to-peer (P2P) technologies and distributed systems.
-   **Facilitate Research**: Enable access to diverse computational resources, which can indirectly support research and development in the AI field by providing a larger, more varied set of models and providers.

### How to Set Up a Provider Node

Setting up a Symmetry provider node involves running the Symmetry CLI and configuring it to serve an AI model.

1.  **Prerequisites**:
    *   Node.js v18 or higher must be installed.
    *   An accessible AI model endpoint (e.g., a local Ollama instance).

2.  **Install the Symmetry CLI**:

    **Unix/Linux/macOS**:
    ```bash
    curl -fsSL https://www.twinny.dev/symmetry-unix.sh | sh
    ```

    **Windows (PowerShell)**:
    ```powershell
    iwr -useb https://www.twinny.dev/symmetry-windows.ps1 | iex
    ```

3.  **Configure Your Provider Node**:
    Create a `provider.yaml` file in the Symmetry configuration directory (`~/.config/symmetry/` on Linux/macOS, or `%APPDATA%\symmetry\` on Windows). This file contains your provider settings. See the "Provider Configuration (`provider.yaml`)" section below for details.

4.  **Start Your Node**:
    Open your terminal and run:
    ```bash
    symmetry-cli
    ```
    The CLI will attempt to initialize using your `provider.yaml`, connect to the Symmetry network, and make a test call to your local model endpoint to verify the setup.

    Example startup log:
    ```
    ℹ️ INFO: 🔗 Initializing client using config file: /home/user/.config/symmetry/provider.yaml
    ℹ️ INFO: 📁 Symmetry client initialized.
    ℹ️ INFO: 🔑 Discovery key: xxx
    ℹ️ INFO: 🔑 Server key: 4b4a9cc325d134dee6679e9407420023531fd7e96c563f6c5d00fd5549b77435
    ℹ️ INFO: 🔗 Joining server, please wait.
    ℹ️ INFO: 🔗 Connected to server.
    ℹ️ INFO: ✅ Verification successful.
    ℹ️ INFO: 👋 Saying hello to your provider...
    ℹ️ INFO: 🚀 Sending test request to http://localhost:11434/v1/chat/completions
    ℹ️ INFO: 📡 Got response, checking stream...
    ℹ️ INFO: ✅ Test inference call successful!
    ```

### Programmatic Setup (using `symmetry-core`)

For developers looking to integrate Symmetry provider capabilities directly into Node.js applications, the `symmetry-core` package is available.

```bash
npm install symmetry-core
```

```javascript
import { SymmetryProvider } from 'symmetry-core'; // Adjust import based on package structure

// Example configuration for the provider
const providerConfig = {
  apiHostname: "localhost", // Host of your local AI model endpoint
  apiKey: "your_model_endpoint_api_key", // API key for your model endpoint (if required)
                                       // This key is for local access, not sent to the Symmetry server.
  apiBasePath: "/v1",         // Base path for your model endpoint (e.g., /v1 for Ollama OpenAI-compatible)
  apiPort: 11434,             // Port for your model endpoint
  apiProtocol: "http",        // Protocol for your model endpoint
  modelName: "ollama/llama3.1:latest", // Model identifier you are serving (e.g., ollama/model:tag)
  name: "MySymmetryNode",      // A public name for your provider node
  serverKey: "4b4a9cc325d134dee6679e9407420023531fd7e96c563f6c5d00fd5549b77435", // Public key of the Symmetry matchmaking server
  systemMessage: "You are a helpful AI assistant served by MySymmetryNode.", // Optional default system message
  userSecret: "a_very_strong_and_unique_secret_for_my_node" // A private, unique secret for your node.
                                                          // Keep this secure. It's used for identification/tracking on the network.
};

// const provider = new SymmetryProvider(providerConfig);
// provider.start(); // Example method to start the provider
```
Ensure you refer to the `symmetry-core` package documentation for the most accurate and detailed usage instructions.

### Provider Setup via twinny VS Code Extension

The twinny VS Code extension also offers a user interface to configure and run your local machine as a Symmetry provider, simplifying the process of sharing your computational resources.

### Provider Configuration (`provider.yaml`)

Here’s an example of a `provider.yaml` file:

```yaml
# Hostname of your local AI model inference server (e.g., Ollama, LM Studio)
apiHostname: localhost
# API key for your local inference server, if it requires one (leave blank or remove if not needed)
apiKey:
# Base path for the API of your local inference server (e.g., /v1 for Ollama's OpenAI-compatible endpoint)
apiBasePath: /v1
# Port your local inference server is listening on
apiPort: 11434
# Protocol for your local inference server (http or https)
apiProtocol: http
# Name of the model you are serving, often in provider/model:tag format (e.g., ollama/llama3:8b)
# This should match a model that Symmetry network users can request.
modelName: ollama/llama3:8b
# A public name for your provider node displayed on the network
name: MyAwesomeProvider
# The public key of the Symmetry matchmaking server. This is usually a fixed value for the network.
serverKey: 4b4a9cc325d134dee6679e9407420023531fd7e96c563f6c5d00fd5549b77435
# Optional default system message to prepend to conversations handled by your node
systemMessage: "I'm a helpful assistant, served by MyAwesomeProvider!"
# A unique, private secret for your provider node.
# This is crucial for identification and potential future reward tracking. Keep it secure.
userSecret: "replace_this_with_a_strong_unique_secret"
```
Adjust these settings based on your specific local AI model endpoint and preferences.

## Important Considerations for Providers

-   **Security**: Ensure your node and the underlying AI model server are secure and kept up-to-date.
-   **Data Handling**: Be aware that you are processing data from users. Handle it responsibly and in accordance with any applicable privacy considerations.
-   **Stability**: Maintain a stable internet connection and reliable uptime for your provider node to offer a good service to the network.

## Network Features (via twinny.dev API)

The `https://twinny.dev` API endpoint for Symmetry includes features like:

-   **Rate Limiting**: To ensure fair usage, the API has maximum request limits per time window. Exceeding these will result in a `429` status code.
-   **Conversation Management**: The API can manage conversation context if you include an `id` field in your chat completion requests.

## Evolution of Symmetry

Symmetry has grown from its initial integration within the twinny VS Code extension:

-   **OpenAI-Compatible API**: The `https://twinny.dev` endpoint makes Symmetry accessible to a wide range of applications.
-   **`symmetry-core` Package**: The Node.js package (`symmetry-core`) allows developers to integrate Symmetry provider capabilities into their own applications or services.
-   **Network Statistics**: Real-time statistics about the network are available via WebSocket connections (details typically provided via Symmetry community channels or GitHub).

## Frequently Asked Questions (FAQs)

1.  **Q: Is Symmetry only for VS Code users?**
    A: No. While it has deep integration with the twinny VS Code extension (for both using Symmetry and becoming a provider), Symmetry is also accessible via its OpenAI-compatible API at `https://twinny.dev` and through the `symmetry-core` Node.js package for developers.

2.  **Q: What tasks can I use Symmetry for?**
    A: Currently, Symmetry, especially via the `twinny.dev` API, is primarily focused on chat-based interactions. The underlying P2P infrastructure could potentially support other tasks like code completion in the future, depending on provider capabilities and network development.

3.  **Q: How does Symmetry handle data privacy?**
    A: Symmetry employs encrypted connections for communication between clients, providers, and the matchmaking server. After the initial matchmaking, clients and providers establish direct, encrypted connections. However, it's important to understand that the provider node you connect to will process your request data (e.g., prompts) to generate a response. Therefore, always consider the sensitivity of your data when using any distributed or third-party network. Choose trusted providers if possible for sensitive information.

4.  **Q: Can I integrate Symmetry into my own projects?**
    A: Yes. The Symmetry client and related tools like `symmetry-core` are open-source. You can use the `https://twinny.dev` API or, for more advanced integrations, explore the `symmetry-core` package.

5.  **Q: Are there rewards for being a provider on the Symmetry network?**
    A: The Symmetry project has outlined plans for an incentive system for providers. This may include:
    -   Rewards in the form of cryptocurrency tokens (e.g., on the Solana blockchain) for services rendered.
    -   Mechanisms to ensure network security and reliability, potentially involving concepts like Proof of Work (PoW) or similar consensus algorithms as the network matures.
    For the most current information on provider rewards, refer to official announcements from the Symmetry project.

6.  **Q: How can I stay updated on Symmetry's development?**
    A: Follow the official [Symmetry GitHub repository](https://github.com/twinnydotdev/symmetry) and any associated community channels or documentation sites for the latest updates, features, and announcements.

By participating in the Symmetry network, whether as a user or a provider, you contribute to the exploration and development of decentralized AI and distributed computing technologies. As Symmetry evolves, it aims to offer more robust, flexible, and powerful options for the community.

Please refer to the [twinny.dev privacy policy](https://www.twinny.dev/privacy) for information regarding usage of the network and associated services.

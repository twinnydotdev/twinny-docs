---
title: Symmetry - Inference Network
description: Explore Symmetry, a distributed computing network integrated with twinny VSCode extension and beyond.
---

Symmetry is a distributed network that allows users to share and access computational resources. Initially integrated with the twinny VSCode extension, Symmetry has potential to become a powerful tool for developers, researchers, and data scientists.

Note: Symmetry is still in alpha and there may be some issues. Please report any issues you find at [https://github.com/twinnydotdev/symmetry](https://github.com/twinnydotdev/symmetry).

![symmetry architecture diagram](../../../assets/symmetry-architecture.png)

The symmetry client is licensed under the Apache 2.0 license.

[https://github.com/twinnydotdev/symmetry](https://github.com/twinnydotdev/symmetry)


## Connecting to Symmetry in twinny VSCode Extension

Symmetry can be used as an inference provider within the twinny VSCode extension if there are active providers available in the network for the specific model.  You can find the current providers and the available models at: [https://twinny.dev/symmetry](https://twinny.dev/symmetry).

1. In the twinny extension settings, select your desired model.
2. Click the "Connect to Symmetry" button in the extension.
3. The extension will automatically connect to the Symmetry network using the selected model. The model name can be configured inside the twinny extension settings, please try to match this with one of the available models found at [https://twinny.dev/symmetry](https://twinny.dev/symmetry). This process will be improved in the future to allow users to select from a list of available models.
4. When you're connected you should see the green "Connected" status in the extension sidebar.
5. Try sending some requests to the model using the twinny extension it should work as expected.

#### Disconnected:
![symmetry connected](../../../assets/symmetry_disconnected.png)

#### Connected:
![symmetry connected](../../../assets/symmetry_connected.png)

Look for the icon:

![symmetry provider](../../../assets/symmetry_provider.png)

## Becoming a Symmetry Provider

As Symmetry grows, there's an opportunity for users to contribute by becoming providers. Here's what you need to know:

### Why Consider Becoming a Provider?

- Contribute to a distributed computing network
- Utilize idle computational resources
- Potential for future incentive systems (subject to network development)
- Gain experience with peer to peer technologies
- Become the collector of data for machine learning research 

### How to Become a Provider

1. **Install Symmetry**:

   Unix
   ```bash
   curl -fsSL https://www.twinny.dev/symmetry-unix.sh | sh
   ```

   Windows
   ```
   iwr -useb https://www.twinny.dev/symmetry-windows.ps1 | iex
   ```

2. **Configure Your Node**:
   Create a `provider.yaml` file in `~/.config/symmetry/` with your provider settings.

3. **Start Your Node**:
   ```bash
   symmetry-cli
   ```

The provider will start and make a test call to your provider.

```
ℹ️ INFO: 🔗 Initializing client using config file: /home/twinnydotdev/.config/symmetry/provider.yaml
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

### Programatically

```bash
npm install symmetry-core
```

```javascript
const config = {
  apiHostname: "localhost",
  apiKey: "apikeyforprovider", // not publically available or transported to server
  apiChatPath: "/v1/chat/completions",
  apiPort: 11434,
  apiProtocol: "http",
  apiProvider: "ollama",
  dataCollectionEnabled: false,
  maxConnections: 10,
  modelName: "llama3.1:latest",
  name: "twinnydotdev",
  dataPath: "/home/twinnydotdev/.config/symmetry/data",
  public: true,
  serverKey: "4b4a9cc325d134dee6679e9407420023531fd7e96c563f6c5d00fd5549b77435",
  systemMessage: "I'm a system message",
  userSecret: "supersecretpasswordforuptimetracking"
};

const provider = new SymmetryProvider(config);
```


### Provider Configuration

Example `provider.yaml`:

```yaml
apiHostname: localhost # The host of your inference server
apiKey: # The API key for your inference server
apiChatPath: /v1/chat/completions # The path to the inference endpoint
apiPort: 11434 # The port of your inference server
apiProtocol: http # The protocol of your inference server
apiProvider: ollama # The name of the inference provider
dataCollectionEnabled: true # Whether to advertise that data collection is enabled
maxConnections: 10 # The maximum number of connections to allow
modelName: llama3:8b # The name of the model you are serving
name: provider  # The name of your provider
dataPath: /home/richard/.config/symmetry/default # The data directory
public: true # Whether your provider is publicly accessible
serverKey: 4b4a9cc325d134dee6679e9407420023531fd7e96c563f6c5d00fd5549b77435 # The symmetry server key which handles provider messages
systemMessage: "Im a system message" # Optional system message for all chats
userSecret: "supersecretpasswordforuptimetracking" # A secret for uniquely identify peers on the network
```

Adjust these settings based on your setup and preferences.

## Considerations for Providers

- Ensure your node is secure and up-to-date
- Be aware of the data passing through your node
- Maintain a stable and reliable connection

## Beyond VSCode: Future Developments

While currently focused on the twinny extension, Symmetry's potential extends further:

- **Standalone Usage**: Plans are in place to develop a Node.js package that will allow developers to tap into the Symmetry network from any Node.js application.
- **API Access**: Future versions may include direct API access, enabling integration with a wide range of applications and services.

## Frequently Asked Questions (FAQs)

1. **Q: Is Symmetry only for VSCode users?**
   A: While currently integrated with the twinny VSCode extension, there are plans to expand Symmetry's accessibility through a Node.js package and potentially direct API access in the future.

2. **Q: Can I use Symmetry for chat and autocomplete?**
   Currently, Symmetry is designed for chat, but it could be used for other purposes in the future (e.g., autocomplete).

3. **Q: How does Symmetry ensure data privacy?**
   A: Symmetry uses encrypted connections for all communications. After initial matchmaking, clients and providers communicate directly, bypassing the central server. However, providers do have access to decrypted data for processing, so consider data sensitivity when using the network.

4. **Q: Can I use Symmetry in my own projects?**
   A: Currently, Symmetry is primarily used within the twinny VSCode extension. However, plans for a Node.js package are in development, which will allow broader integration in various projects.

5. **Q: Are there rewards for being a provider?**

    A: Yes, providers can earn points through a gamification system:
- 1 base point for every hour they stay online
- Progressive bonus points each consecutive hour (2, 3, 4, etc.) up to a maximum of 6 bonus points
- Points currently serve as a fun way to track participation and engagement
- While there may be potential for future utility token integration with the Twinny VSCode extension and Symmetry network, this is not guaranteed and there are no concrete plans at this time.

6. **Q: How can I stay updated on Symmetry's development?**
   A: Keep an eye on the official Symmetry GitHub repository and documentation for the latest updates and announcements.

By exploring Symmetry, whether as a user through the twinny extension or as a provider, you're participating in the development of distributed computing technologies. As Symmetry evolves, it aims to offer more flexible and powerful options for developers and researchers alike.

Please refer to the [privacy policy](https://www.twinny.dev/privacy) for information regarding usage of the network.

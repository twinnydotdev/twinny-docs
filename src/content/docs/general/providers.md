---
title: Inference Providers
description: Connect twinny with various local and remote AI models and services.
---

These example configurations are intended as a starting point. You may need to make individual adjustments based on your specific hardware, software environment, and chosen model.

> **Note**: For chat functionality, twinny is designed to be compatible with any API that adheres to the OpenAI API specification. For code completion, compatibility may vary.

### Ollama (Default Provider)

Ollama is configured as the default inference provider for twinny.

#### Code Completion

- **Hostname**: `localhost` (or `127.0.0.1`)
- **Port**: `11434`
- **Path**: `/api/generate` (Ollama's native generate endpoint)
- **Model Name**: e.g., `codellama:7b-code`, `deepseek-coder:6.7b-base` (or your preferred code completion model)
- **FIM Template**: Select a template matching your model (e.g., `codellama`, `deepseek-coder`)

#### Chat

- **Hostname**: `localhost` (or `127.0.0.1`)
- **Port**: `11434`
- **Path**: `/v1` (Ollama's OpenAI-compatible endpoint for chat, implies `/v1/chat/completions`)
- **Model Name**: e.g., `codellama:7b-instruct`, `llama3.1:8b-instruct` (or your preferred chat model)


### twinny.dev (Symmetry Network)

twinny.dev offers an OpenAI-compatible API, enabling interaction with the [Symmetry network](/general/symmetry) using the standard OpenAI API format. This facilitates easy integration with applications already compatible with the OpenAI API.

#### Chat

- **Hostname**: `twinny.dev`
- **Port**: `443` (default for HTTPS)
- **Path**: `/v1/chat/completions`
- **Model Name**: Refer to the available models listed at [twinny.dev/symmetry](https://twinny.dev/symmetry).
- **API Key**: Your twinny.dev API key.

#### Example Configuration Steps

1. In the twinny extension settings, configure your provider:
   - Set the "Provider" to `openai`.
   - Set the "Hostname" to `twinny.dev`.
   - Ensure the "Port" is `443` (default HTTPS).
   - Set the "Path" to `/v1/chat/completions`.
   - Enter your chosen "Model Name" from those available at [twinny.dev/symmetry](https://twinny.dev/symmetry).
   - Add your API key in the designated field for your provider configuration.

2. The API adheres to the OpenAI specification, supporting standard chat completion requests. Example message format:
   ```json
   {
     "model": "your_chosen_model_name",
     "messages": [
       { "role": "system", "content": "You are a helpful assistant." },
       { "role": "user", "content": "Hello, how are you?" }
     ],
     "temperature": 0.7
   }
   ```

> **Note**: The API incorporates rate limiting for fair usage. Exceeding the allocated request limit will result in a `429` status code.

### Open WebUI (with Ollama Backend)

Open WebUI can act as a proxy for Ollama. Configure twinny to point to the Open WebUI endpoint.

#### Code Completion

- **Hostname**: `localhost` (or the host where Open WebUI is running)
- **Port**: The port Open WebUI is serving (e.g., `8080`, `3000`).
- **Path**: `/ollama/api/generate` (Open WebUI's path for Ollama's generate endpoint)
- **Model Name**: e.g., `codellama:7b-code` (ensure this model is available in your Ollama instance via Open WebUI)
- **FIM Template**: Select a template matching your model (e.g., `codellama`, `deepseek-coder`).

#### Chat

- **Hostname**: `localhost` (or the host where Open WebUI is running)
- **Port**: The port Open WebUI is serving (e.g., `8080`, `3000`).
- **Path**: `/ollama/v1/chat/completions` (Open WebUI's path for Ollama's OpenAI-compatible chat endpoint)
- **Model Name**: e.g., `codellama:7b-instruct` (ensure this model is available in your Ollama instance via Open WebUI)

### LM Studio

LM Studio serves models through an OpenAI-compatible local server.

#### Code Completion

- **Hostname**: `localhost` (or `127.0.0.1`)
- **Port**: `1234` (LM Studio's default API port)
- **Path**: `/v1/completions` (OpenAI-compatible completion endpoint)
- **Model Name**: The specific model file loaded in LM Studio (e.g., `codellama-7b.Q5_K_M.gguf`). This might not be directly used if the server uses the loaded model by default.
- **LM Studio Preset (if applicable)**: e.g., `CodeLlama Completion` (selected in LM Studio UI)
- **FIM Template**: Select a template matching your model (e.g., `codellama` for Codellama GGUF files).

#### Chat

- **Hostname**: `localhost` (or `127.0.0.1`)
- **Port**: `1234`
- **Path**: `/v1/chat/completions` (OpenAI-compatible chat endpoint)
- **Model Name**: The specific model file loaded in LM Studio (e.g., `codellama-7b-instruct.Q5_K_M.gguf`).
- **LM Studio Preset (if applicable)**: e.g., `CodeLlama Instruct` (selected in LM Studio UI)

### LiteLLM

LiteLLM provides a unified interface to various LLM APIs and can manage local models.

#### Code Completion

Using LiteLLM for code completion with fill-in-the-middle (FIM) templates can be complex:
- It may require using the `custom-template` FIM setting in twinny.
- You might need to edit the `fim.hbs` template file directly.
- Results can vary significantly based on the model and your LiteLLM setup.

#### Chat

- **Hostname**: `localhost` (or the host where LiteLLM is running)
- **Port**: `4000` (default LiteLLM API server port, but can vary)
- **Path**: `/v1/chat/completions`
- **API Key (if configured in LiteLLM)**: Your LiteLLM API key.

Example command to start LiteLLM with a specific model (e.g., connecting to an OpenAI model):
```bash
litellm --model gpt-4-turbo --api_key your_openai_api_key
```
Or to serve a local HuggingFace model with LiteLLM:
```bash
litellm --model huggingface/codellama/CodeLlama-7b-hf
```
Refer to LiteLLM documentation for more startup options and configurations.

### Llama.cpp (via built-in server)

#### Code Completion

To use Llama.cpp's server for code completion:

1.  Start the Llama.cpp server. Example using Docker with `codellama-7b.Q5_K_M.gguf`:
    ```bash
    docker run -it -p 8080:8080 --gpus all \
      -v /path/to/your/gguf-models:/models \
      ghcr.io/ggerganov/llama.cpp:server \
      -m /models/codellama-7b.Q5_K_M.gguf \
      -c 2048 --host 0.0.0.0 --port 8080 --n-gpu-layers 35
    ```
    Adjust volume paths, model name, context size (`-c`), and GPU layers (`--n-gpu-layers`) as needed.

2.  Configure twinny provider settings:
    - **Hostname**: `localhost`
    - **Port**: `8080` (or the port you configured)
    - **Path**: `/completion` (Llama.cpp's native completion endpoint)
    - **FIM Template**: Select a template matching your model (e.g., `codellama` for Codellama GGUF files).

#### Chat

Chat performance and compatibility with Llama.cpp's server can vary. The `/completion` endpoint is often used, but may not behave like a standard OpenAI chat API.
- **Hostname**: `localhost`
- **Port**: `8080` (or the port you configured)
- **Path**: `/completion`
- **Model Name**: e.g., a GGUF instruct model file name.

If you achieve good results with chat, please consider [sharing your configuration](https://github.com/rjmacarthy/twinny/issues).

### Oobabooga Text Generation WebUI

To enable the API, start Oobabooga Text Generation WebUI with the `--api` flag. For example:
```bash
bash start_linux.sh --api --listen --listen-port 7860 --api-port 5000
```
Ensure you load a model in the WebUI.

#### Code Completion

- **Hostname**: `localhost`
- **Port**: `5000` (or your configured API port)
- **Path**: `/v1/completions` (OpenAI-compatible completion endpoint)
- **Model Name**: The model loaded in Oobabooga (e.g., `CodeLlama-7B-GGUF`). This may not be strictly required if Oobabooga uses the currently loaded model by default for API requests.
- **FIM Template**: Select a template matching your model.

#### Chat

- **Hostname**: `localhost`
- **Port**: `5000` (or your configured API port)
- **Path**: `/v1/chat/completions` (OpenAI-compatible chat endpoint)
- **Model Name**: The model loaded in Oobabooga.

> **Note**: Historically, chat functionality with Oobabooga's API has had mixed reports of success and stability. Ensure you are using a recent version of Oobabooga and an appropriate model.

### Symmetry (via twinny extension button)

Symmetry is a distributed network providing access to computational resources and AI models. twinny offers a simplified way to connect to this network.

#### Connecting to Symmetry

1.  In the twinny extension settings, choose your desired model from the list of models available via Symmetry.
2.  Click the "Connect to Symmetry" button located within the twinny extension interface.
3.  twinny will then automatically handle the connection to the Symmetry network for the selected model.

This method allows for easy access to the Symmetry network without needing to manually configure hostname, port, or path.

> **Important Considerations for Symmetry**:
> - Your requests are processed by other nodes within the peer-to-peer Symmetry network.
> - Be mindful of data sensitivity when using any distributed or third-party network.
> - The availability and performance of models can vary depending on the network state.
> - For more details on Symmetry itself, refer to the [Symmetry documentation](/general/symmetry).

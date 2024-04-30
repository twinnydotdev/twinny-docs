---
title: Inference providers
description: Inference providers are a way to connect Twinny with external models and services. 
---

These example configurations serve as a starting point. Individual adjustments may be required depending on your specific hardware and software environments.


> Note: Twinny chat (not auto-complete) should be compatible with any API which adheres to the OpenAI API specification.


### Ollama (recommended and configured by default)

#### Auto-complete

- **Hostname:** `localhost`
- **Port:** `11434`
- **Path:** `/api/generate`
- **Model Name:** `codellama:7b-code`
- **FIM Template:** `codellama`

#### Chat

- **Hostname:** `localhost`
- **Port:** `11434`
- **Path:** `/v1/chat/completions`
- **Model Name:** `codellama:7b-instruct` 

### Open WebUI using Ollama

Open WebUI can be used a proxy Ollama, simply configure the endpoint to match what is served by OpenWeb UI.

#### Auto-complete

- **Hostname:** `localhost`
- **Port:** The port OpenWebUI is serving, typically `8080` or `3000`.
- **Path:** `/ollama/api/generate`
- **Model Name:** `codellama:7b-code`
- **FIM Template:** Select a template that matches the model, such as `codellama` for `codellama:7b-code` or `deepseek` for `deepseek-coder`.

#### Chat

- **Hostname:** `localhost`
- **Port:** The port OpenWebUI is serving, typically `8080` or `3000`.
- **Path:** `/ollama/v1/chat/completions`
- **Model Name:** `codellama:7b-instruct` or any effective instruct model.

### LM Studio

#### Auto-complete

- **Hostname:** `localhost`
- **Port:** `1234`
- **Path:** `/v1/completions`
- **Model Name:** Base model such as `codellama-7b.Q5_K_M.gguf`
- **LM Studio Preset:** CodeLlama Completion
- **FIM Template:** Select a template that matches the model, such as `codellama` for `CodeLlama-7B-GGUF` or `deepseek` for `deepseek-coder:6.7b-base-q5_K_M`.
  
#### Chat

- **Hostname:** `localhost`
- **Port:** `1234`
- **Path:** `/v1/chat/completions`
- **Model Name:** `codellama:7b-instruct` or your preferred instruct model.
- **LM Studio Preset:** Default or `CodeLlama Instruct`

### LiteLLM

#### Auto-complete

LiteLLM technically supports auto-complete using the `custom-template` FIM template, and by editing the `fim.hbs` file, however result will vary depending on your model and setup.

#### Chat

- **Hostname:** `localhost`
- **Port:** `4000`
- **Path:** `/v1/chat/completions`

Start LiteLLM with the following command:

```bash
litellm --model gpt-4-turbo
```

### Llama.cpp

#### Auto-complete

Start Llama.cpp in the terminal with this Docker command:

For example using Docker and `codellama-7b.Q5_K_M.gguf`

```bash
docker run -p 8080:8080 --gpus all --network bridge -v /path/to/your/models:/models local/llama.cpp:full-cuda --server -m /models/codellama-7b.Q5_K_M.gguf -c 2048 -ngl 43 -mg 1 --port 8080 --host 0.0.0.0
```

Configure your provider settings as follows:

- **Hostname:** `localhost`
- **Port:** `8080`
- **Path:** `/completion`
- **FIM Template:** Select a template that matches the model, such as `codellama` for `CodeLlama-7B-GGUF` or `deepseek` for `deepseek-coder:6.7b-base-q5_K_M`.

#### Chat

The performance of chat functionalities with Llama.cpp has been mixed. If you obtain favorable results, please share them by opening an issue or a pull request.

- **Hostname:** `localhost`
- **Port:** `8080`
- **Path:** `/completion`
- **Model Name:** `CodeLlama-7B-GGUF` or any other strong instruct model.


### Oobabooga

```bash
bash start_linux.sh --api --listen
```

#### Auto-complete

Navigate to `http://0.0.0.0:7860/` and load your model:

- **Hostname:** `localhost`
- **Port:** `5000`
- **Path:** `/v1/completions`
- **Model Name:** `CodeLlama-7B-GGUF` or another effective instruct model.
- **FIM Template:** Select a template that matches the model, such as `codellama` for `CodeLlama-7B-GGUF` or `deepseek` for `deepseek-coder:6.7b-base-q5_K_M`.

#### Chat

Chat functionality has not been successful on Linux with Oobabooga:

- **Hostname:** `localhost`
- **Port:** `5000`
- **Path:** `/v1/chat/completions`
- **Model Name:** `CodeLlama-7B-GGUF`
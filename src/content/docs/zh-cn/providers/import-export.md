---
title: 导入与导出
description: 在机器之间迁移提供者配置。
---

提供者标签页有**导出**和**导入**按钮，以 JSON 文件迁移整个提供者列表。可用于设置第二台机器、共享团队配置或备份。

## 导出

**导出**询问保存位置，并把所有提供者写成一个以提供者 id 为键的 JSON 对象：

```json
{
  "b2c1…": {
    "id": "b2c1…",
    "label": "Ollama",
    "type": "chat",
    "provider": "ollama",
    "modelName": "qwen2.5-coder:7b-instruct",
    "apiHostname": "localhost",
    "apiPort": 11434,
    "apiProtocol": "http",
    "apiPath": "/v1",
    "apiKey": ""
  },
  "9f0e…": {
    "id": "9f0e…",
    "label": "Ollama FIM",
    "type": "fim",
    "provider": "ollama",
    "modelName": "qwen2.5-coder:1.5b-base",
    "apiHostname": "localhost",
    "apiPort": 11434,
    "apiProtocol": "http",
    "apiPath": "/api/generate",
    "apiKey": "",
    "fimTemplate": "automatic"
  }
}
```

**导出包含 API 密钥。** 请把文件当作机密对待，或在分享前清空 `apiKey` 字段。

## 导入

**导入**询问文件，接受导出的对象或普通的提供者数组。每个条目按表单同样的方式规范化和校验（端口转为数字、粘贴的 URL 拆分、路径补上前导斜杠、不适用于该类型的字段丢弃）；仍不通过校验的条目被跳过，通知会说明导入和跳过的数量。

id 会保留，因此再次导入同一文件会**更新**匹配的提供者而不是重复添加。文件中有而本机没有的提供者会被添加；本机有而文件中没有的保持不变。

## 字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `id` | | 任意唯一字符串。缺失时生成 |
| `label` | ✓ | 显示名称 |
| `type` | ✓ | `chat`、`fim` 或 `embedding` |
| `provider` | ✓ | `ollama`、`lmstudio`、`llamacpp`、`oobabooga`、`litellm`、`openwebui`、`openai-compatible`、`openai`、`anthropic`、`mistral`、`groq`、`openrouter`、`cohere`、`perplexity`、`gemini`、`deepseek` 或 `twinny-p2p` |
| `modelName` | ✓ | |
| `apiHostname` | 端点类提供者必填 | 仅主机名 |
| `apiPort` | | 数字 |
| `apiProtocol` | | `http` 或 `https` |
| `apiPath` | | 对话为基路径，其他为完整路由 |
| `apiKey` | 托管 API 必填 | |
| `fimTemplate` | 仅 fim | `automatic`、`codellama`、`deepseek`、`codeqwen`、`codestral`、`codegemma`、`stable-code`、`starcoder`、`llama` 或 `custom-template` |
| `deviceId` | 仅 twinny-p2p | 已配对设备的公钥。设备提供者只在与该设备配对过的机器上可用 |

## 提供者保存在哪里

默认保存在该 VS Code 安装的全局状态中。把 `twinny.providerStorageLocation` 设为 `file` 可改为保存在扩展全局存储目录中的 JSON 文件里；它不受全局状态重置影响，也更容易备份。切换前先导出你想保留的提供者，切换后再导入。

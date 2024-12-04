const id = "zh-cn/general/supported-models.md";
						const collection = "docs";
						const slug = "zh-cn/general/supported-models";
						const body = "\nTwinny 是一个可配置的扩展/接口，这意味着许多模型在技术上都可以被支持。然而，并非所有模型在某些场景下都能与 Twinny 良好配合。以下是已测试并与 Twinny 配合良好的模型列表。如果您发现某个模型有效但未列出，请告知我们，我们会将其添加到列表中，或者您也可以提交 pull request 来添加它。\n\n### 聊天模型\n\n理论上，任何经过训练用于指令的聊天模型都能与 Twinny 配合使用。以下是一些推荐用于聊天的模型示例。\n\n\n- [`llama3.1`](https://ollama.com/library/llama3.1)\n- [`codellama:7b-instruct`](https://ollama.com/library/codellama:instruct)\n- [`phind-codellama`](https://ollama.com/library/phind-codellama)\n- [`mistral`](https://ollama.com/library/mistral)\n- [`qwen2.5-coder`](https://ollama.com/library/qwen2.5-coder:7b-instruct)\n- [`codestral`](https://ollama.com/library/codestral)\n\n### 填充中间部分模型\n\n由于训练数据的原因，只有某些模型支持填充中间部分。以下是一些推荐用于填充中间部分的模型示例。如果您发现某个模型有效但未列出，请告知我们，我们会将其添加到列表中，或者您也可以提交 pull request 来添加它。\n\n#### Qwen2.5-coder 模型\n\n- [`qwen2.5-coder:7b-base`](https://ollama.com/library/qwen2.5-coder:7b-base)\n\n#### Codellama 模型\n\n`code` 版本的 Codellama 模型。\n\n- [`codellama:code`](https://ollama.com/library/codellama:code)\n- [`codellama:13b-code`](https://ollama.com/library/codellama:13b-code)\n\n注意：`codellama:34b` 版本在填充中间部分时效果不佳。\n\n#### Deepseek Coder 模型\n\n`base` 版本的 Deepseek-Coder 模型。\n\n- [`deepseek-coder:base`](https://ollama.com/library/deepseek-coder:base)\n\n注意：非 `base` 版本的模型在填充中间部分时效果不佳。\n\n#### Starcoder 模型\n\n`base` 版本的 Starcoder 模型。默认和基础模型相同。\n\n- [`starcoder`](https://ollama.com/library/starcoder)\n- [`starcoder2`](https://ollama.com/library/starcoder2)\n\n注意：Starcoder2 在完成时并不总是会停止。通过降低温度并增加重复惩罚可以缓解这一问题。\n\n使用 [Starcoder2 7b](https://ollama.com/library/starcoder2:7b) 获得最佳效果。\n\n#### Stablecode 模型\n\n`code` 版本的 Stablecode 模型。\n\n- [`stable-code:3b-code`](https://ollama.com/library/stable-code:3b-code)\n\n#### Codegemma 模型\n\n`code` 版本的 Codegemma 模型。\n\n- [`codegemma`](https://ollama.com/library/codegemma:7b-code)\n\n注意：Codegemma 在完成时并不总是会停止。通过降低温度并增加重复惩罚可以缓解这一问题。";
						const data = {title:"支持的模型",description:"Twinny 支持的模型列表",editUrl:true,head:[],template:"doc",sidebar:{hidden:false,attrs:{}},pagefind:true};
						const _internal = {
							type: 'content',
							filePath: "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/supported-models.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };

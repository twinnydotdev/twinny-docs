const id = "zh-cn/general/chat.md";
						const collection = "docs";
						const slug = "zh-cn/general/chat";
						const body = "\n与 Twinny 聊天，并利用工作区嵌入以增强上下文。\n\n### 打开侧边栏\n\n要使用 Twinny 聊天，可以通过 VSCode 侧边栏访问。Twinny 会在会话之间保留聊天历史记录。您可以通过点击顶部面板上的“历史”图标来查看聊天历史。\n\n### 上下文与代码选择\n\n当您在编辑器中高亮/选择代码时，Twinny 会将其作为聊天消息的上下文。如果您没有选择任何代码，它将仅使用消息本身以及之前的消息。您也可以右键点击选中的代码，选择 Twinny 选项来进行重构、解释或执行其他操作。\n\n### 工作区嵌入\n\nTwinny 现在支持工作区嵌入，以便为您的查询提供更相关的上下文。\n\n### RAG 和提及的工作原理\n\n1. 当您点击“嵌入工作区文档”按钮时，您的工作区文档会被嵌入并存储。\n2. 当您发送消息时，Twinny 会查找与嵌入相关的块。\n3. 这些块会被重新排序并作为查询的附加上下文。\n4. 在聊天中使用 `@workspace` 提及来搜索相关文档。\n5. 使用 `@problems` 来获取代码问题。\n6. 使用 `@` 来为工作区中特定的文件添加上下文。\n\n### 嵌入设置\n\n- **嵌入提供商**：默认情况下，Twinny 使用 Ollama 嵌入（all-minilm:latest）进行嵌入。\n- **提供商详情**：\n  - 标签：Ollama Embedding\n  - 提供商：ollama\n  - 类型：embedding\n  - 主机名：0.0.0.0\n  - 路径：/v1/embeddings\n  - 协议：http\n  - 端口：11434\n\n您可以更新这些设置，以使用不同的嵌入提供商。如果需要，理论上大多数提供商应该都能正常工作，只要它们返回正确的数据结构。\n\n对于像 OpenAI 这样的 HTTPS 提供商，需要一个本地代理（如 LiteLLM）才能正常工作。\n\n### 重新排序概率阈值\n\n您可以调整重新排序概率阈值（默认值：0.14），以控制哪些结果将被包括作为上下文。较低的阈值意味着更有可能包含更多的结果。\n\n### 切换上下文\n\n带有线条的数据库图标允许您为每条消息开启或关闭嵌入上下文的使用。\n\n### 嵌入工作区文档\n\n要将您的工作区文档包括在嵌入中，请在设置面板中使用“嵌入工作区文档”按钮。\n";
						const data = {title:"对话",description:"与 Twinny 对话",editUrl:true,head:[],template:"doc",sidebar:{hidden:false,attrs:{}},pagefind:true};
						const _internal = {
							type: 'content',
							filePath: "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/chat.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };

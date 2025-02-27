const id = "zh-cn/general/quick-start.md";
						const collection = "docs";
						const slug = "zh-cn/general/quick-start";
						const body = "\n## 前提条件\n\n在开始使用 Twinny 之前，您需要访问推理提供商。推理提供商是本地或云托管的服务器，用于运行 AI 模型。\n\n推荐的方式是使用 [Ollama](https://ollama.com/)。Ollama 可以轻松地在本地运行您的模型，并将它们暴露为兼容 OpenAI 的 API。性能将取决于您的硬件和所选择的模型，更多信息请参阅 Ollama 的文档。\n\n## 安装扩展\n\n1. 在 [Visual Studio Code 扩展市场](https://marketplace.visualstudio.com/items?itemName=rjmacarthy.twinny) 或 VSCodium 的 [扩展市场](https://open-vsx.org/extension/rjmacarthy/twinny) 中安装 Twinny 扩展。\n\n## 安装 Ollama 作为推理提供商\n\n1. 访问 [安装 Ollama](https://ollama.com/)，并按照说明在您的机器上安装 Ollama。\n2. 从 Ollama 提供的模型列表中选择一个模型。两个推荐的入门模型是 [codellama:7b-instruct](https://ollama.com/library/codellama:instruct) 用于聊天和 [codellama:7b-code](https://ollama.com/library/codellama:code) 用于填充中间部分。更多选项请参阅 [支持的模型页面](/twinny-docs/zh-cn/general/supported-models/)。\n\n```sh\nollama run codellama:7b-instruct\nollama run codellama:7b-code\n```\n\n安装完扩展和 Ollama 后，您可以开始使用 Twinny。\n\n1. 打开 VS Code（如果已打开，安装后可能需要重启），在侧边面板中查找 Twinny 图标。\n\n您还应看到 🤖 图标，表示 Twinny 已准备就绪。当 Twinny 正在向推理提供商发起请求时，图标会变成旋转的加载标志。\n";
						const data = {title:"快速入门",description:"Twinny 使用快速入门指南",editUrl:true,head:[],template:"doc",sidebar:{hidden:false,attrs:{}},pagefind:true};
						const _internal = {
							type: 'content',
							filePath: "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/quick-start.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };

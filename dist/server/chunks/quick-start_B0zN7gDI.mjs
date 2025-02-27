const id = "general/quick-start.md";
						const collection = "docs";
						const slug = "general/quick-start";
						const body = "\n## Prerequisites\n\nBefore you start using twinny you need to have access to an inference provider.  An inference provider is a local or cloud hosted server that runs the AI models.\n\nThe recommended way to do this is to use [Ollama](https://ollama.com/).  Ollama makes it easy to run your models locally and exposes them as an OpenAI compatible API.  Performance will depend on your hardware and chosen model, see Ollama's documentation for more information.\n\n## Installing the extension\n\n1. Install the Visual Studio Code extension [here](https://marketplace.visualstudio.com/items?itemName=rjmacarthy.twinny) or for VSCodium [here](https://open-vsx.org/extension/rjmacarthy/twinny).\n\n## Installing Ollama as an inference provider\n\n1. Visit [Install Ollama](https://ollama.com/) and follow the instructions to install Ollama on your machine.\n2. Choose a model from the list of models available on Ollama.  Two recommended models to get started are [codellama:7b-instruct](https://ollama.com/library/codellama:instruct) for chat and [codellama:7b-code](https://ollama.com/library/codellama:code) for fill-in-middle.  See the [Supported models page](/twinny-docs/general/supported-models/) for more options.\n\n```sh\nollama run codellama:7b-instruct\nollama run codellama:7b-code\n```\n\nOnce both the extension and Ollama are installed you can start using twinny.\n\n1. Open VS code (if already open a restart might be needed after install) and look for the twinny icon in the side panel.\n\nYou should also see the 🤖 icon indicating that twinny is ready to use. The icon will change to a spinner when twinny is making a call to the inference provider.\n";
						const data = {title:"Quick start",description:"A quick start guide for using twinny.",editUrl:true,head:[],template:"doc",sidebar:{hidden:false,attrs:{}},pagefind:true};
						const _internal = {
							type: 'content',
							filePath: "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/quick-start.md",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };

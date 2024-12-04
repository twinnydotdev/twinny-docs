const id = "index.mdx";
						const collection = "docs";
						const slug = "index";
						const body = "\nimport { Card, CardGrid, LinkCard } from \"@astrojs/starlight/components\";\n\n## Learn More\n\n<CardGrid stagger>\n  <LinkCard\n    title=\"Getting Started\"\n    description=\"A quick start guide for using twinny\"\n    href=\"/general/quick-start\"\n  />\n  <LinkCard\n    title=\"Inference Providers\"\n    href=\"/general/providers\"\n    description=\"Learn how to use an inference provider with twinny\"\n  ></LinkCard>\n  <LinkCard\n    title=\"Supported Models\"\n    description=\"Learn about the supported AI models\"\n    href=\"/general/supported-models\"\n  ></LinkCard>\n  <LinkCard\n    title=\"Symmetry\"\n    description=\"The distributed AI inference network\"\n    href=\"/general/symmetry\"\n  ></LinkCard>\n</CardGrid>\n\n## Main Features\n\n<CardGrid stagger>\n  <Card title=\"Code Completion\" icon=\"seti:json\">\n    twinny provides autocomplete suggestions for your code\n  </Card>\n  <Card title=\"Chat with AI\" icon=\"pencil\">\n    twinny provides a chat interface to interact with your personal AI\n  </Card>\n</CardGrid>\n";
						const data = {title:"Welcome to twinny",description:"The free and private AI extension for Visual Studio Code. Auto-complete suggestions, chat with AI and more.",editUrl:true,head:[],template:"splash",hero:{title:"twinny\n",tagline:"The free and private AI extension for Visual Studio Code. Auto-complete suggestions, chat with AI and more.\n",image:{alt:"",file:
						new Proxy({"src":"/_astro/twinny.Bt_Wmo1-.svg","width":157.3401,"height":135.14787,"format":"svg","fsPath":"/home/richard/Desktop/twinny/twinny-docs/src/assets/twinny.svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/richard/Desktop/twinny/twinny-docs/src/assets/twinny.svg";
							}
							
							return target[name];
						}
					})
					},actions:[{text:"Getting Started",link:"/general/quick-start",variant:"secondary",icon:{type:"icon",name:"right-arrow"}}]},sidebar:{hidden:false,attrs:{}},pagefind:true};
						const _internal = {
							type: 'content',
							filePath: "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/index.mdx",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };

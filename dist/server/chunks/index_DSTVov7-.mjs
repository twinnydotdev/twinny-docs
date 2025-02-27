const id = "zh-cn/index.mdx";
						const collection = "docs";
						const slug = "zh-cn";
						const body = "\nimport { Card, CardGrid, LinkCard } from \"@astrojs/starlight/components\";\n\n## 了解更多\n\n<CardGrid stagger>\n  <LinkCard\n    title=\"快速开始\"\n    description=\"一个针对使用 twinny 的快速入门指南\"\n    href=\"/zh-cn/general/quick-start\"\n  />\n  <LinkCard\n    title=\"推理提供者\"\n    description=\"了解如何在 twinny 中使用推理提供者\"\n    href=\"/zh-cn/general/providers\"\n  ></LinkCard>\n  <LinkCard\n    title=\"支持的模型\"\n    description=\"了解 twinny 支持的 AI 模型\"\n    href=\"/zh-cn/general/supported-models\"\n  ></LinkCard>\n  <LinkCard\n    title=\"Symmetry\"\n    description=\"去中心化的 AI 推理网络\"\n    href=\"/zh-cn/general/symmetry\"\n  ></LinkCard>\n</CardGrid>\n\n## 主要功能\n\n<CardGrid stagger>\n  <Card title=\"代码补全\" icon=\"seti:json\">\n    twinny 为你的代码提供自动补全建议\n  </Card>\n  <Card title=\"Chat with AI\" icon=\"pencil\">\n    twinny 提供一个聊天界面来与私人 AI 互动\n  </Card>\n</CardGrid>\n";
						const data = {title:"欢迎来到 twinny",description:"Visual Studio Code 的免费私有 AI 扩展。有自动补全代码、与 AI 对话等功能。",editUrl:true,head:[],template:"splash",hero:{title:"twinny\n",tagline:"Visual Studio Code 的免费私有 AI 扩展。有自动补全代码、与 AI 对话等功能。\n",image:{alt:"",file:
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
					},actions:[{text:"开始使用",link:"/zh-cn/general/quick-start",variant:"secondary",icon:{type:"icon",name:"right-arrow"}}]},sidebar:{hidden:false,attrs:{}},pagefind:true};
						const _internal = {
							type: 'content',
							filePath: "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/index.mdx",
							rawData: undefined,
						};

export { _internal, body, collection, data, id, slug };

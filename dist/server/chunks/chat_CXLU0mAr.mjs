import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_D8JpLML5.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';

const html = "<p>与 Twinny 聊天，并利用工作区嵌入以增强上下文。</p>\n<h3 id=\"打开侧边栏\">打开侧边栏</h3>\n<p>要使用 Twinny 聊天，可以通过 VSCode 侧边栏访问。Twinny 会在会话之间保留聊天历史记录。您可以通过点击顶部面板上的“历史”图标来查看聊天历史。</p>\n<h3 id=\"上下文与代码选择\">上下文与代码选择</h3>\n<p>当您在编辑器中高亮/选择代码时，Twinny 会将其作为聊天消息的上下文。如果您没有选择任何代码，它将仅使用消息本身以及之前的消息。您也可以右键点击选中的代码，选择 Twinny 选项来进行重构、解释或执行其他操作。</p>\n<h3 id=\"工作区嵌入\">工作区嵌入</h3>\n<p>Twinny 现在支持工作区嵌入，以便为您的查询提供更相关的上下文。</p>\n<h3 id=\"rag-和提及的工作原理\">RAG 和提及的工作原理</h3>\n<ol>\n<li>当您点击“嵌入工作区文档”按钮时，您的工作区文档会被嵌入并存储。</li>\n<li>当您发送消息时，Twinny 会查找与嵌入相关的块。</li>\n<li>这些块会被重新排序并作为查询的附加上下文。</li>\n<li>在聊天中使用 <code dir=\"auto\">@workspace</code> 提及来搜索相关文档。</li>\n<li>使用 <code dir=\"auto\">@problems</code> 来获取代码问题。</li>\n<li>使用 <code dir=\"auto\">@</code> 来为工作区中特定的文件添加上下文。</li>\n</ol>\n<h3 id=\"嵌入设置\">嵌入设置</h3>\n<ul>\n<li><strong>嵌入提供商</strong>：默认情况下，Twinny 使用 Ollama 嵌入（all-minilm:latest\n）进行嵌入。</li>\n<li><strong>提供商详情</strong>：\n<ul>\n<li>标签：Ollama Embedding</li>\n<li>提供商：ollama</li>\n<li>类型：embedding</li>\n<li>主机名：0.0.0.0</li>\n<li>路径：/v1/embeddings</li>\n<li>协议：http</li>\n<li>端口：11434</li>\n</ul>\n</li>\n</ul>\n<p>您可以更新这些设置，以使用不同的嵌入提供商。如果需要，理论上大多数提供商应该都能正常工作，只要它们返回正确的数据结构。</p>\n<p>对于像 OpenAI 这样的 HTTPS 提供商，需要一个本地代理（如 LiteLLM）才能正常工作。</p>\n<h3 id=\"重新排序概率阈值\">重新排序概率阈值</h3>\n<p>您可以调整重新排序概率阈值（默认值：0.14），以控制哪些结果将被包括作为上下文。较低的阈值意味着更有可能包含更多的结果。</p>\n<h3 id=\"切换上下文\">切换上下文</h3>\n<p>带有线条的数据库图标允许您为每条消息开启或关闭嵌入上下文的使用。</p>\n<h3 id=\"嵌入工作区文档\">嵌入工作区文档</h3>\n<p>要将您的工作区文档包括在嵌入中，请在设置面板中使用“嵌入工作区文档”按钮。</p>";

				const frontmatter = {"title":"对话","description":"与 Twinny 对话"};
				const file = "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/chat.md";
				const url = undefined;
				function rawContent() {
					return "\n与 Twinny 聊天，并利用工作区嵌入以增强上下文。\n\n### 打开侧边栏\n\n要使用 Twinny 聊天，可以通过 VSCode 侧边栏访问。Twinny 会在会话之间保留聊天历史记录。您可以通过点击顶部面板上的“历史”图标来查看聊天历史。\n\n### 上下文与代码选择\n\n当您在编辑器中高亮/选择代码时，Twinny 会将其作为聊天消息的上下文。如果您没有选择任何代码，它将仅使用消息本身以及之前的消息。您也可以右键点击选中的代码，选择 Twinny 选项来进行重构、解释或执行其他操作。\n\n### 工作区嵌入\n\nTwinny 现在支持工作区嵌入，以便为您的查询提供更相关的上下文。\n\n### RAG 和提及的工作原理\n\n1. 当您点击“嵌入工作区文档”按钮时，您的工作区文档会被嵌入并存储。\n2. 当您发送消息时，Twinny 会查找与嵌入相关的块。\n3. 这些块会被重新排序并作为查询的附加上下文。\n4. 在聊天中使用 `@workspace` 提及来搜索相关文档。\n5. 使用 `@problems` 来获取代码问题。\n6. 使用 `@` 来为工作区中特定的文件添加上下文。\n\n### 嵌入设置\n\n- **嵌入提供商**：默认情况下，Twinny 使用 Ollama 嵌入（all-minilm:latest）进行嵌入。\n- **提供商详情**：\n  - 标签：Ollama Embedding\n  - 提供商：ollama\n  - 类型：embedding\n  - 主机名：0.0.0.0\n  - 路径：/v1/embeddings\n  - 协议：http\n  - 端口：11434\n\n您可以更新这些设置，以使用不同的嵌入提供商。如果需要，理论上大多数提供商应该都能正常工作，只要它们返回正确的数据结构。\n\n对于像 OpenAI 这样的 HTTPS 提供商，需要一个本地代理（如 LiteLLM）才能正常工作。\n\n### 重新排序概率阈值\n\n您可以调整重新排序概率阈值（默认值：0.14），以控制哪些结果将被包括作为上下文。较低的阈值意味着更有可能包含更多的结果。\n\n### 切换上下文\n\n带有线条的数据库图标允许您为每条消息开启或关闭嵌入上下文的使用。\n\n### 嵌入工作区文档\n\n要将您的工作区文档包括在嵌入中，请在设置面板中使用“嵌入工作区文档”按钮。\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":3,"slug":"打开侧边栏","text":"打开侧边栏"},{"depth":3,"slug":"上下文与代码选择","text":"上下文与代码选择"},{"depth":3,"slug":"工作区嵌入","text":"工作区嵌入"},{"depth":3,"slug":"rag-和提及的工作原理","text":"RAG 和提及的工作原理"},{"depth":3,"slug":"嵌入设置","text":"嵌入设置"},{"depth":3,"slug":"重新排序概率阈值","text":"重新排序概率阈值"},{"depth":3,"slug":"切换上下文","text":"切换上下文"},{"depth":3,"slug":"嵌入工作区文档","text":"嵌入工作区文档"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };

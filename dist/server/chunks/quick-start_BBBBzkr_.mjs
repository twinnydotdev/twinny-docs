import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_D8JpLML5.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';

const html = "<h2 id=\"前提条件\">前提条件</h2>\n<p>在开始使用 Twinny 之前，您需要访问推理提供商。推理提供商是本地或云托管的服务器，用于运行 AI 模型。</p>\n<p>推荐的方式是使用 <a href=\"https://ollama.com/\">Ollama</a>。Ollama 可以轻松地在本地运行您的模型，并将它们暴露为兼容 OpenAI 的 API。性能将取决于您的硬件和所选择的模型，更多信息请参阅 Ollama 的文档。</p>\n<h2 id=\"安装扩展\">安装扩展</h2>\n<ol>\n<li>在 <a href=\"https://marketplace.visualstudio.com/items?itemName=rjmacarthy.twinny\">Visual Studio Code 扩展市场</a> 或 VSCodium 的 <a href=\"https://open-vsx.org/extension/rjmacarthy/twinny\">扩展市场</a> 中安装 Twinny 扩展。</li>\n</ol>\n<h2 id=\"安装-ollama-作为推理提供商\">安装 Ollama 作为推理提供商</h2>\n<ol>\n<li>访问 <a href=\"https://ollama.com/\">安装 Ollama</a>，并按照说明在您的机器上安装 Ollama。</li>\n<li>从 Ollama 提供的模型列表中选择一个模型。两个推荐的入门模型是 <a href=\"https://ollama.com/library/codellama:instruct\">codellama:7b-instruct</a> 用于聊天和 <a href=\"https://ollama.com/library/codellama:code\">codellama:7b-code</a> 用于填充中间部分。更多选项请参阅 <a href=\"/twinny-docs/zh-cn/general/supported-models/\">支持的模型页面</a>。</li>\n</ol>\n<div class=\"expressive-code\"><link rel=\"stylesheet\" href=\"/_astro/ec.d6kn2.css\"><script type=\"module\" src=\"/_astro/ec.dy9ns.js\"></script><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre tabindex=\"0\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#82AAFF;--1:#3C63B3\">ollama</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#ECC48D;--1:#3C63B3\">run</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#ECC48D;--1:#3C63B3\">codellama:7b-instruct</span></div></div><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#82AAFF;--1:#3C63B3\">ollama</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#ECC48D;--1:#3C63B3\">run</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#ECC48D;--1:#3C63B3\">codellama:7b-code</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"ollama run codellama:7b-instructollama run codellama:7b-code\"><div></div></button></div></figure></div>\n<p>安装完扩展和 Ollama 后，您可以开始使用 Twinny。</p>\n<ol>\n<li>打开 VS Code（如果已打开，安装后可能需要重启），在侧边面板中查找 Twinny 图标。</li>\n</ol>\n<p>您还应看到 🤖 图标，表示 Twinny 已准备就绪。当 Twinny 正在向推理提供商发起请求时，图标会变成旋转的加载标志。</p>";

				const frontmatter = {"title":"快速入门","description":"Twinny 使用快速入门指南"};
				const file = "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/quick-start.md";
				const url = undefined;
				function rawContent() {
					return "\n## 前提条件\n\n在开始使用 Twinny 之前，您需要访问推理提供商。推理提供商是本地或云托管的服务器，用于运行 AI 模型。\n\n推荐的方式是使用 [Ollama](https://ollama.com/)。Ollama 可以轻松地在本地运行您的模型，并将它们暴露为兼容 OpenAI 的 API。性能将取决于您的硬件和所选择的模型，更多信息请参阅 Ollama 的文档。\n\n## 安装扩展\n\n1. 在 [Visual Studio Code 扩展市场](https://marketplace.visualstudio.com/items?itemName=rjmacarthy.twinny) 或 VSCodium 的 [扩展市场](https://open-vsx.org/extension/rjmacarthy/twinny) 中安装 Twinny 扩展。\n\n## 安装 Ollama 作为推理提供商\n\n1. 访问 [安装 Ollama](https://ollama.com/)，并按照说明在您的机器上安装 Ollama。\n2. 从 Ollama 提供的模型列表中选择一个模型。两个推荐的入门模型是 [codellama:7b-instruct](https://ollama.com/library/codellama:instruct) 用于聊天和 [codellama:7b-code](https://ollama.com/library/codellama:code) 用于填充中间部分。更多选项请参阅 [支持的模型页面](/twinny-docs/zh-cn/general/supported-models/)。\n\n```sh\nollama run codellama:7b-instruct\nollama run codellama:7b-code\n```\n\n安装完扩展和 Ollama 后，您可以开始使用 Twinny。\n\n1. 打开 VS Code（如果已打开，安装后可能需要重启），在侧边面板中查找 Twinny 图标。\n\n您还应看到 🤖 图标，表示 Twinny 已准备就绪。当 Twinny 正在向推理提供商发起请求时，图标会变成旋转的加载标志。\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"前提条件","text":"前提条件"},{"depth":2,"slug":"安装扩展","text":"安装扩展"},{"depth":2,"slug":"安装-ollama-作为推理提供商","text":"安装 Ollama 作为推理提供商"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };

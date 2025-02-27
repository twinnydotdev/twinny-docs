import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_D8JpLML5.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';

const html = "<p>要使用 Twinny 自动补全代码片段，只需在编辑器中开始输入，Twinny 就会为您自动补全。这与 GitHub Copilot 的工作方式非常相似。</p>\n<p>如果您希望手动触发代码补全，可以在设置菜单中关闭自动内联代码补全（该菜单位于 Twinny 侧边面板顶部），然后使用快捷键 <code dir=\"auto\">ALT+\\</code> 来触发代码补全。</p>\n<p>GitHub Copilot 和 Twinny 使用相同的快捷键，因此它们可能会互相干扰。如有需要，请启用或禁用相关快捷键。</p>\n<p>有关填充中间补全的支持模型，请参阅<a href=\"/twinny-docs/general/supported-models/\">支持的模型页面</a></p>";

				const frontmatter = {"title":"自动补全","description":"自动补全"};
				const file = "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/fill-in-middle.md";
				const url = undefined;
				function rawContent() {
					return "\n要使用 Twinny 自动补全代码片段，只需在编辑器中开始输入，Twinny 就会为您自动补全。这与 GitHub Copilot 的工作方式非常相似。\n\n如果您希望手动触发代码补全，可以在设置菜单中关闭自动内联代码补全（该菜单位于 Twinny 侧边面板顶部），然后使用快捷键 `ALT+\\` 来触发代码补全。\n\nGitHub Copilot 和 Twinny 使用相同的快捷键，因此它们可能会互相干扰。如有需要，请启用或禁用相关快捷键。\n\n有关填充中间补全的支持模型，请参阅[支持的模型页面](/twinny-docs/general/supported-models/)\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };

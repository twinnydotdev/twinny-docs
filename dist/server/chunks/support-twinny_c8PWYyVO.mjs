import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_D8JpLML5.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';

const html = "<p>感谢您使用 Twinny！</p>\n<p>该项目将始终是免费且开源的。如果您觉得它对您有所帮助，请考虑通过小额捐赠来表达您的感谢 &#x3C;3</p>\n<p>请将比特币捐赠发送至：</p>\n<p><code dir=\"auto\">1PVavNkMmBmUz8nRYdnVXiTgXrAyaxfehj</code></p>";

				const frontmatter = {"title":"支持 Twinny","description":"通过捐赠支持 Twinny 项目"};
				const file = "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/support-twinny.md";
				const url = undefined;
				function rawContent() {
					return "\n感谢您使用 Twinny！\n\n该项目将始终是免费且开源的。如果您觉得它对您有所帮助，请考虑通过小额捐赠来表达您的感谢 <3\n\n请将比特币捐赠发送至：\n\n`1PVavNkMmBmUz8nRYdnVXiTgXrAyaxfehj`\n";
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

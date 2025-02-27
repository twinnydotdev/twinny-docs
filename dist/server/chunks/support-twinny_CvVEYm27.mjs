import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_D8JpLML5.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';

const html = "<p>Thanks for using twinny!</p>\n<p>This project is and will always be free and open source. If you find it helpful, please consider showing your appreciation with a small donation &#x3C;3</p>\n<p>Please send Bitcoin to:</p>\n<p><code dir=\"auto\">1PVavNkMmBmUz8nRYdnVXiTgXrAyaxfehj</code></p>";

				const frontmatter = {"title":"Support twinny","description":"Support twinny by donating to the project."};
				const file = "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/support-twinny.md";
				const url = undefined;
				function rawContent() {
					return "\nThanks for using twinny!\n\nThis project is and will always be free and open source. If you find it helpful, please consider showing your appreciation with a small donation <3\n\nPlease send Bitcoin to:\n\n`1PVavNkMmBmUz8nRYdnVXiTgXrAyaxfehj`";
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

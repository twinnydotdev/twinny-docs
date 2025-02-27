import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_D8JpLML5.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';

const html = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Shortcut</th><th>Description</th></tr></thead><tbody><tr><td><code dir=\"auto\">ALT+\\</code></td><td>Trigger inline code completion</td></tr><tr><td><code dir=\"auto\">CTRL+SHIFT+/</code></td><td>Stop the inline code generation</td></tr><tr><td><code dir=\"auto\">Tab</code></td><td>Accept the inline code generated</td></tr></tbody></table>";

				const frontmatter = {"title":"Keyboard shortcuts","description":"Keyboard shortcuts for twinny."};
				const file = "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/keyboard-shortcuts.md";
				const url = undefined;
				function rawContent() {
					return "\n| Shortcut                    | Description                                      |\n| ----------------------------| -------------------------------------------------|\n| `ALT+\\`                     | Trigger inline code completion                   |\n| `CTRL+SHIFT+/`              | Stop the inline code generation                  | \n| `Tab`                       | Accept the inline code generated                 |\n";
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

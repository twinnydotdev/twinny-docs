import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_D8JpLML5.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';

const html = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>快捷键</th><th>描述</th></tr></thead><tbody><tr><td><code dir=\"auto\">ALT+\\</code></td><td>触发内联代码补全</td></tr><tr><td><code dir=\"auto\">CTRL+SHIFT+/</code></td><td>停止内联代码生成</td></tr><tr><td><code dir=\"auto\">Tab</code></td><td>接受生成的内联代码</td></tr></tbody></table>";

				const frontmatter = {"title":"键盘快捷键","description":"Twinny 的键盘快捷键"};
				const file = "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/keyboard-shortcuts.md";
				const url = undefined;
				function rawContent() {
					return "\n| 快捷键                        | 描述                                              |\n| ----------------------------- | ------------------------------------------------- |\n| `ALT+\\`                        | 触发内联代码补全                                  |\n| `CTRL+SHIFT+/`                 | 停止内联代码生成                                  |\n| `Tab`                          | 接受生成的内联代码                                |\n";
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

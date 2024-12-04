import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_D8JpLML5.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';

const html = "<p>To use twinny to autocomplete a code snippet, just start typing in the editor and twinny will autocomplete for you. It’s very similar to how Github Copilot works.</p>\n<p>If you prefer to trigger code completion manually, turn off automatic inline code completion in the Settings menu which can be found at the top of the twinny side panel and then use the keyboard shortcut <code dir=\"auto\">ALT+\\</code> to trigger code completion.</p>\n<p>Github Copilot and twinny share the same keyboard shortcuts, so they may interfere with each other. Please enable or disable them if required.</p>\n<p>See the <a href=\"/twinny-docs/general/supported-models/\">Supported models page</a> for supported models for fill-in-middle completions.</p>";

				const frontmatter = {"title":"Autocomplete","description":"Autocomplete"};
				const file = "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/fill-in-middle.md";
				const url = undefined;
				function rawContent() {
					return "\nTo use twinny to autocomplete a code snippet, just start typing in the editor and twinny will autocomplete for you. It's very similar to how Github Copilot works.\n\nIf you prefer to trigger code completion manually, turn off automatic inline code completion in the Settings menu which can be found at the top of the twinny side panel and then use the keyboard shortcut `ALT+\\` to trigger code completion.\n\nGithub Copilot and twinny share the same keyboard shortcuts, so they may interfere with each other. Please enable or disable them if required.\n\nSee the [Supported models page](/twinny-docs/general/supported-models/) for supported models for fill-in-middle completions.\n";
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

import { e as createComponent, a0 as AstroUserError, r as renderTemplate, m as maybeRenderHead, g as addAttribute, n as renderComponent, o as renderSlot, h as createAstro, u as unescapeHTML, F as Fragment, s as spreadAttributes } from './astro_D8JpLML5.mjs';
import 'kleur/colors';
import 'cssesc';
import { s as slugToLocaleData, u as urlToSlug, a as useTranslations, $ as $$Icon, I as Icons, d as definitions } from './prerender_CQfQ8MP6.mjs';
import 'clsx';
/* empty css                                                            */
/* empty css                                                                */
/* empty css                                                            */
import { select } from 'hast-util-select';
import { rehype } from 'rehype';
import { visit, CONTINUE, SKIP } from 'unist-util-visit';
/* empty css                                                                */
/* empty css                                                             */
import { h, s } from 'hastscript';
import { fromHtml } from 'hast-util-from-html';
import { toString } from 'hast-util-to-string';
/* empty css                                                                */
import { toHtml } from 'hast-util-to-html';
import { addClassName } from 'remark-expressive-code';

const $$Astro$8 = createAstro();
const $$Aside = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Aside;
  const asideVariants = ["note", "tip", "caution", "danger"];
  const icons = { note: "information", tip: "rocket", caution: "warning", danger: "error" };
  let { type = "note", title } = Astro2.props;
  if (!asideVariants.includes(type)) {
    throw new AstroUserError(
      "Invalid `type` prop passed to the `<Aside>` component.\n",
      `Received: ${JSON.stringify(type)}
Expected one of ${asideVariants.map((i) => JSON.stringify(i)).join(", ")}`
    );
  }
  if (!title) {
    const { locale } = slugToLocaleData(urlToSlug(Astro2.url));
    title = useTranslations(locale)(`aside.${type}`);
  }
  return renderTemplate`${maybeRenderHead()}<aside${addAttribute(title, "aria-label")}${addAttribute(`starlight-aside starlight-aside--${type}`, "class")}> <p class="starlight-aside__title" aria-hidden="true"> ${renderComponent($$result, "Icon", $$Icon, { "name": icons[type], "class": "starlight-aside__icon" })}${title} </p> <section class="starlight-aside__content"> ${renderSlot($$result, $$slots["default"])} </section> </aside>`;
}, "/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/user-components/Aside.astro", void 0);

const $$Astro$7 = createAstro();
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Card;
  const { icon, title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="card sl-flex astro-v5tidmuc"> <p class="title sl-flex astro-v5tidmuc"> ${icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "icon astro-v5tidmuc", "size": "1.333em" })}`} <span class="astro-v5tidmuc">${unescapeHTML(title)}</span> </p> <div class="body astro-v5tidmuc">${renderSlot($$result, $$slots["default"])}</div> </article> `;
}, "/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/user-components/Card.astro", void 0);

const $$Astro$6 = createAstro();
const $$CardGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$CardGrid;
  const { stagger = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([["card-grid", { stagger }], "astro-zntqmydn"], "class:list")}>${renderSlot($$result, $$slots["default"])}</div> `;
}, "/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/user-components/CardGrid.astro", void 0);

const TabItemTagname = "starlight-tab-item";
const focusableElementSelectors = [
  "input:not([disabled]):not([type=hidden])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "a[href]",
  "area[href]",
  "summary",
  "iframe",
  "object",
  "embed",
  "audio[controls]",
  "video[controls]",
  "[contenteditable]",
  "[tabindex]:not([disabled])"
].map((selector) => `${selector}:not([hidden]):not([tabindex="-1"])`).join(",");
let count = 0;
const getIDs = () => {
  const id = count++;
  return { panelId: "tab-panel-" + id, tabId: "tab-" + id };
};
const tabsProcessor = rehype().data("settings", { fragment: true }).use(function tabs() {
  return (tree, file) => {
    file.data.panels = [];
    let isFirst = true;
    visit(tree, "element", (node) => {
      if (node.tagName !== TabItemTagname || !node.properties) {
        return CONTINUE;
      }
      const { dataLabel, dataIcon } = node.properties;
      const ids = getIDs();
      const panel = {
        ...ids,
        label: String(dataLabel)
      };
      if (dataIcon) panel.icon = String(dataIcon);
      file.data.panels?.push(panel);
      delete node.properties.dataLabel;
      delete node.properties.dataIcon;
      node.tagName = "section";
      node.properties.id = ids.panelId;
      node.properties["aria-labelledby"] = ids.tabId;
      node.properties.role = "tabpanel";
      const focusableChild = select(focusableElementSelectors, node);
      if (!focusableChild) {
        node.properties.tabindex = 0;
      }
      if (isFirst) {
        isFirst = false;
      } else {
        node.properties.hidden = true;
      }
      return SKIP;
    });
  };
});
const processPanels = (html) => {
  const file = tabsProcessor.processSync({ value: html });
  return {
    /** Data for each tab panel. */
    panels: file.data.panels,
    /** Processed HTML for the tab panels. */
    html: file.toString()
  };
};

const $$Astro$5 = createAstro();
const $$Tabs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Tabs;
  const panelHtml = await Astro2.slots.render("default");
  const { html, panels } = processPanels(panelHtml);
  return renderTemplate`${renderComponent($$result, "starlight-tabs", "starlight-tabs", { "class": "astro-esqgolmp" }, { "default": () => renderTemplate` ${panels && renderTemplate`${maybeRenderHead()}<div class="tablist-wrapper not-content astro-esqgolmp"> <ul role="tablist" class="astro-esqgolmp"> ${panels.map(({ icon, label, panelId, tabId }, idx) => renderTemplate`<li role="presentation" class="tab astro-esqgolmp"> <a role="tab"${addAttribute("#" + panelId, "href")}${addAttribute(tabId, "id")}${addAttribute(idx === 0 ? "true" : "false", "aria-selected")}${addAttribute(idx !== 0 ? -1 : 0, "tabindex")} class="astro-esqgolmp"> ${icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "astro-esqgolmp" })}`} ${label} </a> </li>`)} </ul> </div>`} ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(html)}` })} ` })}  `;
}, "/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/user-components/Tabs.astro", void 0);

const $$Astro$4 = createAstro();
const $$TabItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$TabItem;
  const { icon, label } = Astro2.props;
  if (!label) {
    throw new Error("Missing prop `label` on `<TabItem>` component.");
  }
  return renderTemplate`${renderComponent($$result, "TabItemTagname", TabItemTagname, { "data-label": label, "data-icon": icon }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/user-components/TabItem.astro", void 0);

const $$Astro$3 = createAstro();
const $$LinkCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$LinkCard;
  const { title, description, ...attributes } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="sl-link-card astro-mf7fz2mj"> <span class="sl-flex stack astro-mf7fz2mj"> <a${spreadAttributes(attributes, void 0, { "class": "astro-mf7fz2mj" })}> <span class="title astro-mf7fz2mj">${unescapeHTML(title)}</span> </a> ${description && renderTemplate`<span class="description astro-mf7fz2mj">${unescapeHTML(description)}</span>`} </span> ${renderComponent($$result, "Icon", $$Icon, { "name": "right-arrow", "size": "1.333em", "class": "icon rtl:flip astro-mf7fz2mj" })} </div> `;
}, "/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/user-components/LinkCard.astro", void 0);

const stepsProcessor = rehype().data("settings", { fragment: true }).use(function steps() {
  return (tree) => {
    const rootElements = tree.children.filter((item) => item.type === "element");
    const [rootElement] = rootElements;
    if (!rootElement) {
      throw new StepsError(
        "The `<Steps>` component expects its content to be a single ordered list (`<ol>`) but found no child elements."
      );
    } else if (rootElements.length > 1) {
      throw new StepsError(
        "The `<Steps>` component expects its content to be a single ordered list (`<ol>`) but found multiple child elements: " + rootElements.map((element) => `\`<${element.tagName}>\``).join(", ") + "."
      );
    } else if (rootElement.tagName !== "ol") {
      throw new StepsError(
        `The \`<Steps>\` component expects its content to be a single ordered list (\`<ol>\`) but found the following element: \`<${rootElement.tagName}>\`.`
      );
    }
    rootElement.properties.role = "list";
    if (!Array.isArray(rootElement.properties.className)) {
      rootElement.properties.className = ["sl-steps"];
    } else {
      rootElement.properties.className.push("sl-steps");
    }
  };
});
const processSteps = (html) => {
  const file = stepsProcessor.processSync({ value: html });
  return { html: file.toString() };
};
class StepsError extends AstroUserError {
  constructor(message) {
    super(
      message,
      "To learn more about the `<Steps>` component, see https://starlight.astro.build/guides/components/#steps"
    );
  }
}

const $$Astro$2 = createAstro();
const $$Steps = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Steps;
  const content = await Astro2.slots.render("default");
  const { html } = processSteps(content);
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(html)}` })}`;
}, "/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/user-components/Steps.astro", void 0);

const folderIcon = makeSVGIcon(Icons["seti:folder"]);
const defaultFileIcon = makeSVGIcon(Icons["seti:default"]);
function processFileTree(html, directoryLabel) {
  const file = fileTreeProcessor.processSync({ data: { directoryLabel }, value: html });
  return file.toString();
}
const fileTreeProcessor = rehype().data("settings", { fragment: true }).use(function fileTree() {
  return (tree, file) => {
    const { directoryLabel } = file.data;
    validateFileTree(tree);
    visit(tree, "element", (node) => {
      node.children = node.children.filter(
        (child) => child.type === "comment" || child.type !== "text" || !/^\n+$/.test(child.value)
      );
      if (node.tagName !== "li") return CONTINUE;
      const [firstChild, ...otherChildren] = node.children;
      const comment = [];
      if (firstChild?.type === "text") {
        const [filename, ...fragments] = firstChild.value.split(" ");
        firstChild.value = filename || "";
        const textComment = fragments.join(" ").trim();
        if (textComment.length > 0) {
          comment.push(fragments.join(" "));
        }
      }
      const subTreeIndex = otherChildren.findIndex(
        (child) => child.type === "element" && child.tagName === "ul"
      );
      const commentNodes = subTreeIndex > -1 ? otherChildren.slice(0, subTreeIndex) : [...otherChildren];
      otherChildren.splice(0, subTreeIndex > -1 ? subTreeIndex : otherChildren.length);
      comment.push(...commentNodes);
      const firstChildTextContent = firstChild ? toString(firstChild) : "";
      const isDirectory = /\/\s*$/.test(firstChildTextContent) || otherChildren.some((child) => child.type === "element" && child.tagName === "ul");
      const isPlaceholder = /^\s*(\.{3}|…)\s*$/.test(firstChildTextContent);
      const isHighlighted = firstChild?.type === "element" && firstChild.tagName === "strong";
      const icon = h("span", isDirectory ? folderIcon : getFileIcon(firstChildTextContent));
      if (isDirectory) {
        icon.children.unshift(h("span", { class: "sr-only" }, directoryLabel));
      }
      node.properties.class = isDirectory ? "directory" : "file";
      if (isPlaceholder) node.properties.class += " empty";
      const treeEntryChildren = [
        h("span", { class: isHighlighted ? "highlight" : "" }, [
          isPlaceholder ? null : icon,
          firstChild
        ])
      ];
      if (comment.length > 0) {
        treeEntryChildren.push(makeText(" "), h("span", { class: "comment" }, ...comment));
      }
      const treeEntry = h("span", { class: "tree-entry" }, ...treeEntryChildren);
      if (isDirectory) {
        const hasContents = otherChildren.length > 0;
        node.children = [
          h("details", { open: hasContents }, [
            h("summary", treeEntry),
            ...hasContents ? otherChildren : [h("ul", h("li", "…"))]
          ])
        ];
        return CONTINUE;
      }
      node.children = [treeEntry, ...otherChildren];
      return SKIP;
    });
  };
});
function makeText(value = "") {
  return { type: "text", value };
}
function makeSVGIcon(svgString) {
  return s(
    "svg",
    {
      width: 16,
      height: 16,
      class: "tree-icon",
      "aria-hidden": "true",
      viewBox: "0 0 24 24"
    },
    fromHtml(svgString, { fragment: true })
  );
}
function getFileIcon(fileName) {
  const name = getFileIconName(fileName);
  if (!name) return defaultFileIcon;
  if (name in Icons) {
    const path = Icons[name];
    return makeSVGIcon(path);
  }
  return defaultFileIcon;
}
function getFileIconName(fileName) {
  let icon = definitions.files[fileName];
  if (icon) return icon;
  icon = getFileIconTypeFromExtension(fileName);
  if (icon) return icon;
  for (const [partial, partialIcon] of Object.entries(definitions.partials)) {
    if (fileName.includes(partial)) return partialIcon;
  }
  return icon;
}
function getFileIconTypeFromExtension(fileName) {
  const firstDotIndex = fileName.indexOf(".");
  if (firstDotIndex === -1) return;
  let extension = fileName.slice(firstDotIndex);
  while (extension !== "") {
    const icon = definitions.extensions[extension];
    if (icon) return icon;
    const nextDotIndex = extension.indexOf(".", 1);
    if (nextDotIndex === -1) return;
    extension = extension.slice(nextDotIndex);
  }
  return;
}
function validateFileTree(tree) {
  const rootElements = tree.children.filter(isElementNode);
  const [rootElement] = rootElements;
  if (rootElements.length === 0) {
    throwFileTreeValidationError(
      "The `<FileTree>` component expects its content to be a single unordered list but found no child elements."
    );
  }
  if (rootElements.length !== 1) {
    throwFileTreeValidationError(
      `The \`<FileTree>\` component expects its content to be a single unordered list but found multiple child elements: ${rootElements.map((element) => `\`<${element.tagName}>\``).join(" - ")}.`
    );
  }
  if (!rootElement || rootElement.tagName !== "ul") {
    throwFileTreeValidationError(
      `The \`<FileTree>\` component expects its content to be an unordered list but found the following element: \`<${rootElement?.tagName}>\`.`
    );
  }
  const listItemElement = select("li", rootElement);
  if (!listItemElement) {
    throwFileTreeValidationError(
      "The `<FileTree>` component expects its content to be an unordered list with at least one list item."
    );
  }
}
function isElementNode(node) {
  return node.type === "element";
}
function throwFileTreeValidationError(message) {
  throw new AstroUserError(
    message,
    "To learn more about the `<FileTree>` component, see https://starlight.astro.build/guides/components/#file-tree"
  );
}

const $$Astro$1 = createAstro();
const $$FileTree = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FileTree;
  const slug = Astro2.url.pathname.replace(/^\//, "").replace(/\/$/, "");
  const t = useTranslations(slugToLocaleData(slug).locale);
  const fileTreeHtml = await Astro2.slots.render("default");
  const html = processFileTree(fileTreeHtml, t("fileTree.directory"));
  return renderTemplate`${renderComponent($$result, "starlight-file-tree", "starlight-file-tree", { "class": "not-content astro-p67cqifm", "data-pagefind-ignore": true }, { "default": () => renderTemplate`${unescapeHTML(html)}` })} `;
}, "/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/user-components/FileTree.astro", void 0);

const pageDataMap = /* @__PURE__ */ new Map();
function getPageData(request) {
  let data = pageDataMap.get(request);
  if (!data) {
    data = {
      url: request.url,
      blockGroupIndex: -1
    };
    pageDataMap.set(request, data);
  }
  return data;
}

let cachedRenderer = void 0;
async function getRenderer() {
  if (!cachedRenderer) {
    cachedRenderer = createRenderer();
  }
  return await cachedRenderer;
}
async function createRenderer() {
  const { astroConfig, ecConfigFileOptions, ecIntegrationOptions = {} } = await import('./config_uXzO4yRi.mjs');
  const { createAstroRenderer } = await import('./index_ozryYkOL.mjs');
  const strIntegrationOptions = JSON.stringify(ecIntegrationOptions);
  if (strIntegrationOptions.includes('"[Function]"') || strIntegrationOptions.includes("'[Circular]'")) {
    throw new Error(
      `Your Astro config file contains Expressive Code options that are not serializable to JSON.
			To use the \`<Code>\` component, please create a separate config file called \`ec.config.mjs\`
			in your project root, move your Expressive Code options object into the config file,
			and export it as the default export.`.replace(/\s+/g, " ")
    );
  }
  let mergedEcConfig = { ...ecConfigFileOptions, ...ecIntegrationOptions };
  try {
    const { default: preprocessEcConfig } = await import('./preprocess-config_BQBZeY7l.mjs');
    mergedEcConfig = await preprocessEcConfig({ ecConfig: mergedEcConfig, astroConfig }) || mergedEcConfig;
  } catch (error) {
    const msg = error instanceof Error ? error.message : error;
    throw new Error(`Failed to preprocess Expressive Code config for the Code component: ${msg}`, { cause: error });
  }
  return await createAstroRenderer({
    astroConfig,
    ecConfig: mergedEcConfig
  });
}

const $$Astro = createAstro();
const $$Code = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Code;
  function formatMessage(...messageParts) {
    return messageParts.map((part) => part.replace(/\s+/g, " ")).join("\n\n");
  }
  async function renderToHtml() {
    const defaultSlotContent = await Astro2.slots.render("default");
    if (defaultSlotContent?.trim().length) {
      throw new Error(
        formatMessage(
          `Unsupported child content was found inside the component.
				The code to render must be passed to the \`code\` prop as a string.`,
          `Please remove the following child content:
${defaultSlotContent}`
        )
      );
    }
    let { code, lang = "", meta = "", locale, class: className, ...props } = Astro2.props;
    if (!code || !code.trim().length) {
      throw new Error("Missing code to render. The `code` prop must be set to a non-empty string.");
    }
    const pageData = getPageData(Astro2.request);
    const groupIndex = ++pageData.blockGroupIndex;
    const renderer = await getRenderer();
    const { renderedGroupAst } = await renderer.ec.render({
      code,
      language: lang,
      meta,
      locale,
      parentDocument: {
        positionInDocument: {
          groupIndex
        }
      },
      props
    });
    if (renderedGroupAst?.type === "element") {
      if (className) {
        const classNames = className.split(" ");
        classNames.forEach((className2) => addClassName(renderedGroupAst, className2));
      }
    }
    return toHtml(renderedGroupAst);
  }
  let html = "";
  try {
    html = await renderToHtml();
  } catch (err) {
    const prefix = `Failed to render a \`<Code>\` component on page ${Astro2.request.url}:`;
    const error = err instanceof Error ? err : new Error(String(err));
    throw new Error(`${prefix}

${error.message}`, { cause: error });
  }
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(html)}` })}`;
}, "/home/richard/Desktop/twinny/twinny-docs/node_modules/astro-expressive-code/components/Code.astro", void 0);

export { $$CardGrid as $, $$LinkCard as a, $$Card as b };

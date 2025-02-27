import { createRenderer, getStableObjectHash } from 'remark-expressive-code';
export * from 'remark-expressive-code';

function getAssetsPrefix(fileExtension, assetsPrefix) {
  if (!assetsPrefix)
    return "";
  if (typeof assetsPrefix === "string")
    return assetsPrefix;
  const dotLessFileExtension = fileExtension.slice(1);
  if (assetsPrefix[dotLessFileExtension]) {
    return assetsPrefix[dotLessFileExtension];
  }
  return assetsPrefix.fallback;
}
function getAssetsBaseHref(fileExtension, assetsPrefix, base) {
  return (getAssetsPrefix(fileExtension, assetsPrefix) || base || "").trim().replace(/\/+$/g, "");
}
async function createAstroRenderer({ ecConfig, astroConfig, logger }) {
  const { emitExternalStylesheet = true, customCreateRenderer, plugins = [], shiki = true, ...rest } = ecConfig ?? {};
  const assetsDir = astroConfig.build?.assets || "_astro";
  const hashedStyles = [];
  const hashedScripts = [];
  plugins.push({
    name: "astro-expressive-code",
    hooks: {
      postprocessRenderedBlockGroup: ({ renderData, renderedGroupContents }) => {
        const isFirstGroupInDocument = renderedGroupContents[0]?.codeBlock.parentDocument?.positionInDocument?.groupIndex === 0;
        if (!isFirstGroupInDocument)
          return;
        const extraElements = [];
        hashedStyles.forEach(([hashedRoute]) => {
          extraElements.push({
            type: "element",
            tagName: "link",
            properties: { rel: "stylesheet", href: `${getAssetsBaseHref(".css", astroConfig.build?.assetsPrefix, astroConfig.base)}${hashedRoute}` },
            children: []
          });
        });
        hashedScripts.forEach(([hashedRoute]) => {
          extraElements.push({
            type: "element",
            tagName: "script",
            properties: { type: "module", src: `${getAssetsBaseHref(".js", astroConfig.build?.assetsPrefix, astroConfig.base)}${hashedRoute}` },
            children: []
          });
        });
        if (!extraElements.length)
          return;
        renderData.groupAst.children.unshift(...extraElements);
      }
    }
  });
  const mergedShikiConfig = shiki === true ? {} : shiki;
  if (mergedShikiConfig && !mergedShikiConfig.langs && astroConfig.markdown?.shikiConfig?.langs) {
    mergedShikiConfig.langs = astroConfig.markdown.shikiConfig.langs;
  }
  const renderer = await (customCreateRenderer ?? createRenderer)({
    plugins,
    logger,
    shiki: mergedShikiConfig,
    ...rest
  });
  renderer.hashedStyles = hashedStyles;
  renderer.hashedScripts = hashedScripts;
  if (emitExternalStylesheet) {
    const combinedStyles = `${renderer.baseStyles}${renderer.themeStyles}`;
    hashedStyles.push(getHashedRouteWithContent(combinedStyles, `/${assetsDir}/ec.{hash}.css`));
    renderer.baseStyles = "";
    renderer.themeStyles = "";
  }
  const uniqueJsModules = [...new Set(renderer.jsModules)];
  renderer.jsModules = [];
  hashedScripts.push(...uniqueJsModules.map((moduleCode) => getHashedRouteWithContent(moduleCode, `/${assetsDir}/ec.{hash}.js`)));
  return renderer;
}
function getHashedRouteWithContent(content, routeTemplate) {
  const contentHash = getStableObjectHash(content, { hashLength: 5 });
  return [routeTemplate.replace("{hash}", contentHash), content];
}

export { createAstroRenderer };

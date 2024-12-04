import '@astrojs/internal-helpers/path';
import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_D8JpLML5.mjs';
import 'clsx';
import 'cssesc';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/node","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/404","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/@astrojs/starlight/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BO5rBSqo.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_astro/ec.d6kn2.css","pattern":"^\\/_astro\\/ec\\.d6kn2\\.css$","segments":[[{"content":"_astro","dynamic":false,"spread":false}],[{"content":"ec.d6kn2.css","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro-expressive-code/routes/styles.ts","pathname":"/_astro/ec.d6kn2.css","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BO5rBSqo.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_astro/ec.dy9ns.js","pattern":"^\\/_astro\\/ec\\.dy9ns\\.js$","segments":[[{"content":"_astro","dynamic":false,"spread":false}],[{"content":"ec.dy9ns.js","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro-expressive-code/routes/scripts.ts","pathname":"/_astro/ec.dy9ns.js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BO5rBSqo.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/404.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:node_modules/@astrojs/starlight/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/utils/routing.ts",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:node_modules/@astrojs/starlight/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/utils/navigation.ts",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/components/SidebarSublist.astro",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/components/Sidebar.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:starlight/components/Sidebar",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/components/Page.astro",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/utils/route-data.ts",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/utils/translations.ts",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/internal.ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro-expressive-code/preprocess-config",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/astro-expressive-code/components/renderer.ts",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/astro-expressive-code/components/Code.astro",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/astro-expressive-code/components/index.ts",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/components.ts",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/src/content/docs/index.mdx",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/src/content/docs/index.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/index.mdx",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/index.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/user-components/Aside.astro",{"propagation":"in-tree","containsHead":false}],["/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/user-components/FileTree.astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro-expressive-code/routes/scripts.ts":"chunks/pages/scripts_BNzMjs_z.mjs","/node_modules/astro-expressive-code/routes/styles.ts":"chunks/pages/styles_B2wXhaYM.mjs","\u0000@astrojs-manifest":"manifest_CizosHfd.mjs","\u0000@astro-page:node_modules/astro-expressive-code/routes/styles@_@ts":"chunks/styles_CY_nkJB0.mjs","\u0000@astro-page:node_modules/astro-expressive-code/routes/scripts@_@ts":"chunks/scripts_DWajbOtk.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"chunks/node_CwC2tluF.mjs","\u0000@astro-page:node_modules/@astrojs/starlight/404@_@astro":"chunks/404_CAajvkFJ.mjs","\u0000@astro-page:node_modules/@astrojs/starlight/index@_@astro":"chunks/index_CnyqqR69.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/chat.md?astroContentCollectionEntry=true":"chunks/chat_C1kkmFoa.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/fill-in-middle.md?astroContentCollectionEntry=true":"chunks/fill-in-middle_DqbDlCkp.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/keyboard-shortcuts.md?astroContentCollectionEntry=true":"chunks/keyboard-shortcuts_sKkXT-K3.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/providers.md?astroContentCollectionEntry=true":"chunks/providers_CBFcLfBy.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/quick-start.md?astroContentCollectionEntry=true":"chunks/quick-start_B0zN7gDI.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/support-twinny.md?astroContentCollectionEntry=true":"chunks/support-twinny_C3lN9Apw.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/supported-models.md?astroContentCollectionEntry=true":"chunks/supported-models_Jf5ctFfr.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/symmetry.md?astroContentCollectionEntry=true":"chunks/symmetry_fUxAaBq4.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/index.mdx?astroContentCollectionEntry=true":"chunks/index_B1yrL804.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/chat.md?astroContentCollectionEntry=true":"chunks/chat_CUYTWMpJ.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/fill-in-middle.md?astroContentCollectionEntry=true":"chunks/fill-in-middle_CaFgMuDG.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/keyboard-shortcuts.md?astroContentCollectionEntry=true":"chunks/keyboard-shortcuts_D29osUcH.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/providers.md?astroContentCollectionEntry=true":"chunks/providers_CefM3hFs.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/quick-start.md?astroContentCollectionEntry=true":"chunks/quick-start_qdQzGhaI.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/support-twinny.md?astroContentCollectionEntry=true":"chunks/support-twinny_CtyJIF5-.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/supported-models.md?astroContentCollectionEntry=true":"chunks/supported-models_CKt5QpO7.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/symmetry.md?astroContentCollectionEntry=true":"chunks/symmetry_BH89s52i.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/index.mdx?astroContentCollectionEntry=true":"chunks/index_DtMmfc2n.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/chat.md?astroPropagatedAssets":"chunks/chat_CAirBSw8.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/fill-in-middle.md?astroPropagatedAssets":"chunks/fill-in-middle_BeQwYUm0.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/keyboard-shortcuts.md?astroPropagatedAssets":"chunks/keyboard-shortcuts_LJtWmpIu.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/providers.md?astroPropagatedAssets":"chunks/providers_ALEPcIyN.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/quick-start.md?astroPropagatedAssets":"chunks/quick-start_C47VO5jt.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/support-twinny.md?astroPropagatedAssets":"chunks/support-twinny_Cco5sC9J.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/supported-models.md?astroPropagatedAssets":"chunks/supported-models_DAu2K0KJ.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/symmetry.md?astroPropagatedAssets":"chunks/symmetry_D-zg0ggN.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/index.mdx?astroPropagatedAssets":"chunks/index_DH23RxWa.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/chat.md?astroPropagatedAssets":"chunks/chat_DPtwEI8X.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/fill-in-middle.md?astroPropagatedAssets":"chunks/fill-in-middle_DE0tiHBU.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/keyboard-shortcuts.md?astroPropagatedAssets":"chunks/keyboard-shortcuts_aYI11tJk.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/providers.md?astroPropagatedAssets":"chunks/providers_Cpr9FrMK.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/quick-start.md?astroPropagatedAssets":"chunks/quick-start_Z6FSapBt.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/support-twinny.md?astroPropagatedAssets":"chunks/support-twinny_Dh-UwMjN.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/supported-models.md?astroPropagatedAssets":"chunks/supported-models_BxCnO4V5.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/symmetry.md?astroPropagatedAssets":"chunks/symmetry_DJo0oVAn.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/index.mdx?astroPropagatedAssets":"chunks/index_CynzTUA8.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/chat.md":"chunks/chat_BokkVPDs.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/fill-in-middle.md":"chunks/fill-in-middle_CiCuBZdu.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/keyboard-shortcuts.md":"chunks/keyboard-shortcuts_BkEb7BNU.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/providers.md":"chunks/providers_DacfW5aX.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/quick-start.md":"chunks/quick-start_C2pBSXkg.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/support-twinny.md":"chunks/support-twinny_CvVEYm27.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/supported-models.md":"chunks/supported-models_DzTHMewk.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/general/symmetry.md":"chunks/symmetry_K9x1DI3g.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/index.mdx":"chunks/index_DIBhZZIP.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/chat.md":"chunks/chat_CXLU0mAr.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/fill-in-middle.md":"chunks/fill-in-middle_Cnkdlgfl.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/keyboard-shortcuts.md":"chunks/keyboard-shortcuts_CoKMZqMo.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/providers.md":"chunks/providers_38R6H6dp.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/quick-start.md":"chunks/quick-start_BBBBzkr_.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/support-twinny.md":"chunks/support-twinny_c8PWYyVO.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/supported-models.md":"chunks/supported-models_BPw3PWRi.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/symmetry.md":"chunks/symmetry_BUgQ6U6M.mjs","/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/index.mdx":"chunks/index_IlUDpZPD.mjs","\u0000virtual:astro-expressive-code/config":"chunks/config_uXzO4yRi.mjs","/home/richard/Desktop/twinny/twinny-docs/node_modules/astro-expressive-code/dist/index.js":"chunks/index_ozryYkOL.mjs","\u0000virtual:astro-expressive-code/preprocess-config":"chunks/preprocess-config_BQBZeY7l.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.By0VDqIm.js","/home/richard/Desktop/twinny/twinny-docs/node_modules/@astrojs/starlight/user-components/Tabs.astro?astro&type=script&index=0&lang.ts":"_astro/Tabs.astro_astro_type_script_index_0_lang.DvY6zcBw.js","astro:scripts/page.js":"_astro/page.BO5rBSqo.js","/home/richard/Desktop/twinny/twinny-docs/node_modules/@pagefind/default-ui/npm_dist/mjs/ui-core.mjs":"_astro/ui-core.DDIim1rH.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/twinny.Bt_Wmo1-.svg","/_astro/symmetry_disconnected.PCiYU8j_.png","/_astro/symmetry-architecture.D8ZYwXmD.png","/_astro/symmetry_provider.8Fxh384V.png","/_astro/symmetry_connected.Cp5lh_p0.png","/_astro/index.CLdHpWUA.css","/favicon.svg","/_astro/Tabs.astro_astro_type_script_index_0_lang.DvY6zcBw.js","/_astro/hoisted.By0VDqIm.js","/_astro/page.BO5rBSqo.js","/_astro/ui-core.DDIim1rH.js","/_astro/page.BO5rBSqo.js","/404.html"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };

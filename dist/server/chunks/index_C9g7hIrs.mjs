import { $ as __astro_tag_component__, F as Fragment, _ as createVNode } from './astro_D8JpLML5.mjs';
import { $ as $$Image } from './pages/node_CFP0O91b.mjs';
import { $ as $$CardGrid, a as $$LinkCard, b as $$Card } from './Code_Yxp0dKfz.mjs';
import './prerender_DkPztLGz.mjs';
import 'clsx';

const frontmatter = {
  "title": "\u6B22\u8FCE\u6765\u5230 twinny",
  "description": "Visual Studio Code \u7684\u514D\u8D39\u79C1\u6709 AI \u6269\u5C55\u3002\u6709\u81EA\u52A8\u8865\u5168\u4EE3\u7801\u3001\u4E0E AI \u5BF9\u8BDD\u7B49\u529F\u80FD\u3002",
  "template": "splash",
  "hero": {
    "title": "twinny\n",
    "image": {
      "file": "../../../assets/twinny.svg"
    },
    "tagline": "Visual Studio Code \u7684\u514D\u8D39\u79C1\u6709 AI \u6269\u5C55\u3002\u6709\u81EA\u52A8\u8865\u5168\u4EE3\u7801\u3001\u4E0E AI \u5BF9\u8BDD\u7B49\u529F\u80FD\u3002\n",
    "actions": [{
      "text": "\u5F00\u59CB\u4F7F\u7528",
      "link": "/zh-cn/general/quick-start",
      "icon": "right-arrow",
      "variant": "secondary"
    }]
  }
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "\u4E86\u89E3\u66F4\u591A",
    "text": "\u4E86\u89E3\u66F4\u591A"
  }, {
    "depth": 2,
    "slug": "\u4E3B\u8981\u529F\u80FD",
    "text": "\u4E3B\u8981\u529F\u80FD"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    h2: "h2",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "\u4E86\u89E3\u66F4\u591A",
      children: "\u4E86\u89E3\u66F4\u591A"
    }), "\n", createVNode($$CardGrid, {
      stagger: true,
      children: [createVNode($$LinkCard, {
        title: "\u5FEB\u901F\u5F00\u59CB",
        description: "\u4E00\u4E2A\u9488\u5BF9\u4F7F\u7528 twinny \u7684\u5FEB\u901F\u5165\u95E8\u6307\u5357",
        href: "/zh-cn/general/quick-start"
      }), createVNode($$LinkCard, {
        title: "\u63A8\u7406\u63D0\u4F9B\u8005",
        description: "\u4E86\u89E3\u5982\u4F55\u5728 twinny \u4E2D\u4F7F\u7528\u63A8\u7406\u63D0\u4F9B\u8005",
        href: "/zh-cn/general/providers"
      }), createVNode($$LinkCard, {
        title: "\u652F\u6301\u7684\u6A21\u578B",
        description: "\u4E86\u89E3 twinny \u652F\u6301\u7684 AI \u6A21\u578B",
        href: "/zh-cn/general/supported-models"
      }), createVNode($$LinkCard, {
        title: "Symmetry",
        description: "\u53BB\u4E2D\u5FC3\u5316\u7684 AI \u63A8\u7406\u7F51\u7EDC",
        href: "/zh-cn/general/symmetry"
      })]
    }), "\n", createVNode(_components.h2, {
      id: "\u4E3B\u8981\u529F\u80FD",
      children: "\u4E3B\u8981\u529F\u80FD"
    }), "\n", createVNode($$CardGrid, {
      stagger: true,
      children: [createVNode($$Card, {
        title: "\u4EE3\u7801\u8865\u5168",
        icon: "seti:json",
        children: createVNode(_components.p, {
          children: "twinny \u4E3A\u4F60\u7684\u4EE3\u7801\u63D0\u4F9B\u81EA\u52A8\u8865\u5168\u5EFA\u8BAE"
        })
      }), createVNode($$Card, {
        title: "Chat with AI",
        icon: "pencil",
        children: createVNode(_components.p, {
          children: "twinny \u63D0\u4F9B\u4E00\u4E2A\u804A\u5929\u754C\u9762\u6765\u4E0E\u79C1\u4EBA AI \u4E92\u52A8"
        })
      })]
    })]
  });
}
function MDXContent(props = {}) {
  const {
    wrapper: MDXLayout
  } = props.components || {};
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
__astro_tag_component__(getHeadings, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
const url = "src/content/docs/zh-cn/index.mdx";
const file = "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

import { $ as __astro_tag_component__, F as Fragment, _ as createVNode } from './astro_D8JpLML5.mjs';
import { $ as $$Image } from './pages/node_CFP0O91b.mjs';
import { $ as $$CardGrid, a as $$LinkCard, b as $$Card } from './Code_CTjHjqj6.mjs';
import './prerender_CQfQ8MP6.mjs';
import 'clsx';

const frontmatter = {
  "title": "Welcome to twinny",
  "description": "The free and private AI extension for Visual Studio Code. Auto-complete suggestions, chat with AI and more.",
  "template": "splash",
  "hero": {
    "title": "twinny\n",
    "image": {
      "file": "../../assets/twinny.svg"
    },
    "tagline": "The free and private AI extension for Visual Studio Code. Auto-complete suggestions, chat with AI and more.\n",
    "actions": [{
      "text": "Getting Started",
      "link": "/twinny-docs/general/quick-start",
      "icon": "right-arrow",
      "variant": "secondary"
    }]
  }
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "learn-more",
    "text": "Learn More"
  }, {
    "depth": 2,
    "slug": "main-features",
    "text": "Main Features"
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
      id: "learn-more",
      children: "Learn More"
    }), "\n", createVNode($$CardGrid, {
      stagger: true,
      children: [createVNode($$LinkCard, {
        title: "Getting Started",
        description: "A quick start guide for using twinny",
        href: "/twinny-docs/general/quick-start"
      }), createVNode($$LinkCard, {
        title: "Inference Providers",
        href: "/twinny-docs/general/providers",
        description: "Learn how to use an inference provider with twinny"
      }), createVNode($$LinkCard, {
        title: "Supported Models",
        description: "Learn about the supported AI models",
        href: "/twinny-docs/general/supported-models"
      }), createVNode($$LinkCard, {
        title: "Symmetry",
        description: "The distributed AI inference network",
        href: "/twinny-docs/general/symmetry"
      })]
    }), "\n", createVNode(_components.h2, {
      id: "main-features",
      children: "Main Features"
    }), "\n", createVNode($$CardGrid, {
      stagger: true,
      children: [createVNode($$Card, {
        title: "Code Completion",
        icon: "seti:json",
        children: createVNode(_components.p, {
          children: "twinny provides autocomplete suggestions for your code"
        })
      }), createVNode($$Card, {
        title: "Chat with AI",
        icon: "pencil",
        children: createVNode(_components.p, {
          children: "twinny provides a chat interface to interact with your personal AI"
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
const url = "src/content/docs/index.mdx";
const file = "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };

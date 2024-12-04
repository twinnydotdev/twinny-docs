import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	server: {
    host: true,
    port: 3008
  },
  adapter: node({
    mode: 'middleware',
  }),
	site: 'https://docs.twinny.dev',
	base: '/',
	integrations: [
		starlight({
			title: 'twinny',
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				'zh-cn': { label: '简体中文', lang: 'zh-CN' },
			},
			social: {
				github: 'https://github.com/twinnydotdev/twinny',
				'x.com': 'https://x.com/twinnydotdev',
			},
			sidebar: [
				{
					label: '/',
					items: [
						{
							label: 'Quick start', link: '/general/quick-start',
							translations: {
								'zh-CN': '快速开始'
							}
						},
						{ label: 'Inference providers', link: '/general/providers',
							translations: {
								'zh-CN': '推理提供者'
							}
						},
						{ label: 'Supported models', link: '/general/supported-models',
							translations: {
								'zh-CN': '支持的模型'
							}
						},
						{ label: 'Chat', link: '/general/chat',
							translations: {
								'zh-CN': '对话'
							}
						},
						{ label: 'Fill in middle', link: '/general/fill-in-middle',
							translations: {
								'zh-CN': '自动补全'
							}
						},
						{ label: 'Keyboard shortcuts', link: '/general/keyboard-shortcuts',
							translations: {
								'zh-CN': '键盘快捷键'
							}
						},
						{ label: 'Symmetry Network', link: '/general/symmetry',
							translations: {
								'zh-CN': 'Symmetry网络'
							}
						},
						{ label: 'Support twinny', link: '/general/support-twinny',
							translations: {
								'zh-CN': '支持twinny'
							}
						},
					],
				},
			],
			customCss: ['./src/tailwind.css'],
		}),
		tailwind({ applyBaseStyles: false }),
	],
});

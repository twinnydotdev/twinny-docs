import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	site: 'https://twinnydotdev.github.io',
	base: '/twinny-docs',
	server: {
		host: true,
		port: 3008
	},
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
							label: 'Quick start', link: '/twinny-docs/general/quick-start',
							translations: {
								'zh-CN': '快速开始'
							}
						},
						{ label: 'Inference providers', link: '/twinny-docs/general/providers',
							translations: {
								'zh-CN': '推理提供者'
							}
						},
						{ label: 'Supported models', link: '/twinny-docs/general/supported-models',
							translations: {
								'zh-CN': '支持的模型'
							}
						},
						{ label: 'Chat', link: '/twinny-docs/general/chat',
							translations: {
								'zh-CN': '对话'
							}
						},
						{ label: 'Fill in middle', link: '/twinny-docs/general/fill-in-middle',
							translations: {
								'zh-CN': '自动补全'
							}
						},
						{ label: 'Keyboard shortcuts', link: '/twinny-docs/general/keyboard-shortcuts',
							translations: {
								'zh-CN': '键盘快捷键'
							}
						},
						{ label: 'Symmetry Network', link: '/twinny-docs/general/symmetry',
							translations: {
								'zh-CN': 'Symmetry网络'
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

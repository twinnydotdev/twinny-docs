import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	site: 'https://github.com/rjmacarthy/twinny-docs.github.io',
	base: '/twinny-docs',
	integrations: [
		starlight({
			title: 'Twinny',
			social: {
				github: 'https://github.com/rjmacarthy/twinny',
			},
			sidebar: [
				{
					label: '/',
					items: [
						{ label: 'Quick start', link: '/general/quick-start' },
						{ label: 'Inference providers', link: '/general/providers' },
						{ label: 'Supported models', link: '/general/supported-models' },
						{ label: 'Chat', link: '/general/chat' },
						{ label: 'Fill in middle', link: '/general/fill-in-middle' },
						{ label: 'Keyboard shortcuts', link: '/general/keyboard-shortcuts' },
						{ label: 'Support twinny', link: '/general/support-twinny' },
					],
				},
			],
			customCss: ['./src/tailwind.css'],
		}),
		tailwind({ applyBaseStyles: false }),
	],
});

import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	site: 'https://github.com/rjmacarthy/twinny-docs.github.io',
	base: '/twinny-docs',
	integrations: [
		starlight({
			title: 'twinny',
			social: {
				github: 'https://github.com/rjmacarthy/twinny',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						{ label: 'Get started', link: '/guides/get-started' },
					],
				},
			],
			customCss: ['./src/tailwind.css'],
		}),
		tailwind({ applyBaseStyles: false }),
	],
});

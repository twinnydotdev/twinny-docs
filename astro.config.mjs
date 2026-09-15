import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

/** Old page paths, kept alive for links out in the wild. */
const legacyRedirects = Object.fromEntries(
	[
		['general/quick-start', 'getting-started/quick-start'],
		['general/providers', 'providers/overview'],
		['general/supported-models', 'providers/supported-models'],
		['general/chat', 'features/chat'],
		['general/fill-in-middle', 'features/code-completion'],
		['general/keyboard-shortcuts', 'reference/keyboard-shortcuts'],
		['general/symmetry', 'providers/devices'],
		['general/support-twinny', 'reference/support'],
	].flatMap(([from, to]) => [
		[`/${from}`, `/twinny-docs/${to}`],
		[`/zh-cn/${from}`, `/twinny-docs/zh-cn/${to}`],
	])
);

const t = (label, zh) => ({ label, translations: { 'zh-CN': zh } });
const page = (label, zh, link) => ({ ...t(label, zh), link });

// https://astro.build/config
export default defineConfig({
	site: 'https://twinnydotdev.github.io',
	base: '/twinny-docs',
	redirects: legacyRedirects,
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
					...t('Getting started', '入门'),
					items: [
						page('Introduction', '简介', '/getting-started/introduction'),
						page('Installation', '安装', '/getting-started/installation'),
						page('Quick start', '快速开始', '/getting-started/quick-start'),
						page('Choosing a model server', '选择模型服务器', '/getting-started/choosing-a-server'),
						page('Troubleshooting', '故障排除', '/getting-started/troubleshooting'),
					],
				},
				{
					...t('Providers', '推理提供者'),
					items: [
						page('Overview', '概述', '/providers/overview'),
						page('Ollama', 'Ollama', '/providers/ollama'),
						page('LM Studio', 'LM Studio', '/providers/lm-studio'),
						page('llama.cpp', 'llama.cpp', '/providers/llama-cpp'),
						page('Other local servers', '其他本地服务器', '/providers/other-local-servers'),
						page('Hosted APIs', '托管 API', '/providers/hosted-apis'),
						page('Devices (P2P)', '设备（P2P）', '/providers/devices'),
						page('Supported models', '支持的模型', '/providers/supported-models'),
						page('Import and export', '导入与导出', '/providers/import-export'),
					],
				},
				{
					...t('Features', '功能'),
					items: [
						page('Code completion', '代码补全', '/features/code-completion'),
						page('Inline edit', '内联编辑', '/features/inline-edit'),
						page('Chat', '对话', '/features/chat'),
						page('Context and mentions', '上下文与提及', '/features/context'),
						page('Workspace index', '工作区索引', '/features/workspace-index'),
						page('Code review', '代码审查', '/features/code-review'),
						page('Commit messages', '提交信息', '/features/commit-messages'),
						page('Terminal', '终端', '/features/terminal'),
						page('Prompt templates', '提示词模板', '/features/templates'),
						page('Status bar, logs and privacy', '状态栏、日志与隐私', '/features/status-and-logs'),
					],
				},
				{
					...t('Teams', '团队'),
					items: [
						page('Overview', '概述', '/teams/overview'),
						page('Run a gateway', '运行网关', '/teams/gateway'),
						page('Connect to your team', '连接到团队', '/teams/connect'),
						page('Team policy', '团队策略', '/teams/policy'),
						page('Licensing and seats', '许可与席位', '/teams/licensing'),
					],
				},
				{
					...t('Reference', '参考'),
					items: [
						page('Settings', '设置', '/reference/settings'),
						page('Commands', '命令', '/reference/commands'),
						page('Keyboard shortcuts', '键盘快捷键', '/reference/keyboard-shortcuts'),
						page('FAQ', '常见问题', '/reference/faq'),
						page('Contributing', '参与贡献', '/reference/contributing'),
						page('Support twinny', '支持 twinny', '/reference/support'),
					],
				},
			],
			customCss: ['./src/tailwind.css'],
		}),
		tailwind({ applyBaseStyles: false }),
	],
});

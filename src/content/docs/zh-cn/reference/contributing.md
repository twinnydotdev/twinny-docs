---
title: 参与贡献
description: 从源码构建 twinny、运行测试，以及代码在哪里。
---

twinny 在 [github.com/twinnydotdev/twinny](https://github.com/twinnydotdev/twinny) 以 MIT 许可证开发。欢迎贡献；小修复之外的改动请先开 issue 描述，以便讨论设计。Pull request 提交到 `development` 分支。

## 构建与运行

要求：Node.js 18 或更新版本、npm 和 VS Code。

```sh
git clone https://github.com/twinnydotdev/twinny.git
cd twinny
npm install
npm run build        # 或：npm run watch
```

在 VS Code 中打开该文件夹并按 `F5`，会启动一个加载了源码版 twinny 的扩展开发宿主。webview 是与扩展一起打包的 React 应用；`npm run watch` 在修改时重建两者。

其他脚本：

| 脚本 | 作用 |
| --- | --- |
| `npm run lint` / `npm run lint:fix` | 对 `src` 运行 ESLint |
| `npm test` | 构建、lint，然后在无头 VS Code 中运行测试套件。没有显示器的 Linux 上用 `xvfb-run npm test` |
| `npm run node` | 从构建产物运行 `twinny-node` P2P 命令行 |
| `npm run vscode:package` | 构建 `.vsix` |

### 构建 VSIX

```sh
npm install
npm run vscode:package
```

在文件夹中生成 `twinny-<version>.vsix`，可用 **Extensions: Install from VSIX...** 安装。

## 目录结构

```
src/
  index.ts              扩展入口：命令、提供者、装配
  common/               扩展与 webview 共享：常量、类型、
                        提供者校验与发现（纯函数，有单元测试）
  extension/
    chat/               对话服务、上下文构建、提及、历史
    completion/         FIM 提供者、模板、解析器、LSP 与最近编辑上下文
    edit/               内联编辑：diff 区域、CodeLens、代码操作、测试
    embeddings/         索引器、分块器、LanceDB 存储、混合搜索、重排序器
    inference/          与提供者无关的适配器（HTTP、托管 SDK）与错误
    p2p/                已配对设备的网关、主机、运行时
    providers/          提供者存储、管理器、探测、首次运行设置
    review/             代码审查、git 辅助、提交信息
    templates/          Handlebars 模板与默认值
    terminal/           命令编写器、错误修复器、shell 集成历史
    webview/            侧边栏与面板宿主、文件处理
  node/                 twinny-node 命令行
  p2p/                  点对点协议、配对与身份（不导入 vscode）
  webview/              React 侧边栏：对话、提供者、设备、嵌入、审查
  test/suite/           在 VS Code 内运行的测试
```

两条值得了解的约定：

- `src/common`、`src/p2p` 以及 `src/extension/*` 中大部分不导入 `vscode` 的代码是**纯**的，有直接的单元测试。新逻辑尽量放在那里，让面向 VS Code 的层保持薄。
- webview 与扩展通过 `src/common/messaging` 中的类型化消息协议通信。在任一侧使用前先在那里添加消息类型。

## 添加提供者预设

1. 在 `src/common/constants/providers.ts` 的 `API_PROVIDERS` 中添加提供者 id，并在 `PROVIDER_DISPLAY_NAMES` 中添加显示名称。
2. 如果是 OpenAI 兼容的本地服务器，加入 `OPEN_AI_COMPATIBLE_PROVIDERS`，并在 `src/common/provider-validation.ts` 中给出端点默认值；若首次运行发现应探测它，加入 `provider-discovery.ts` 的 `LOCAL_SERVER_PROVIDERS`。
3. 如果是托管 API，加入 `HOSTED_PROVIDERS`（没有 completions 端点则也加入 `CHAT_ONLY_PROVIDERS`），并在 `src/extension/inference/adapters/hosted.ts` 中接入 SDK。
4. 在 `src/webview/providers/presets.tsx` 添加预设，并在 `src/webview/assets/locales/` 下每个语言文件中添加 `preset-<id>` 说明。
5. 在 `src/test/suite/inference.test.ts` 添加用例。

## 添加 FIM 模板

在 `src/common/constants/models.ts` 的 `FIM_TEMPLATE_FORMAT` 中添加格式和停止词列表，在 `src/extension/completion/fim-templates.ts` 中添加渲染函数和模型名称提示，并在 `fim-templates.test.ts` 中添加测试。

## 翻译

侧边栏的字符串在 `src/webview/assets/locales/<locale>.json`。添加语言：复制 `en.json`、翻译，并把该语言加入 `package.json` 中 `twinny.locale` 的枚举。修正翻译：直接编辑文件。

本文档位于 [twinnydotdev/twinny-docs](https://github.com/twinnydotdev/twinny-docs)，是一个 Astro Starlight 站点；页面是 `src/content/docs/` 下的 Markdown，中文翻译在 `zh-cn/` 下。`npm run dev` 可预览。

## 报告 bug

提交 issue 时附上 twinny 版本、VS Code 版本、服务器与模型，以及 *Debug* 级别下 Twinny 输出通道的相关行。密钥会自动从日志中脱敏。

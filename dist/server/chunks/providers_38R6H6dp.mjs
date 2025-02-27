import { e as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_D8JpLML5.mjs';
import 'kleur/colors';
import 'clsx';
import 'cssesc';

const html = "<p>这些示例配置作为起点，具体的调整可能需要根据您的硬件和软件环境进行。</p>\n<blockquote>\n<p>注意：Twinny 聊天（非自动补全）应与任何符合 OpenAI API 规范的 API 兼容。</p>\n</blockquote>\n<h3 id=\"ollama默认配置\">Ollama（默认配置）</h3>\n<h4 id=\"自动补全\">自动补全</h4>\n<ul>\n<li><strong>主机名：</strong> <code dir=\"auto\">localhost</code></li>\n<li><strong>端口：</strong> <code dir=\"auto\">11434</code></li>\n<li><strong>路径：</strong> <code dir=\"auto\">/api/generate</code></li>\n<li><strong>模型名称：</strong> <code dir=\"auto\">codellama:7b-code</code></li>\n<li><strong>FIM 模板：</strong> <code dir=\"auto\">codellama</code></li>\n</ul>\n<h4 id=\"聊天\">聊天</h4>\n<ul>\n<li><strong>主机名：</strong> <code dir=\"auto\">localhost</code></li>\n<li><strong>端口：</strong> <code dir=\"auto\">11434</code></li>\n<li><strong>路径：</strong> <code dir=\"auto\">/v1/chat/completions</code></li>\n<li><strong>模型名称：</strong> <code dir=\"auto\">codellama:7b-instruct</code></li>\n</ul>\n<h3 id=\"使用-ollama-打开-webui\">使用 Ollama 打开 WebUI</h3>\n<p>Open WebUI 可作为 Ollama 的代理，简单地配置端点以匹配 OpenWeb UI 提供的服务。</p>\n<h4 id=\"自动补全-1\">自动补全</h4>\n<ul>\n<li><strong>主机名：</strong> <code dir=\"auto\">localhost</code></li>\n<li><strong>端口：</strong> OpenWebUI 服务的端口，通常为 <code dir=\"auto\">8080</code> 或 <code dir=\"auto\">3000</code>。</li>\n<li><strong>路径：</strong> <code dir=\"auto\">/ollama/api/generate</code></li>\n<li><strong>模型名称：</strong> <code dir=\"auto\">codellama:7b-code</code></li>\n<li><strong>FIM 模板：</strong> 选择一个与模型匹配的模板，如 <code dir=\"auto\">codellama</code> 用于 <code dir=\"auto\">codellama:7b-code</code> 或 <code dir=\"auto\">deepseek</code> 用于 <code dir=\"auto\">deepseek-coder</code>。</li>\n</ul>\n<h4 id=\"聊天-1\">聊天</h4>\n<ul>\n<li><strong>主机名：</strong> <code dir=\"auto\">localhost</code></li>\n<li><strong>端口：</strong> OpenWebUI 服务的端口，通常为 <code dir=\"auto\">8080</code> 或 <code dir=\"auto\">3000</code>。</li>\n<li><strong>路径：</strong> <code dir=\"auto\">/ollama/v1/chat/completions</code></li>\n<li><strong>模型名称：</strong> <code dir=\"auto\">codellama:7b-instruct</code> 或任何有效的指令模型。</li>\n</ul>\n<h3 id=\"lm-studio\">LM Studio</h3>\n<h4 id=\"自动补全-2\">自动补全</h4>\n<ul>\n<li><strong>主机名：</strong> <code dir=\"auto\">localhost</code></li>\n<li><strong>端口：</strong> <code dir=\"auto\">1234</code></li>\n<li><strong>路径：</strong> <code dir=\"auto\">/v1/completions</code></li>\n<li><strong>模型名称：</strong> 基础模型，例如 <code dir=\"auto\">codellama-7b.Q5_K_M.gguf</code></li>\n<li><strong>LM Studio 预设：</strong> CodeLlama Completion</li>\n<li><strong>FIM 模板：</strong> 选择一个与模型匹配的模板，如 <code dir=\"auto\">codellama</code> 用于 <code dir=\"auto\">CodeLlama-7B-GGUF</code> 或 <code dir=\"auto\">deepseek</code> 用于 <code dir=\"auto\">deepseek-coder:6.7b-base-q5_K_M</code>。</li>\n</ul>\n<h4 id=\"聊天-2\">聊天</h4>\n<ul>\n<li><strong>主机名：</strong> <code dir=\"auto\">localhost</code></li>\n<li><strong>端口：</strong> <code dir=\"auto\">1234</code></li>\n<li><strong>路径：</strong> <code dir=\"auto\">/v1/chat/completions</code></li>\n<li><strong>模型名称：</strong> <code dir=\"auto\">codellama:7b-instruct</code> 或您偏好的指令模型。</li>\n<li><strong>LM Studio 预设：</strong> 默认或 <code dir=\"auto\">CodeLlama Instruct</code></li>\n</ul>\n<h3 id=\"litellm\">LiteLLM</h3>\n<h4 id=\"自动补全-3\">自动补全</h4>\n<p>LiteLLM 技术上支持使用 <code dir=\"auto\">custom-template</code> FIM 模板进行自动补全，并通过编辑 <code dir=\"auto\">fim.hbs</code> 文件实现，然而结果将根据您的模型和设置有所不同。</p>\n<h4 id=\"聊天-3\">聊天</h4>\n<ul>\n<li><strong>主机名：</strong> <code dir=\"auto\">localhost</code></li>\n<li><strong>端口：</strong> <code dir=\"auto\">4000</code></li>\n<li><strong>路径：</strong> <code dir=\"auto\">/v1/chat/completions</code></li>\n</ul>\n<p>启动 LiteLLM 使用以下命令：</p>\n<div class=\"expressive-code\"><link rel=\"stylesheet\" href=\"/_astro/ec.d6kn2.css\"><script type=\"module\" src=\"/_astro/ec.dy9ns.js\"></script><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre tabindex=\"0\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#82AAFF;--1:#3C63B3\">litellm</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#82AAFF;--1:#3C63B3\">--model</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#ECC48D;--1:#3C63B3\">gpt-4-turbo</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"litellm --model gpt-4-turbo\"><div></div></button></div></figure></div>\n<h3 id=\"llamacpp\">Llama.cpp</h3>\n<h4 id=\"自动补全-4\">自动补全</h4>\n<p>在终端中使用以下 Docker 命令启动 Llama.cpp：</p>\n<p>例如，使用 Docker 和 <code dir=\"auto\">codellama-7b.Q5_K_M.gguf</code>：</p>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre tabindex=\"0\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#82AAFF;--1:#3C63B3\">docker</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#ECC48D;--1:#3C63B3\">run</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#82AAFF;--1:#3C63B3\">-p</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#ECC48D;--1:#3C63B3\">8080:8080</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#82AAFF;--1:#3C63B3\">--gpus</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#ECC48D;--1:#3C63B3\">all</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#82AAFF;--1:#3C63B3\">--network</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#ECC48D;--1:#3C63B3\">bridge</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#82AAFF;--1:#3C63B3\">-v</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#ECC48D;--1:#3C63B3\">/path/to/your/models:/models</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#ECC48D;--1:#3C63B3\">local/llama.cpp:full-cuda</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#82AAFF;--1:#3C63B3\">--server</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#82AAFF;--1:#3C63B3\">-m</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#ECC48D;--1:#3C63B3\">/models/codellama-7b.Q5_K_M.gguf</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#82AAFF;--1:#3C63B3\">-c</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#F78C6C;--1:#AA0982\">2048</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#82AAFF;--1:#3C63B3\">-ngl</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#F78C6C;--1:#AA0982\">43</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#82AAFF;--1:#3C63B3\">-mg</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#F78C6C;--1:#AA0982\">1</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#82AAFF;--1:#3C63B3\">--port</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#F78C6C;--1:#AA0982\">8080</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#82AAFF;--1:#3C63B3\">--host</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#F78C6C;--1:#AA0982\">0.0.0.0</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"docker run -p 8080:8080 --gpus all --network bridge -v /path/to/your/models:/models local/llama.cpp:full-cuda --server -m /models/codellama-7b.Q5_K_M.gguf -c 2048 -ngl 43 -mg 1 --port 8080 --host 0.0.0.0\"><div></div></button></div></figure></div>\n<p>配置您的提供商设置如下：</p>\n<ul>\n<li><strong>主机名：</strong> <code dir=\"auto\">localhost</code></li>\n<li><strong>端口：</strong> <code dir=\"auto\">8080</code></li>\n<li><strong>路径：</strong> <code dir=\"auto\">/completion</code></li>\n<li><strong>FIM 模板：</strong> 选择一个与模型匹配的模板，如 <code dir=\"auto\">codellama</code> 用于 <code dir=\"auto\">CodeLlama-7B-GGUF</code> 或 <code dir=\"auto\">deepseek</code> 用于 <code dir=\"auto\">deepseek-coder:6.7b-base-q5_K_M</code>。</li>\n</ul>\n<h4 id=\"聊天-4\">聊天</h4>\n<p>Llama.cpp 的聊天功能表现不稳定。如果您获得了良好的结果，请通过打开问题或拉取请求与我们分享。</p>\n<ul>\n<li><strong>主机名：</strong> <code dir=\"auto\">localhost</code></li>\n<li><strong>端口：</strong> <code dir=\"auto\">8080</code></li>\n<li><strong>路径：</strong> <code dir=\"auto\">/completion</code></li>\n<li><strong>模型名称：</strong> <code dir=\"auto\">CodeLlama-7B-GGUF</code> 或其他强大的指令模型。</li>\n</ul>\n<h3 id=\"oobabooga\">Oobabooga</h3>\n<div class=\"expressive-code\"><figure class=\"frame is-terminal not-content\"><figcaption class=\"header\"><span class=\"title\"></span><span class=\"sr-only\">Terminal window</span></figcaption><pre tabindex=\"0\"><code><div class=\"ec-line\"><div class=\"code\"><span style=\"--0:#82AAFF;--1:#3C63B3\">bash</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#ECC48D;--1:#3C63B3\">start_linux.sh</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#82AAFF;--1:#3C63B3\">--api</span><span style=\"--0:#D6DEEB;--1:#403F53\"> </span><span style=\"--0:#82AAFF;--1:#3C63B3\">--listen</span></div></div></code></pre><div class=\"copy\"><button title=\"Copy to clipboard\" data-copied=\"Copied!\" data-code=\"bash start_linux.sh --api --listen\"><div></div></button></div></figure></div>\n<h4 id=\"自动补全-5\">自动补全</h4>\n<p>访问 <code dir=\"auto\">http://0.0.0.0:7860/</code> 并加载您的模型：</p>\n<ul>\n<li><strong>主机名：</strong> <code dir=\"auto\">localhost</code></li>\n<li><strong>端口：</strong> <code dir=\"auto\">5000</code></li>\n<li><strong>路径：</strong> <code dir=\"auto\">/v1/completions</code></li>\n<li><strong>模型名称：</strong> <code dir=\"auto\">CodeLlama-7B-GGUF</code> 或其他有效的指令模型。</li>\n<li><strong>FIM 模板：</strong> 选择一个与模型匹配的模板，如 <code dir=\"auto\">codellama</code> 用于 <code dir=\"auto\">CodeLlama-7B-GGUF</code> 或 <code dir=\"auto\">deepseek</code> 用于 <code dir=\"auto\">deepseek-coder:6.7b-base-q5_K_M</code>。</li>\n</ul>\n<h4 id=\"聊天-5\">聊天</h4>\n<p>在 Linux 上，Oobabooga 的聊天功能未能成功：</p>\n<ul>\n<li><strong>主机名：</strong> <code dir=\"auto\">localhost</code></li>\n<li><strong>端口：</strong> <code dir=\"auto\">5000</code></li>\n<li><strong>路径：</strong> <code dir=\"auto\">/v1/chat/completions</code></li>\n<li><strong>模型名称：</strong> <code dir=\"auto\">CodeLlama-7B-GGUF</code></li>\n</ul>\n<h3 id=\"symmetry\">Symmetry</h3>\n<p>Symmetry 是一款去中心化工具，允许您连接到计算资源网络。它可以作为 Twinny 的推理提供商，通过其点对点网络提供访问多种模型的功能。</p>\n<h4 id=\"使用-symmetry\">使用 Symmetry</h4>\n<ol>\n<li>在 Twinny 扩展设置中，选择您想要的模型。</li>\n<li>点击扩展中的 “Connect to Symmetry” 按钮。</li>\n<li>扩展将自动连接到 Symmetry 网络，并使用所选模型。</li>\n</ol>\n<p>这个简化的过程让您可以轻松连接到 Symmetry 网络，无需手动配置。</p>\n<blockquote>\n<p>注意：使用 Symmetry 时，请注意您的请求是由网络中的其他节点处理的。在必要时，请考虑数据的敏感性，并选择可信的提供商。</p>\n</blockquote>";

				const frontmatter = {"title":"推理提供者","description":"推理提供者是将 Twinny 与外部模型和服务连接的一种方式。"};
				const file = "/home/richard/Desktop/twinny/twinny-docs/src/content/docs/zh-cn/general/providers.md";
				const url = undefined;
				function rawContent() {
					return "\n这些示例配置作为起点，具体的调整可能需要根据您的硬件和软件环境进行。\n\n\n> 注意：Twinny 聊天（非自动补全）应与任何符合 OpenAI API 规范的 API 兼容。\n\n\n### Ollama（默认配置）\n\n#### 自动补全\n\n- **主机名：** `localhost`\n- **端口：** `11434`\n- **路径：** `/api/generate`\n- **模型名称：** `codellama:7b-code`\n- **FIM 模板：** `codellama`\n\n#### 聊天\n\n- **主机名：** `localhost`\n- **端口：** `11434`\n- **路径：** `/v1/chat/completions`\n- **模型名称：** `codellama:7b-instruct` \n\n### 使用 Ollama 打开 WebUI\n\nOpen WebUI 可作为 Ollama 的代理，简单地配置端点以匹配 OpenWeb UI 提供的服务。\n\n#### 自动补全\n\n- **主机名：** `localhost`\n- **端口：** OpenWebUI 服务的端口，通常为 `8080` 或 `3000`。\n- **路径：** `/ollama/api/generate`\n- **模型名称：** `codellama:7b-code`\n- **FIM 模板：** 选择一个与模型匹配的模板，如 `codellama` 用于 `codellama:7b-code` 或 `deepseek` 用于 `deepseek-coder`。\n\n#### 聊天\n\n- **主机名：** `localhost`\n- **端口：** OpenWebUI 服务的端口，通常为 `8080` 或 `3000`。\n- **路径：** `/ollama/v1/chat/completions`\n- **模型名称：** `codellama:7b-instruct` 或任何有效的指令模型。\n\n### LM Studio\n\n#### 自动补全\n\n- **主机名：** `localhost`\n- **端口：** `1234`\n- **路径：** `/v1/completions`\n- **模型名称：** 基础模型，例如 `codellama-7b.Q5_K_M.gguf`\n- **LM Studio 预设：** CodeLlama Completion\n- **FIM 模板：** 选择一个与模型匹配的模板，如 `codellama` 用于 `CodeLlama-7B-GGUF` 或 `deepseek` 用于 `deepseek-coder:6.7b-base-q5_K_M`。\n\n#### 聊天\n\n- **主机名：** `localhost`\n- **端口：** `1234`\n- **路径：** `/v1/chat/completions`\n- **模型名称：** `codellama:7b-instruct` 或您偏好的指令模型。\n- **LM Studio 预设：** 默认或 `CodeLlama Instruct`\n\n### LiteLLM\n\n#### 自动补全\n\nLiteLLM 技术上支持使用 `custom-template` FIM 模板进行自动补全，并通过编辑 `fim.hbs` 文件实现，然而结果将根据您的模型和设置有所不同。\n\n#### 聊天\n\n- **主机名：** `localhost`\n- **端口：** `4000`\n- **路径：** `/v1/chat/completions`\n\n启动 LiteLLM 使用以下命令：\n\n```bash\nlitellm --model gpt-4-turbo\n```\n\n### Llama.cpp\n\n#### 自动补全\n\n在终端中使用以下 Docker 命令启动 Llama.cpp：\n\n例如，使用 Docker 和 `codellama-7b.Q5_K_M.gguf`：\n\n```bash\ndocker run -p 8080:8080 --gpus all --network bridge -v /path/to/your/models:/models local/llama.cpp:full-cuda --server -m /models/codellama-7b.Q5_K_M.gguf -c 2048 -ngl 43 -mg 1 --port 8080 --host 0.0.0.0\n```\n\n配置您的提供商设置如下：\n\n- **主机名：** `localhost`\n- **端口：** `8080`\n- **路径：** `/completion`\n- **FIM 模板：** 选择一个与模型匹配的模板，如 `codellama` 用于 `CodeLlama-7B-GGUF` 或 `deepseek` 用于 `deepseek-coder:6.7b-base-q5_K_M`。\n\n#### 聊天\n\nLlama.cpp 的聊天功能表现不稳定。如果您获得了良好的结果，请通过打开问题或拉取请求与我们分享。\n\n- **主机名：** `localhost`\n- **端口：** `8080`\n- **路径：** `/completion`\n- **模型名称：** `CodeLlama-7B-GGUF` 或其他强大的指令模型。\n\n\n### Oobabooga\n\n```bash\nbash start_linux.sh --api --listen\n```\n\n#### 自动补全\n\n访问 `http://0.0.0.0:7860/` 并加载您的模型：\n\n- **主机名：** `localhost`\n- **端口：** `5000`\n- **路径：** `/v1/completions`\n- **模型名称：** `CodeLlama-7B-GGUF` 或其他有效的指令模型。\n- **FIM 模板：** 选择一个与模型匹配的模板，如 `codellama` 用于 `CodeLlama-7B-GGUF` 或 `deepseek` 用于 `deepseek-coder:6.7b-base-q5_K_M`。\n\n#### 聊天\n\n在 Linux 上，Oobabooga 的聊天功能未能成功：\n\n- **主机名：** `localhost`\n- **端口：** `5000`\n- **路径：** `/v1/chat/completions`\n- **模型名称：** `CodeLlama-7B-GGUF`\n\n### Symmetry\n\nSymmetry 是一款去中心化工具，允许您连接到计算资源网络。它可以作为 Twinny 的推理提供商，通过其点对点网络提供访问多种模型的功能。\n\n#### 使用 Symmetry\n\n1. 在 Twinny 扩展设置中，选择您想要的模型。\n2. 点击扩展中的 \"Connect to Symmetry\" 按钮。\n3. 扩展将自动连接到 Symmetry 网络，并使用所选模型。\n\n这个简化的过程让您可以轻松连接到 Symmetry 网络，无需手动配置。\n\n> 注意：使用 Symmetry 时，请注意您的请求是由网络中的其他节点处理的。在必要时，请考虑数据的敏感性，并选择可信的提供商。";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":3,"slug":"ollama默认配置","text":"Ollama（默认配置）"},{"depth":4,"slug":"自动补全","text":"自动补全"},{"depth":4,"slug":"聊天","text":"聊天"},{"depth":3,"slug":"使用-ollama-打开-webui","text":"使用 Ollama 打开 WebUI"},{"depth":4,"slug":"自动补全-1","text":"自动补全"},{"depth":4,"slug":"聊天-1","text":"聊天"},{"depth":3,"slug":"lm-studio","text":"LM Studio"},{"depth":4,"slug":"自动补全-2","text":"自动补全"},{"depth":4,"slug":"聊天-2","text":"聊天"},{"depth":3,"slug":"litellm","text":"LiteLLM"},{"depth":4,"slug":"自动补全-3","text":"自动补全"},{"depth":4,"slug":"聊天-3","text":"聊天"},{"depth":3,"slug":"llamacpp","text":"Llama.cpp"},{"depth":4,"slug":"自动补全-4","text":"自动补全"},{"depth":4,"slug":"聊天-4","text":"聊天"},{"depth":3,"slug":"oobabooga","text":"Oobabooga"},{"depth":4,"slug":"自动补全-5","text":"自动补全"},{"depth":4,"slug":"聊天-5","text":"聊天"},{"depth":3,"slug":"symmetry","text":"Symmetry"},{"depth":4,"slug":"使用-symmetry","text":"使用 Symmetry"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };

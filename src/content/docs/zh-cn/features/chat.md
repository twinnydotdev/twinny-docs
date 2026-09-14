---
title: 对话
description: 在侧边栏就你的代码提问，以文件、符号、问题、git 变更和终端输出为上下文。
---

对话位于 twinny 侧边栏。输入问题并按 `Enter` 或**发送**。回答流式显示，随时可用 `Ctrl+Shift+/` 或停止按钮中断。回答来自当前的**对话**提供者，在提供者标签页用**使用此提供者**选择；空对话会显示将由哪个模型回答。

需要更大空间，或想把侧边栏留给提供者或嵌入标签页时，用 **Open twinny panel chat**（侧边栏顶部的全屏图标）在完整的编辑器标签页中打开对话。

## 添加上下文

在消息框输入 `@` 可附加上下文：文件、符号、当前问题、git diff、终端最后的输出，或工作区索引搜索。右键文件或选区可 **Add file to context** 和 **Add Selection to Context**。发送时编辑器中选中的代码会自动附加。为视觉模型粘贴图片。

每个来源发送的内容及其限制见[上下文与提及](/twinny-docs/zh-cn/features/context/)。

## 回答

回答中的代码块有操作：

- **copy** 复制代码块。
- **new file** 以正确的语言在新的未命名文档中打开。
- **apply** 作为[内联编辑](/twinny-docs/zh-cn/features/inline-edit/#从对话应用代码)放入当前编辑器供你接受或拒绝：有选区时覆盖选区，否则覆盖它重写的行，或插入到光标处。
- **terminal** 把 shell 代码块粘贴到 twinny 终端，按 `Enter` 即可运行。

在消息下方可以**编辑**并重新发送（之后的消息会被丢弃）、**重新生成**回答或**删除**它。使用了 `@workspace` 时，回答下方的 **context** 行显示检索到的分块、重排序分数和预览，并附有在其所在行打开的链接。

## 会话

会话保存在 VS Code 全局状态中，跨会话保留。打开**会话历史**（时钟图标）可搜索、重命名或删除会话，或全部清除；按天分组。**Start a new chat**（加号图标）开始新会话；会话标题由第一轮对话生成。

每条消息都会附带整个会话，因此很长的会话最终会超出模型的上下文。话题变化时请开启新会话。

## 编辑器命令

右键选中的代码可以：

- **Explain**：让对话解释选区。存在工作区索引时会查找相关代码以辅助解释。
- **Refactor**、**Add types**、**Generate docs** 和 **Edit with instruction...**：通过[内联编辑](/twinny-docs/zh-cn/features/inline-edit/)就地修改代码。
- **Write tests**：把测试写入同级测试文件。

## 空对话中的建议

空对话显示一排建议按钮，来自你在 **Manage twinny templates**（书本图标）中启用的模板。每个按钮对当前选区运行该模板。把从不使用的关掉。

## Token 与停止

`twinny.numPredictChat`（512）限制单条回答的长度。回答被截断时可调高；模型自身的上下文窗口仍然适用。`twinny.temperature`（0.2）也作用于对话。

## 自定义提示

系统消息和每个命令的提示都是 `~/.twinny/templates/` 中的 Handlebars 文件。可以改变语气、回答的语言或模型遵循的规则；见[提示词模板](/twinny-docs/zh-cn/features/templates/)。

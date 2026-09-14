---
title: 终端
description: 根据描述编写 shell 命令，以及修复最后的终端错误。
---

两个终端功能都通过 VS Code 的 shell 集成读取命令输出。VS Code 1.93 及以后对 bash、zsh、fish 和 PowerShell 默认开启该集成。twinny 为每个终端保留最后五次运行，每次最多 200 KB 输出，并把相关运行的末尾（200 行或 12,000 字符）发给模型。

## 根据描述编写命令

在命令面板或终端右键菜单运行 **Twinny - Write a terminal command from a description**。

1. 描述你想做的事：“列出 src 下最大的十个文件”、“找出本周新增的 TODO 注释”、“不用缓存重建 docker 镜像”。
2. twinny 为你的 shell 和平台写出一行命令。提示告诉模型 shell、操作系统、工作目录以及上一条命令及其输出，所以“再来一次，但按大小排序”是可行的。
3. 命令出现在输入框中。阅读、按需修改，按 `Enter` 在 **Twinny** 终端中运行，或按 `Escape` 取消。**没有确认不会运行任何东西。**

模型被要求只回复一行且不解释，用管道或 `&&` 而不是脚本，不臆造参数，以及除非请求明确要求，否则绝不包含破坏性命令。无论如何都请读一遍命令；小模型会犯错。

## 修复最后的终端错误

命令失败时，运行 **Twinny - Fix the last terminal error**（命令面板或终端右键）。twinny 读取最后的命令及其输出，去除终端颜色码，并找出其中的文件和行号引用（`src/app.ts:42:7`、`File "main.py", line 12` 等）。然后提供：

- **Fix in editor**：在该行打开第一个引用的文件，选中所在函数（或该行），并以错误信息为指令运行[内联编辑](/twinny-docs/zh-cn/features/inline-edit/)，修复以 diff 形式呈现供你接受或拒绝。
- **Ask in chat**：把命令及其输出发送到对话，附上每个引用行周围的代码（最多三个文件），请求解释和修复。

如果输出没有提到任何文件，只提供对话选项。

## 对话中的 `@terminal`

在任何消息中输入 `@terminal` 可把最后的命令及其输出附加到问题。适合“这个警告是什么意思”或“总结这些测试失败”。

## Twinny 终端

twinny 运行的命令进入名为 **Twinny** 的终端，首次使用时创建，之后复用。对话中带 **terminal** 按钮的代码块也会粘贴到那里，在终端中按 `Enter` 即可运行。

## 说明

- 捕获输出需要开启 shell 集成。如果 twinny 报告没有终端输出，检查 *Terminal › Integrated › Shell Integration: Enabled* 以及 shell 是否受支持。安装 twinny 之前产生的输出不可用。
- 模型看到的就是终端打印的内容。打印到终端的密钥会进入提示；在意的话先清屏。

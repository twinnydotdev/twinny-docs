---
title: 安装
description: 安装、更新和移除 twinny 扩展。
---

## 从应用市场安装

在扩展视图（`Ctrl+Shift+X`）搜索 **twinny** 并点击安装，或打开[应用市场页面](https://marketplace.visualstudio.com/items?itemName=rjmacarthy.twinny)安装。

命令行方式：

```sh
code --install-extension rjmacarthy.twinny
```

## VSCodium 及其他版本

使用 Open VSX 而非微软应用市场的版本可从 [open-vsx.org/extension/rjmacarthy/twinny](https://open-vsx.org/extension/rjmacarthy/twinny) 安装，或：

```sh
codium --install-extension rjmacarthy.twinny
```

## 从 VSIX 文件安装

需要离线安装时，可从源码构建 `.vsix`，然后在命令面板用 **Extensions: Install from VSIX...** 安装，或：

```sh
code --install-extension twinny-<version>.vsix
```

构建只需一分钟，见[参与贡献](/twinny-docs/zh-cn/reference/contributing/#构建-vsix)。

## 远程开发

twinny 是工作区扩展：在 Remote SSH、WSL、Dev Container 或 Codespaces 窗口中，它运行在远程一侧，与你的代码在一起。这意味着：

- 提供者中的 “localhost” 指**远程**机器。如果模型服务器跑在你的笔记本上而代码在容器里，请把提供者指向笔记本的网络地址，或在容器内运行服务器。
- 提供者配置按 VS Code 安装保存。如果你经常切换远程环境，可把 `twinny.providerStorageLocation` 设为 `file` 让列表得以保留，或使用[导出与导入](/twinny-docs/zh-cn/providers/import-export/)。
- 只要远程能通过 UDP 访问网络，[设备](/twinny-docs/zh-cn/providers/devices/)在远程环境中同样可用。

## 安装之后

twinny 随 VS Code 启动而激活。首次启动时它会在本机查找模型服务器，找到则自动设置提供者；否则打开提供者标签页。请按[快速开始](/twinny-docs/zh-cn/getting-started/quick-start/)操作。

你会看到：

- 活动栏中的 **twinny 图标**，用于打开侧边栏；
- 状态栏的 `</>` 图标，工作时显示旋转动画；
- 编辑器右键菜单、资源管理器、终端右键菜单和源代码管理标题栏中的 **Twinny** 项。

## 更新

VS Code 会自动更新扩展。发布说明见[发布页面](https://github.com/twinnydotdev/twinny/releases)。提供者配置、模板和工作区索引在更新后保留。

## 禁用与卸载

- 命令面板中的 **Disable twinny** 关闭扩展但不卸载；**Enable twinny** 重新开启。禁用时状态栏项隐藏。
- 只想停止建议：点击状态栏项切换自动建议，或将 `twinny.autoSuggestEnabled` 设为 `false`。
- 与其他扩展一样在扩展视图中卸载。twinny 在 VS Code 之外创建的文件会保留到你删除为止：`~/.twinny/templates/`（提示词模板）、`~/.twinny/embeddings/`（工作区索引）和 `~/.twinny/node/`（若使用过命令行节点，其 P2P 身份）。

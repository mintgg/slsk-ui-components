# slsk-ui-components

一个可拓展的公共组件库项目，基于 Next.js、shadcn/ui 和 Tailwind CSS 搭建，内置本地可启动、可发布部署的组件文档站点。

## 技术栈

- Next.js App Router
- React + TypeScript
- shadcn/ui + Radix UI
- Tailwind CSS
- MDX 组件文档
- OxLint + TypeScript type check
- pnpm

## 项目结构

```text
.
├── app/                         # Next.js 页面与文档站点
│   └── docs/                    # 组件文档路由
├── components/                  # 文档站点示例与基础 UI
│   └── examples/                # 文档预览示例入口
├── docs/                        # 组件文档源内容
├── lib/                         # 工具函数与文档导航数据
├── src/                         # 组件库源码
│   └── components/              # 公共组件
└── .trae/skills/                # 项目开发 skill
```

## 本地开发

安装依赖：

```bash
pnpm install
```

启动文档站点：

```bash
pnpm dev
```

访问地址：

- 首页：`http://localhost:3000`
- 文档首页：`http://localhost:3000/docs`
- FormInput：`http://localhost:3000/docs/components/form-input`

代码提交

- git add 添加变更文件
- pnpm commit 提交变更

## 组件开发约定

每个组件应至少包含：

```text
src/components/component-name/
├── component-name.tsx
├── component-name.types.ts
├── component-name.example.tsx
└── index.ts
```

组件要求：

- 使用 TypeScript 编写。
- 样式优先使用 Tailwind CSS。
- className 合并使用 `cn` 工具函数。
- 组件 props 应清晰稳定，避免绑定具体业务。
- 示例和文档必须引用真实组件，避免文档与源码脱节。

## 文档约定

组件文档使用 MDX，并通过 Next.js 文档站点展示。每个组件文档页需要包含：

- 组件名称与用途
- 基础示例
- 常见变体示例
- Props/API 说明
- 必要的注意事项

新增组件后，需要同步更新左侧组件菜单数据：

- [docs-navigation.ts](./lib/docs-navigation.ts)

详细流程见：

- [COMPONENT_DOCS_README.md](./COMPONENT_DOCS_README.md)

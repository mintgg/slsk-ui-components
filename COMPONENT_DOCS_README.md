# 组件文档编写说明

这份文档说明在完成一个组件后，如何补充本地可启动、可发布的组件文档。

## 目标

每个组件都应同时具备：

- 组件源码
- 类型定义
- 可运行示例
- MDX 文档页面
- 左侧菜单入口
- 统一导出入口

## 推荐组件结构

以 `input` 为例：

```text
src/components/input/
├── input.tsx
├── input.types.ts
├── input.example.tsx
└── index.ts
```

说明：

- `input.tsx`：组件实现。
- `input.types.ts`：组件类型定义。
- `input.example.tsx`：文档预览示例。
- `index.ts`：组件与类型导出。

## 1. 编写组件源码

在 `src/components/<component-name>/` 下创建组件文件。

示例：

```tsx
export function Input() {
  return <input placeholder="请输入内容" />;
}
```

要求：

- 使用 TypeScript。
- props 类型单独放在 `*.types.ts` 中。
- 样式优先使用 Tailwind CSS。
- className 合并使用 `cn`。
- 不写入具体业务数据。

## 2. 编写组件示例

在组件目录中创建 `*.example.tsx`，用于文档站点的实时预览。

示例：

```tsx
import { Input } from "./input";

export function InputExample() {
  return <Input placeholder="请输入内容" />;
}
```

## 3. 更新组件导出

组件目录的 `index.ts` 需要导出组件、示例和类型。

示例：

```ts
export { Input } from "./input";
export { InputExample } from "./input.example";
export type {
  InputProps,
  InputChangePayload,
  InputStatus,
} from "./input.types";
```

## 4. 创建文档示例入口

在 `components/examples/` 下创建文档站点使用的示例入口。

示例：

```ts
export { InputExample as InputDemo } from "@/src/components/input";
```

推荐文件名：

```text
components/examples/input-demo.tsx
```

## 5. 创建组件 MDX 文档页

每个组件页面必须使用 MDX。

推荐路径：

```text
app/docs/components/input/page.mdx
```

基础模板：

````mdx
import { InputDemo } from "@/components/examples/input-demo";

export const metadata = {
  title: "Input - NX Components",
  description: "Input 组件说明。",
};

# Input

<div className="mt-4 rounded-2xl border bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
  <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
    表单组件
  </div>
  <div className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
    在这里描述输入框组件用途、适用场景和核心能力。
  </div>
</div>

## 组件预览

<div className="mt-6 rounded-2xl border bg-white p-10 shadow-sm">
  <InputDemo />
</div>

## 基础用法

```tsx
import { Input } from "@/src/components/input";

export function Demo() {
  return <Input placeholder="请输入内容" />;
}
```
````

## Props

<div className="grid gap-3">
  <div className="grid gap-2 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-[180px_1fr_120px]">
    <div>
      <div className="font-mono text-sm font-semibold text-slate-950">propName</div>
      <div className="mt-1 text-xs text-muted-foreground">属性说明</div>
    </div>
    <code className="w-fit rounded-md bg-slate-100 px-2 py-1 text-sm text-slate-700">string</code>
    <div className="text-sm text-muted-foreground">默认值：-</div>
  </div>
</div>
```

## 6. 创建组件文档源文件

在 `docs/components/` 下创建同名 MDX 文件，用于沉淀组件说明。

推荐路径：

```text
docs/components/input.mdx
```

内容建议包含：

- 组件介绍
- 引入方式
- 基础用法
- 常见变体
- API 表格
- 注意事项

## 7. 更新左侧组件菜单

新增组件后，必须更新文档导航数据，让左侧菜单显示该组件。

文件：

- [docs-navigation.ts](./lib/docs-navigation.ts)

示例：

```ts
export const componentNavItems: ComponentNavItem[] = [
  {
    title: "Input",
    href: "/docs/components/input",
    description: "支持受控、非受控、清空按钮、校验状态和密码输入的基础输入组件。",
  },
];
```

## 8. 启动本地文档站点

```bash
pnpm dev
```

访问：

```text
http://localhost:3000/docs/components/input
```

确认：

- 页面能正常打开。
- 左侧菜单出现新组件。
- 组件预览可正常渲染。
- Props/API 内容不撑破布局。

检查全部通过后，说明文档页面可本地启动，也可以通过 Next.js 构建后发布部署。

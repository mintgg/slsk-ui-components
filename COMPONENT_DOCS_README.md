# 组件文档编写步骤

这份文档说明新增一个组件后，如何补充组件文档。

## 1. 创建组件目录

在 `src/components/` 下创建组件目录。

示例：

```text
src/components/input/
├── input.tsx
├── input.types.ts
├── input.example.tsx
└── index.ts
```

如果组件有子组件，可以按需增加文件。

示例：

```text
src/components/input/
├── input.tsx
├── password.tsx
├── textarea.tsx
├── input-compound.ts
├── input.types.ts
├── input.example.tsx
└── index.ts
```

## 2. 编写组件实现

在组件目录中创建组件实现文件。

示例：

```tsx
import { cn } from "@/lib/utils";
import type { InputProps } from "./input.types";

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn("rounded-md border border-input px-3 py-2", className)}
    />
  );
}
```

要求：

- 使用 TypeScript。
- Props 类型放到 `*.types.ts`。
- 样式优先使用 Tailwind CSS。
- `className` 合并使用 `cn`。
- 不写具体业务数据。

## 3. 编写 Props 类型

在组件目录中创建 `*.types.ts`。

示例：

```ts
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: "error" | "warning";
}
```

## 4. 编写文档预览示例

在组件目录中创建 `*.example.tsx`。

示例：

```tsx
import { Input } from "./input";

export function InputExample() {
  return <Input placeholder="请输入内容" />;
}
```

示例可以包含常用状态，但不要写成业务页面。

## 5. 更新组件目录导出

更新组件目录的 `index.ts`。

示例：

```ts
export { Input } from "./input";
export { InputExample } from "./input.example";
export type { InputProps } from "./input.types";
```

## 6. 更新组件库导出入口

如果组件需要对外发布，更新：

```text
src/components/index.ts
```

示例：

```ts
export * from "./input";
export * from "./select";
export * from "./switch";
```

如果组件只用于文档内部展示，可以跳过这一步。

## 7. 创建文档 Demo 入口

在 `components/examples/` 下创建文档使用的 Demo 入口。

推荐文件名：

```text
components/examples/input-demo.tsx
```

示例：

```ts
export { InputExample as InputDemo } from "@/src/components/input";
```

## 8. 创建组件 MDX 文档

在 `content/docs/components/` 下创建组件文档。

推荐路径：

```text
content/docs/components/input.mdx
```

基础模板：

````mdx
---
title: Input
description: 支持受控、非受控、清空按钮和校验状态的基础输入组件。
---

import { InputDemo } from "@/components/examples/input-demo";

Input 是基础输入组件，适用于表单输入、搜索条件和配置项编辑等场景。

## 组件预览

<InputDemo />

## 基础用法

```tsx
import { Input } from "@/src/components/input";

export function Demo() {
  return <Input placeholder="请输入内容" />;
}
```

## Props

<table>
  <thead>
    <tr>
      <th>属性</th>
      <th>类型</th>
      <th>说明</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>placeholder</code>
      </td>
      <td>
        <code>string</code>
      </td>
      <td>输入框占位文本。</td>
      <td>-</td>
    </tr>
    <tr>
      <td>
        <code>disabled</code>
      </td>
      <td>
        <code>boolean</code>
      </td>
      <td>是否禁用。</td>
      <td>
        <code>false</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>status</code>
      </td>
      <td>
        <code>{'"error" | "warning"'}</code>
      </td>
      <td>校验状态。</td>
      <td>-</td>
    </tr>
  </tbody>
</table>
````

注意：

- 使用 frontmatter 配置 `title` 和 `description`。
- 组件预览直接写 `<InputDemo />`。
- Props 使用表格展示。

## 9. 更新组件文档导航

更新：

```text
content/docs/components/meta.json
```

把新组件加入 `pages`。

示例：

```json
{
  "title": "Components",
  "pages": ["input", "select", "switch"]
}
```

## 10. 更新文档首页

更新：

```text
content/docs/index.mdx
```

增加新组件入口。

示例：

```mdx
- [Input](/docs/components/input)：支持受控、非受控、清空按钮和校验状态的基础输入组件。
```

## 11. 本地验证

启动文档站点：

```bash
corepack pnpm dev
```

访问新组件页面：

```text
http://localhost:3000/docs/components/input
```

export type ComponentNavItem = {
  title: string;
  href: string;
  description: string;
};

export const componentNavItems: ComponentNavItem[] = [
  {
    title: "Input",
    href: "/docs/components/input",
    description:
      "支持受控、非受控、清空按钮、校验状态、密码输入和多行文本输入的基础输入组件。",
  },
  {
    title: "Select",
    href: "/docs/components/select",
    description: "支持受控、非受控、清空按钮、加载态和校验状态的下拉选择组件。",
  },
  {
    title: "Switch",
    href: "/docs/components/switch",
    description: "支持受控、非受控、加载态、禁用、尺寸和内联文案的开关切换组件。",
  },
];

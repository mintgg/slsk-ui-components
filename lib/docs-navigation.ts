export type ComponentNavItem = {
  title: string;
  href: string;
  description: string;
};

export const componentNavItems: ComponentNavItem[] = [
  {
    title: "FormInput",
    href: "/docs/components/form-input",
    description: "支持受控、非受控、清空按钮和校验状态的表单输入组件。",
  },
  {
    title: "Select",
    href: "/docs/components/select",
    description: "支持受控、非受控、清空按钮、加载态和校验状态的下拉选择组件。",
  },
];

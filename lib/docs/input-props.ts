import type {
  InputChangePayload,
  InputProps,
  PasswordProps,
  TextAreaChangePayload,
  TextAreaProps,
} from "@/src/components/input";

export type PropDocItem<TName extends string = string> = {
  name: TName;
  type: string;
  description: string;
  defaultValue?: string;
};

export const inputPropsDocs = [
  {
    name: "value",
    type: "string",
    description: "受控值",
    defaultValue: "-",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "非受控默认值",
    defaultValue: "-",
  },
  {
    name: "disabled",
    type: "boolean",
    description: "是否禁用",
    defaultValue: "false",
  },
  {
    name: "hideClear",
    type: "boolean",
    description: "是否隐藏清空按钮",
    defaultValue: "false",
  },
  {
    name: "prefix",
    type: "React.ReactNode",
    description: "输入框前缀节点",
    defaultValue: "-",
  },
  {
    name: "suffix",
    type: "React.ReactNode",
    description: "输入框后缀节点",
    defaultValue: "-",
  },
  {
    name: "placeholder",
    type: "string",
    description: "输入框占位文本",
    defaultValue: "-",
  },
  {
    name: "maxLength",
    type: "number",
    description: "最大输入长度",
    defaultValue: "-",
  },
  {
    name: "status",
    type: '"error" | "warning"',
    description: "校验状态，用于错误态或警告态展示",
    defaultValue: "-",
  },
  {
    name: "onChange",
    type: "(payload: InputChangePayload) => void",
    description: "值变化时触发",
    defaultValue: "-",
  },
  {
    name: "onChangeValue",
    type: "(value: string) => void",
    description: "值变化时触发，仅返回当前值",
    defaultValue: "-",
  },
  {
    name: "onPressEnter",
    type: "React.KeyboardEventHandler<HTMLInputElement>",
    description: "回车时触发",
    defaultValue: "-",
  },
] as const satisfies readonly PropDocItem<Extract<keyof InputProps, string>>[];

export const passwordPropsDocs = [
  {
    name: "visibilityToggle",
    type: "boolean | { visible?: boolean; defaultVisible?: boolean; onVisibleChange?: (visible: boolean) => void }",
    description: "是否显示密码可见性切换按钮，或配置受控可见性",
    defaultValue: "true",
  },
] as const satisfies readonly PropDocItem<
  Extract<keyof PasswordProps, string>
>[];

export const textAreaPropsDocs = [
  {
    name: "value",
    type: "string",
    description: "受控值",
    defaultValue: "-",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "非受控默认值",
    defaultValue: "-",
  },
  {
    name: "disabled",
    type: "boolean",
    description: "是否禁用",
    defaultValue: "false",
  },
  {
    name: "placeholder",
    type: "string",
    description: "输入框占位文本",
    defaultValue: "-",
  },
  {
    name: "maxLength",
    type: "number",
    description: "最大输入长度",
    defaultValue: "-",
  },
  {
    name: "readOnly",
    type: "boolean",
    description: "是否只读",
    defaultValue: "false",
  },
  {
    name: "rows",
    type: "number",
    description: "默认可见行数",
    defaultValue: "-",
  },
  {
    name: "autoSize",
    type: "boolean | { minRows?: number; maxRows?: number }",
    description: "是否自动调整高度",
    defaultValue: "false",
  },
  {
    name: "status",
    type: '"error" | "warning"',
    description: "校验状态",
    defaultValue: "-",
  },
  {
    name: "onChange",
    type: "(payload: TextAreaChangePayload) => void",
    description: "值变化时触发",
    defaultValue: "-",
  },
  {
    name: "onChangeValue",
    type: "(value: string) => void",
    description: "值变化时触发，仅返回当前值",
    defaultValue: "-",
  },
] as const satisfies readonly PropDocItem<
  Extract<keyof TextAreaProps, string>
>[];

export const inputChangePayloadDocs = [
  {
    name: "value",
    type: "string",
    description: "当前值",
  },
  {
    name: "event",
    type: "React.ChangeEvent<HTMLInputElement>",
    description: "变化事件",
  },
] as const satisfies readonly PropDocItem<
  Extract<keyof InputChangePayload, string>
>[];

export const textAreaChangePayloadDocs = [
  {
    name: "value",
    type: "string",
    description: "当前值",
  },
  {
    name: "event",
    type: "React.ChangeEvent<HTMLTextAreaElement>",
    description: "变化事件",
  },
] as const satisfies readonly PropDocItem<
  Extract<keyof TextAreaChangePayload, string>
>[];

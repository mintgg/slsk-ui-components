import * as React from 'react';
import React__default, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

type InputStatus = "error" | "warning";
interface InputChangePayload {
    /** 当前值。 */
    value: string;
    /** 变化事件。 */
    event: React__default.ChangeEvent<HTMLInputElement>;
}
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "disabled" | "prefix" | "placeholder" | "maxLength" | "onChange"> {
    /** 受控值。 */
    value?: string;
    /** 非受控默认值。 */
    defaultValue?: string;
    /** 是否禁用。 */
    disabled?: boolean;
    /** 是否隐藏清空按钮。 */
    hideClear?: boolean;
    /** 输入框前缀节点。 */
    prefix?: React__default.ReactNode;
    /** 输入框后缀节点。 */
    suffix?: React__default.ReactNode;
    /** 输入框占位文本。 */
    placeholder?: string;
    /** 最大输入长度。 */
    maxLength?: number;
    /** 校验状态，主要用于表单错误态或警告态展示。 */
    status?: InputStatus;
    /** 值变化时触发。 */
    onChange?: (payload: InputChangePayload) => void;
    /** 值变化时触发，仅返回当前值。 */
    onChangeValue?: (value: string) => void;
    /** 回车时触发。 */
    onPressEnter?: React__default.KeyboardEventHandler<HTMLInputElement>;
}
type PasswordVisibilityToggle = boolean | {
    visible?: boolean;
    defaultVisible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
};
interface PasswordProps extends Omit<InputProps, "type"> {
    /** 是否显示密码可见性切换按钮，或配置受控可见性。 */
    visibilityToggle?: PasswordVisibilityToggle;
}
interface TextAreaChangePayload {
    /** 当前值。 */
    value: string;
    /** 变化事件。 */
    event: React__default.ChangeEvent<HTMLTextAreaElement>;
}
interface TextAreaAutoSize {
    /** 最小行数。 */
    minRows?: number;
    /** 最大行数。 */
    maxRows?: number;
}
interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "defaultValue" | "disabled" | "placeholder" | "maxLength" | "readOnly" | "rows" | "onChange"> {
    /** 受控值。 */
    value?: string;
    /** 非受控默认值。 */
    defaultValue?: string;
    /** 是否禁用。 */
    disabled?: boolean;
    /** 输入框占位文本。 */
    placeholder?: string;
    /** 最大输入长度。 */
    maxLength?: number;
    /** 是否只读。 */
    readOnly?: boolean;
    /** 默认可见行数。 */
    rows?: number;
    /** 是否自动调整高度。 */
    autoSize?: boolean | TextAreaAutoSize;
    /** 校验状态。 */
    status?: InputStatus;
    /** 值变化时触发。 */
    onChange?: (payload: TextAreaChangePayload) => void;
    /** 值变化时触发，仅返回当前值。 */
    onChangeValue?: (value: string) => void;
}

declare const Password: React.ForwardRefExoticComponent<PasswordProps & React.RefAttributes<HTMLInputElement>>;

declare const TextArea: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<HTMLTextAreaElement>>;

type InputComponent = React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>> & {
    Password: typeof Password;
    TextArea: typeof TextArea;
};
declare const Input: InputComponent;

declare function InputExample(): React.JSX.Element;

/**
 * 选择项。
 */
interface SelectOption {
    /**
     * 标签文案。
     */
    label: React__default.ReactNode;
    /**
     * 选项值。
     */
    value: string | number;
    /**
     * 是否禁用。
     */
    disabled?: boolean;
    /**
     * 图标。
     */
    icon?: React__default.ReactNode;
}
/**
 * 选择值类型。
 */
type SelectValue = string | number;
/**
 * 下拉选择变化信息。
 */
interface SelectChangePayload {
    /**
     * 当前值。
     */
    value: SelectValue | undefined;
}
/**
 * 下拉选择可配置项。
 */
interface SelectProps {
    /**
     * 自定义类名。
     */
    className?: string;
    /**
     * 当前值。
     */
    value?: SelectValue;
    /**
     * 非受控默认值。
     */
    defaultValue?: SelectValue;
    /**
     * 是否禁用。
     */
    disabled?: boolean;
    /**
     * 是否显示加载状态。
     */
    loading?: boolean;
    /**
     * 是否隐藏清空按钮。
     */
    hideClear?: boolean;
    /**
     * 输入框占位文本。
     */
    placeholder?: string;
    /**
     * 选项列表。
     */
    options?: SelectOption[];
    /**
     * 校验状态。
     */
    status?: "error" | "warning";
    /**
     * 值变化时触发。
     */
    onChange?: (payload: SelectChangePayload) => void;
    /**
     * 值变化时触发，仅返回当前值。
     */
    onChangeValue?: (value: SelectValue | undefined) => void;
}

declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLButtonElement>>;

declare function SelectExample(): React.JSX.Element;

export { Input, type InputChangePayload, type InputComponent, InputExample, type InputProps, type InputStatus, Password, type PasswordProps, type PasswordVisibilityToggle, Select, type SelectChangePayload, SelectExample, type SelectOption, type SelectProps, type SelectValue, TextArea, type TextAreaAutoSize, type TextAreaChangePayload, type TextAreaProps };

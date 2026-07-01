import * as React from 'react';
import React__default, { InputHTMLAttributes } from 'react';

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

declare const FormInput: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

declare function FormInputExample(): React.JSX.Element;

export { FormInput, FormInputExample, type InputChangePayload, type InputProps, type InputStatus };

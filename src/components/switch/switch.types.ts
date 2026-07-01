import type React from "react";

export type SwitchSize = "small" | "default";

export interface SwitchChangePayload {
  /** 当前值。 */
  value: boolean;
}

export interface SwitchProps {
  /** 自定义类名。 */
  className?: string;
  /** 当前值。 */
  value?: boolean;
  /** 非受控默认值。 */
  defaultValue?: boolean;
  /** 是否禁用。 */
  disabled?: boolean;
  /** 是否加载中。 */
  loading?: boolean;
  /** 尺寸。 */
  size?: SwitchSize;
  /** 选中时文案。 */
  checkedChildren?: React.ReactNode;
  /** 未选中时文案。 */
  unCheckedChildren?: React.ReactNode;
  /** 值变化时触发。 */
  onChange?: (payload: SwitchChangePayload) => void;
  /** 值变化时触发，仅返回当前值。 */
  onChangeValue?: (value: boolean) => void;
}

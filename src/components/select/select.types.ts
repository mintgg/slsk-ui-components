import type React from "react";

/**
 * 选择项。
 */
export interface SelectOption {
  /**
   * 标签文案。
   */
  label: React.ReactNode;
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
  icon?: React.ReactNode;
}

/**
 * 选择值类型。
 */
export type SelectValue = string | number;

/**
 * 下拉选择变化信息。
 */
export interface SelectChangePayload {
  /**
   * 当前值。
   */
  value: SelectValue | undefined;
}

/**
 * 下拉选择可配置项。
 */
export interface SelectProps {
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
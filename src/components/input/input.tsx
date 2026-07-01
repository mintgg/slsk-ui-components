"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InputProps, InputStatus } from "./input.types";

type BaseInputProps = InputProps & {
  extraSuffix?: React.ReactNode;
};

const INPUT_STATUS_CLASS_NAME_MAP: Record<InputStatus, string> = {
  error: "border-red-500 focus-visible:ring-red-500",
  warning: "border-amber-500 focus-visible:ring-amber-500",
};

const SUFFIX_PADDING_CLASS_NAME_MAP = {
  1: "pr-9",
  2: "pr-16",
  3: "pr-24",
} as const;

function getSuffixPaddingClassName(count: number) {
  if (count <= 0) {
    return undefined;
  }

  const normalizedCount = Math.min(
    count,
    3,
  ) as keyof typeof SUFFIX_PADDING_CLASS_NAME_MAP;
  return SUFFIX_PADDING_CLASS_NAME_MAP[normalizedCount];
}

function getInputStatusClassName(status?: InputStatus) {
  return status ? INPUT_STATUS_CLASS_NAME_MAP[status] : undefined;
}

export const InputBase = React.forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      value,
      defaultValue,
      disabled,
      hideClear,
      prefix,
      suffix,
      extraSuffix,
      placeholder,
      maxLength,
      status,
      onChange,
      onChangeValue,
      onPressEnter,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [innerValue, setInnerValue] = React.useState(defaultValue ?? "");
    const currentValue = isControlled ? (value ?? "") : innerValue;
    const canClear = !hideClear && !disabled && currentValue.length > 0;
    const suffixCount = [suffix, canClear, extraSuffix].filter(Boolean).length;
    const suffixPaddingClassName = getSuffixPaddingClassName(suffixCount);
    const statusClassName = getInputStatusClassName(status);

    const emitChange = React.useCallback(
      (nextValue: string, event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setInnerValue(nextValue);
        }

        onChange?.({ value: nextValue, event });
        onChangeValue?.(nextValue);
      },
      [isControlled, onChange, onChangeValue],
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      emitChange(event.target.value, event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      props.onKeyDown?.(event);

      if (!event.defaultPrevented && event.key === "Enter") {
        onPressEnter?.(event);
      }
    };

    const handleClear = () => {
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;

      emitChange("", syntheticEvent);
    };

    return (
      <div className="relative flex items-center">
        {prefix ? (
          <span className="pointer-events-none absolute left-3 text-muted-foreground">
            {prefix}
          </span>
        ) : null}
        <input
          {...props}
          ref={ref}
          value={currentValue}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-invalid={status === "error"}
          data-status={status}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            prefix && "pl-9",
            suffixPaddingClassName,
            statusClassName,
            className,
          )}
        />
        {suffixCount > 0 ? (
          <div className="absolute right-2 flex items-center gap-1">
            {suffix ? (
              <span className="text-muted-foreground">{suffix}</span>
            ) : null}
            {canClear ? (
              <button
                type="button"
                aria-label="清空输入内容"
                className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
            {extraSuffix}
          </div>
        ) : null}
      </div>
    );
  },
);

InputBase.displayName = "Input";

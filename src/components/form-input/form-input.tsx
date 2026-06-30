"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InputProps } from "./form-input.types";

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      defaultValue,
      disabled,
      hideClear,
      prefix,
      suffix,
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
            (suffix || canClear) && "pr-9",
            suffix && canClear && "pr-16",
            status === "error" && "border-red-500 focus-visible:ring-red-500",
            status === "warning" &&
              "border-amber-500 focus-visible:ring-amber-500",
            className,
          )}
          {...props}
        />
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
        </div>
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

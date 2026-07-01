"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SwitchProps } from "./switch.types";

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      value,
      defaultValue = false,
      disabled,
      loading,
      size = "default",
      checkedChildren,
      unCheckedChildren,
      onChange,
      onChangeValue,
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [innerValue, setInnerValue] = React.useState(defaultValue);
    const checked = isControlled ? value : innerValue;

    const isDisabled = disabled || loading;

    const emitChange = React.useCallback(
      (nextValue: boolean) => {
        if (!isControlled) {
          setInnerValue(nextValue);
        }
        onChange?.({ value: nextValue });
        onChangeValue?.(nextValue);
      },
      [isControlled, onChange, onChangeValue],
    );

    const handleClick = () => {
      if (isDisabled) return;
      emitChange(!checked);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        if (!isDisabled) {
          emitChange(!checked);
        }
      }
    };

    const isSmall = size === "small";

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          // track
          "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          isSmall ? "h-4 w-7" : "h-6 w-11",
          checked ? "bg-primary" : "bg-input",
          className,
        )}
      >
        {/* thumb */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none flex items-center justify-center rounded-full bg-white shadow-sm ring-0 transition-transform duration-200",
            isSmall ? "h-3 w-3" : "h-5 w-5",
            isSmall
              ? checked ? "translate-x-3" : "translate-x-0"
              : checked ? "translate-x-5" : "translate-x-0",
          )}
        >
          {loading ? (
            <Loader2
              className={cn(
                "animate-spin text-muted-foreground",
                isSmall ? "h-2 w-2" : "h-3 w-3",
              )}
            />
          ) : null}
        </span>

        {/* inner label */}
        {(checkedChildren || unCheckedChildren) ? (
          <span
            className={cn(
              "absolute flex items-center font-medium text-white transition-opacity duration-200",
              isSmall ? "left-0.5 text-[8px]" : "left-1 text-xs",
              !checked && "opacity-0",
            )}
          >
            {checkedChildren}
          </span>
        ) : null}
        {(checkedChildren || unCheckedChildren) ? (
          <span
            className={cn(
              "absolute flex items-center font-medium text-white/80 transition-opacity duration-200",
              isSmall ? "right-0.5 text-[8px]" : "right-1 text-xs",
              checked && "opacity-0",
            )}
          >
            {unCheckedChildren}
          </span>
        ) : null}
      </button>
    );
  },
);

Switch.displayName = "Switch";

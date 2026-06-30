"use client";

import * as React from "react";
import { ChevronDown, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SelectProps, SelectValue } from "./select.types";

function isSameValue(left: SelectValue | undefined, right: SelectValue | undefined) {
  if (left === undefined || right === undefined) {
    return left === right;
  }

  return String(left) === String(right);
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      value,
      defaultValue,
      disabled,
      loading,
      hideClear,
      placeholder,
      options = [],
      status,
      onChange,
      onChangeValue,
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [innerValue, setInnerValue] = React.useState<SelectValue | undefined>(defaultValue);
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const currentValue = isControlled ? value : innerValue;

    const selectedOption = React.useMemo(
      () => options.find((option) => isSameValue(option.value, currentValue)),
      [currentValue, options],
    );

    const canClear = !hideClear && !disabled && !loading && currentValue !== undefined;

    const emitChange = React.useCallback(
      (nextValue: SelectValue | undefined) => {
        if (!isControlled) {
          setInnerValue(nextValue);
        }

        onChange?.({ value: nextValue });
        onChangeValue?.(nextValue);
      },
      [isControlled, onChange, onChangeValue],
    );

    const handleSelect = (nextValue: SelectValue) => {
      emitChange(nextValue);
      setOpen(false);
    };

    const handleClear = () => {
      emitChange(undefined);
      setOpen(false);
    };

    React.useEffect(() => {
      if (!open) {
        return undefined;
      }

      const handlePointerDown = (event: MouseEvent) => {
        if (!containerRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handlePointerDown);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("mousedown", handlePointerDown);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open]);

    return (
      <div ref={containerRef} className="relative">
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={status === "error"}
          data-status={status}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            !selectedOption && "text-muted-foreground",
            status === "error" && "border-red-500 focus-visible:ring-red-500",
            status === "warning" && "border-amber-500 focus-visible:ring-amber-500",
            className,
          )}
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          <span className="flex min-w-0 items-center gap-2 truncate text-left">
            {selectedOption?.icon ? (
              <span aria-hidden="true" className="text-base leading-none">
                {selectedOption.icon}
              </span>
            ) : null}
            <span className="truncate">{selectedOption?.label ?? placeholder ?? "请选择"}</span>
          </span>

          <span className="ml-3 flex shrink-0 items-center gap-1 text-muted-foreground">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {canClear ? (
              <span
                aria-label="清空选择内容"
                className="inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={(event) => {
                  event.stopPropagation();
                  handleClear();
                }}
              >
                <X className="h-4 w-4" />
              </span>
            ) : null}
            <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
          </span>
        </button>

        {open ? (
          <div className="absolute z-20 mt-2 w-full rounded-md border bg-white p-1 shadow-md">
            {options.length > 0 ? (
              <div role="listbox" className="grid gap-1">
                {options.map((option) => {
                  const selected = isSameValue(option.value, currentValue);

                  return (
                    <button
                      key={String(option.value)}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      disabled={option.disabled}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                        selected && "bg-accent text-accent-foreground",
                        !selected && "hover:bg-accent/60",
                        option.disabled && "cursor-not-allowed opacity-50",
                      )}
                      onClick={() => handleSelect(option.value)}
                    >
                      {option.icon ? (
                        <span aria-hidden="true" className="text-base leading-none">
                          {option.icon}
                        </span>
                      ) : null}
                      <span className="truncate">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">暂无可选项</div>
            )}
          </div>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";
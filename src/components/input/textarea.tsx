"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { InputStatus, TextAreaProps } from "./input.types";

const TEXTAREA_STATUS_CLASS_NAME_MAP: Record<InputStatus, string> = {
  error: "border-red-500 focus-visible:ring-red-500",
  warning: "border-amber-500 focus-visible:ring-amber-500",
};

function getTextAreaStatusClassName(status?: InputStatus) {
  return status ? TEXTAREA_STATUS_CLASS_NAME_MAP[status] : undefined;
}

function getLineHeight(element: HTMLTextAreaElement) {
  const computedStyle = window.getComputedStyle(element);
  const lineHeight = Number.parseFloat(computedStyle.lineHeight);

  if (Number.isFinite(lineHeight)) {
    return lineHeight;
  }

  const fontSize = Number.parseFloat(computedStyle.fontSize);
  return Number.isFinite(fontSize) ? fontSize * 1.5 : 24;
}

function getAutoSizeConfig(autoSize: TextAreaProps["autoSize"]) {
  if (typeof autoSize === "object") {
    return autoSize;
  }

  return undefined;
}

function getRowsHeight(
  rows: number | undefined,
  lineHeight: number,
  verticalOffset: number,
) {
  if (rows === undefined) {
    return undefined;
  }

  return rows * lineHeight + verticalOffset;
}

function getOverflowY(contentHeight: number, maxHeight: number | undefined) {
  if (maxHeight === undefined) {
    return "hidden";
  }

  return contentHeight > maxHeight ? "auto" : "hidden";
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      value,
      defaultValue,
      disabled,
      placeholder,
      maxLength,
      readOnly,
      rows,
      autoSize,
      status,
      onChange,
      onChangeValue,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const isControlled = value !== undefined;
    const [innerValue, setInnerValue] = React.useState(defaultValue ?? "");
    const currentValue = isControlled ? (value ?? "") : innerValue;
    const statusClassName = getTextAreaStatusClassName(status);

    React.useImperativeHandle(
      ref,
      () => textareaRef.current as HTMLTextAreaElement,
    );

    const resizeTextarea = React.useCallback(() => {
      const element = textareaRef.current;

      if (!element || !autoSize) {
        return;
      }

      const autoSizeConfig = getAutoSizeConfig(autoSize);
      const lineHeight = getLineHeight(element);
      const computedStyle = window.getComputedStyle(element);
      const paddingTop = Number.parseFloat(computedStyle.paddingTop) || 0;
      const paddingBottom = Number.parseFloat(computedStyle.paddingBottom) || 0;
      const borderTop = Number.parseFloat(computedStyle.borderTopWidth) || 0;
      const borderBottom =
        Number.parseFloat(computedStyle.borderBottomWidth) || 0;
      const verticalOffset =
        paddingTop + paddingBottom + borderTop + borderBottom;
      const minHeight = getRowsHeight(
        autoSizeConfig?.minRows,
        lineHeight,
        verticalOffset,
      );
      const maxHeight = getRowsHeight(
        autoSizeConfig?.maxRows,
        lineHeight,
        verticalOffset,
      );

      element.style.height = "auto";

      const contentHeight = element.scrollHeight + borderTop + borderBottom;
      let nextHeight = contentHeight;

      if (minHeight !== undefined) {
        nextHeight = Math.max(nextHeight, minHeight);
      }

      if (maxHeight !== undefined) {
        nextHeight = Math.min(nextHeight, maxHeight);
      }

      element.style.overflowY = getOverflowY(contentHeight, maxHeight);
      element.style.height = `${nextHeight}px`;
    }, [autoSize]);

    React.useLayoutEffect(() => {
      resizeTextarea();
    }, [resizeTextarea, currentValue]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.target.value;

      if (!isControlled) {
        setInnerValue(nextValue);
      }

      onChange?.({ value: nextValue, event });
      onChangeValue?.(nextValue);
    };

    return (
      <textarea
        {...props}
        ref={textareaRef}
        value={currentValue}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        readOnly={readOnly}
        rows={rows}
        onChange={handleChange}
        aria-invalid={status === "error"}
        data-status={status}
        style={style}
        className={cn(
          "flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          statusClassName,
          className,
        )}
      />
    );
  },
);

TextArea.displayName = "Input.TextArea";

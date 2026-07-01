"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { InputBase } from "./input";
import type { PasswordProps } from "./input.types";

const PASSWORD_VISIBILITY_STATE_MAP = {
  visible: {
    inputType: "text",
    buttonLabel: "隐藏密码",
    Icon: EyeOff,
  },
  hidden: {
    inputType: "password",
    buttonLabel: "显示密码",
    Icon: Eye,
  },
} as const;

function getPasswordVisibilityStateKey(visible: boolean) {
  return visible ? "visible" : "hidden";
}

export const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
  ({ visibilityToggle = true, disabled, ...props }, ref) => {
    const visibilityConfig =
      typeof visibilityToggle === "object" ? visibilityToggle : undefined;
    const isVisibilityControlled = visibilityConfig?.visible !== undefined;
    const [innerVisible, setInnerVisible] = React.useState(
      visibilityConfig?.defaultVisible ?? false,
    );
    const visible = isVisibilityControlled
      ? Boolean(visibilityConfig?.visible)
      : innerVisible;
    const showVisibilityToggle = visibilityToggle !== false;
    const visibilityState =
      PASSWORD_VISIBILITY_STATE_MAP[getPasswordVisibilityStateKey(visible)];
    const { inputType, buttonLabel, Icon } = visibilityState;

    const handleVisibleChange = () => {
      const nextVisible = !visible;

      if (!isVisibilityControlled) {
        setInnerVisible(nextVisible);
      }

      visibilityConfig?.onVisibleChange?.(nextVisible);
    };

    const visibilityButton = showVisibilityToggle ? (
      <button
        type="button"
        aria-label={buttonLabel}
        disabled={disabled}
        className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleVisibleChange}
      >
        <Icon className="h-4 w-4" />
      </button>
    ) : null;

    return (
      <InputBase
        ref={ref}
        {...props}
        disabled={disabled}
        type={inputType}
        extraSuffix={visibilityButton}
      />
    );
  },
);

Password.displayName = "Input.Password";

"use client";

import * as React from "react";
import { InputBase } from "./input";
import { Password } from "./password";
import { TextArea } from "./textarea";
import type { InputProps } from "./input.types";

export type InputComponent = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
> & {
  Password: typeof Password;
  TextArea: typeof TextArea;
};

export const Input = Object.assign(InputBase, {
  Password,
  TextArea,
}) as InputComponent;

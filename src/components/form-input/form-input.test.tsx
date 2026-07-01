import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FormInput } from "./form-input";

describe("FormInput", () => {
  it("渲染 placeholder 和默认值", () => {
    render(<FormInput placeholder="请输入内容" defaultValue="默认内容" />);

    expect(screen.getByPlaceholderText("请输入内容")).toHaveValue("默认内容");
  });

  it("输入内容时更新非受控值并触发回调", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onChangeValue = vi.fn();

    render(
      <FormInput
        placeholder="请输入内容"
        onChange={onChange}
        onChangeValue={onChangeValue}
      />,
    );

    const input = screen.getByPlaceholderText("请输入内容");

    await user.type(input, "hello");

    expect(input).toHaveValue("hello");
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: "hello" }),
    );
    expect(onChangeValue).toHaveBeenLastCalledWith("hello");
  });

  it("受控模式下不直接修改输入框值，但仍触发回调", async () => {
    const user = userEvent.setup();
    const onChangeValue = vi.fn();

    render(
      <FormInput
        placeholder="请输入内容"
        value="固定值"
        onChangeValue={onChangeValue}
      />,
    );

    const input = screen.getByPlaceholderText("请输入内容");

    await user.type(input, "a");

    expect(input).toHaveValue("固定值");
    expect(onChangeValue).toHaveBeenCalledWith("固定值a");
  });

  it("点击清空按钮时清空非受控值并触发回调", async () => {
    const user = userEvent.setup();
    const onChangeValue = vi.fn();

    render(<FormInput defaultValue="hello" onChangeValue={onChangeValue} />);

    const input = screen.getByDisplayValue("hello");

    await user.click(screen.getByRole("button", { name: "清空输入内容" }));

    expect(input).toHaveValue("");
    expect(onChangeValue).toHaveBeenLastCalledWith("");
  });

  it("hideClear 为 true 时不显示清空按钮", () => {
    render(<FormInput defaultValue="hello" hideClear />);

    expect(screen.queryByRole("button", { name: "清空输入内容" })).toBeNull();
  });

  it("禁用时输入框不可用且不显示清空按钮", async () => {
    const user = userEvent.setup();
    const onChangeValue = vi.fn();

    render(
      <FormInput defaultValue="hello" disabled onChangeValue={onChangeValue} />,
    );

    const input = screen.getByDisplayValue("hello");

    expect(input).toBeDisabled();
    expect(screen.queryByRole("button", { name: "清空输入内容" })).toBeNull();

    await user.type(input, "a");

    expect(input).toHaveValue("hello");
    expect(onChangeValue).not.toHaveBeenCalled();
  });

  it("按下 Enter 时触发 onPressEnter", async () => {
    const user = userEvent.setup();
    const onPressEnter = vi.fn();

    render(<FormInput placeholder="请输入内容" onPressEnter={onPressEnter} />);

    await user.type(screen.getByPlaceholderText("请输入内容"), "{Enter}");

    expect(onPressEnter).toHaveBeenCalledTimes(1);
  });

  it("onKeyDown 阻止默认行为后不触发 onPressEnter", () => {
    const onKeyDown = vi.fn((event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
    });
    const onPressEnter = vi.fn();

    render(
      <FormInput
        placeholder="请输入内容"
        onKeyDown={onKeyDown}
        onPressEnter={onPressEnter}
      />,
    );

    fireEvent.keyDown(screen.getByPlaceholderText("请输入内容"), {
      key: "Enter",
    });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onPressEnter).not.toHaveBeenCalled();
  });

  it("非 Enter 按键不触发 onPressEnter", async () => {
    const user = userEvent.setup();
    const onPressEnter = vi.fn();

    render(<FormInput placeholder="请输入内容" onPressEnter={onPressEnter} />);

    await user.type(screen.getByPlaceholderText("请输入内容"), "a");

    expect(onPressEnter).not.toHaveBeenCalled();
  });

  it("渲染前缀和后缀内容", () => {
    render(<FormInput prefix="￥" suffix="元" placeholder="请输入金额" />);

    expect(screen.getByText("￥")).toBeInTheDocument();
    expect(screen.getByText("元")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入金额")).toHaveClass(
      "pl-9",
      "pr-9",
    );
  });

  it("同时存在后缀和清空按钮时使用更大的右侧内边距", () => {
    render(<FormInput defaultValue="100" suffix="元" />);

    expect(screen.getByDisplayValue("100")).toHaveClass("pr-16");
    expect(
      screen.getByRole("button", { name: "清空输入内容" }),
    ).toBeInTheDocument();
  });

  it("error 状态设置 aria-invalid 和错误样式", () => {
    render(<FormInput placeholder="请输入内容" status="error" />);

    const input = screen.getByPlaceholderText("请输入内容");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("data-status", "error");
    expect(input).toHaveClass("border-red-500", "focus-visible:ring-red-500");
  });

  it("warning 状态设置 data-status 和警告样式", () => {
    render(<FormInput placeholder="请输入内容" status="warning" />);

    const input = screen.getByPlaceholderText("请输入内容");

    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(input).toHaveAttribute("data-status", "warning");
    expect(input).toHaveClass(
      "border-amber-500",
      "focus-visible:ring-amber-500",
    );
  });

  it("限制最大输入长度", async () => {
    const user = userEvent.setup();

    render(<FormInput placeholder="请输入内容" maxLength={3} />);

    const input = screen.getByPlaceholderText("请输入内容");

    await user.type(input, "hello");

    expect(input).toHaveValue("hel");
  });

  it("透传 className 和原生 input 属性", () => {
    render(
      <FormInput
        placeholder="请输入内容"
        className="custom-class"
        name="keyword"
        autoComplete="off"
      />,
    );

    const input = screen.getByPlaceholderText("请输入内容");

    expect(input).toHaveClass("custom-class");
    expect(input).toHaveAttribute("name", "keyword");
    expect(input).toHaveAttribute("autocomplete", "off");
  });

  it("支持 ref 指向 input 元素", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<FormInput ref={ref} placeholder="请输入内容" />);

    expect(ref.current).toBe(screen.getByPlaceholderText("请输入内容"));
  });
});

import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Input, TextArea } from "./index";

function ControlledPassword() {
  const [visible, setVisible] = React.useState(false);

  return (
    <Input.Password
      placeholder="请输入密码"
      visibilityToggle={{ visible, onVisibleChange: setVisible }}
    />
  );
}

describe("Input", () => {
  it("渲染 placeholder 和默认值", () => {
    render(<Input placeholder="请输入内容" defaultValue="默认内容" />);

    expect(screen.getByPlaceholderText("请输入内容")).toHaveValue("默认内容");
  });

  it("输入内容时更新非受控值并触发回调", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onChangeValue = vi.fn();

    render(
      <Input
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
      <Input
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

    render(<Input defaultValue="hello" onChangeValue={onChangeValue} />);

    const input = screen.getByDisplayValue("hello");

    await user.click(screen.getByRole("button", { name: "清空输入内容" }));

    expect(input).toHaveValue("");
    expect(onChangeValue).toHaveBeenLastCalledWith("");
  });

  it("hideClear 为 true 时不显示清空按钮", () => {
    render(<Input defaultValue="hello" hideClear />);

    expect(screen.queryByRole("button", { name: "清空输入内容" })).toBeNull();
  });

  it("禁用时输入框不可用且不显示清空按钮", async () => {
    const user = userEvent.setup();
    const onChangeValue = vi.fn();

    render(<Input defaultValue="hello" disabled onChangeValue={onChangeValue} />);

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

    render(<Input placeholder="请输入内容" onPressEnter={onPressEnter} />);

    await user.type(screen.getByPlaceholderText("请输入内容"), "{Enter}");

    expect(onPressEnter).toHaveBeenCalledTimes(1);
  });

  it("onKeyDown 阻止默认行为后不触发 onPressEnter", () => {
    const onKeyDown = vi.fn((event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
    });
    const onPressEnter = vi.fn();

    render(
      <Input
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

    render(<Input placeholder="请输入内容" onPressEnter={onPressEnter} />);

    await user.type(screen.getByPlaceholderText("请输入内容"), "a");

    expect(onPressEnter).not.toHaveBeenCalled();
  });

  it("渲染前缀和后缀内容", () => {
    render(<Input prefix="￥" suffix="元" placeholder="请输入金额" />);

    expect(screen.getByText("￥")).toBeInTheDocument();
    expect(screen.getByText("元")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("请输入金额")).toHaveClass(
      "pl-9",
      "pr-9",
    );
  });

  it("同时存在后缀和清空按钮时使用更大的右侧内边距", () => {
    render(<Input defaultValue="100" suffix="元" />);

    expect(screen.getByDisplayValue("100")).toHaveClass("pr-16");
    expect(
      screen.getByRole("button", { name: "清空输入内容" }),
    ).toBeInTheDocument();
  });

  it("error 状态设置 aria-invalid 和错误样式", () => {
    render(<Input placeholder="请输入内容" status="error" />);

    const input = screen.getByPlaceholderText("请输入内容");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("data-status", "error");
    expect(input).toHaveClass("border-red-500", "focus-visible:ring-red-500");
  });

  it("warning 状态设置 data-status 和警告样式", () => {
    render(<Input placeholder="请输入内容" status="warning" />);

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

    render(<Input placeholder="请输入内容" maxLength={3} />);

    const input = screen.getByPlaceholderText("请输入内容");

    await user.type(input, "hello");

    expect(input).toHaveValue("hel");
  });

  it("透传 className 和原生 input 属性", () => {
    render(
      <Input
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

    render(<Input ref={ref} placeholder="请输入内容" />);

    expect(ref.current).toBe(screen.getByPlaceholderText("请输入内容"));
  });

  it("Input.Password 默认渲染密码输入框", () => {
    render(<Input.Password placeholder="请输入密码" />);

    expect(screen.getByPlaceholderText("请输入密码")).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("Input.Password 支持切换明文和密文", async () => {
    const user = userEvent.setup();

    render(<Input.Password placeholder="请输入密码" />);

    const input = screen.getByPlaceholderText("请输入密码");

    await user.click(screen.getByRole("button", { name: "显示密码" }));
    expect(input).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: "隐藏密码" }));
    expect(input).toHaveAttribute("type", "password");
  });

  it("Input.Password 支持隐藏可见性切换按钮", () => {
    render(<Input.Password placeholder="请输入密码" visibilityToggle={false} />);

    expect(screen.getByPlaceholderText("请输入密码")).toHaveAttribute(
      "type",
      "password",
    );
    expect(screen.queryByRole("button", { name: "显示密码" })).toBeNull();
  });

  it("Input.Password 支持受控可见性", async () => {
    const user = userEvent.setup();

    render(<ControlledPassword />);

    const input = screen.getByPlaceholderText("请输入密码");

    await user.click(screen.getByRole("button", { name: "显示密码" }));
    expect(input).toHaveAttribute("type", "text");
  });

  it("支持解构 Password 使用", () => {
    const { Password } = Input;

    render(<Password placeholder="请输入密码" />);

    expect(screen.getByPlaceholderText("请输入密码")).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("Input.Password 复用清空能力并处理右侧内边距", () => {
    render(<Input.Password defaultValue="secret" suffix="密码" />);

    expect(screen.getByDisplayValue("secret")).toHaveClass("pr-24");
    expect(screen.getByRole("button", { name: "清空输入内容" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "显示密码" })).toBeInTheDocument();
  });

  it("Input.TextArea 渲染 placeholder、默认值和行数", () => {
    render(
      <Input.TextArea
        placeholder="请输入多行内容"
        defaultValue="默认内容"
        rows={4}
      />,
    );

    const textarea = screen.getByPlaceholderText("请输入多行内容");

    expect(textarea).toHaveValue("默认内容");
    expect(textarea).toHaveAttribute("rows", "4");
  });

  it("Input.TextArea 输入内容时更新非受控值并触发回调", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onChangeValue = vi.fn();

    render(
      <Input.TextArea
        placeholder="请输入多行内容"
        onChange={onChange}
        onChangeValue={onChangeValue}
      />,
    );

    const textarea = screen.getByPlaceholderText("请输入多行内容");

    await user.type(textarea, "hello");

    expect(textarea).toHaveValue("hello");
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ value: "hello" }),
    );
    expect(onChangeValue).toHaveBeenLastCalledWith("hello");
  });

  it("Input.TextArea 受控模式下不直接修改值，但仍触发回调", async () => {
    const user = userEvent.setup();
    const onChangeValue = vi.fn();

    render(
      <Input.TextArea
        placeholder="请输入多行内容"
        value="固定值"
        onChangeValue={onChangeValue}
      />,
    );

    const textarea = screen.getByPlaceholderText("请输入多行内容");

    await user.type(textarea, "a");

    expect(textarea).toHaveValue("固定值");
    expect(onChangeValue).toHaveBeenCalledWith("固定值a");
  });

  it("Input.TextArea 禁用时不可输入", async () => {
    const user = userEvent.setup();
    const onChangeValue = vi.fn();

    render(
      <Input.TextArea
        defaultValue="hello"
        disabled
        onChangeValue={onChangeValue}
      />,
    );

    const textarea = screen.getByDisplayValue("hello");

    expect(textarea).toBeDisabled();

    await user.type(textarea, "a");

    expect(textarea).toHaveValue("hello");
    expect(onChangeValue).not.toHaveBeenCalled();
  });

  it("Input.TextArea 支持只读", () => {
    render(<Input.TextArea placeholder="请输入多行内容" readOnly />);

    expect(screen.getByPlaceholderText("请输入多行内容")).toHaveAttribute("readonly");
  });

  it("Input.TextArea 限制最大输入长度", async () => {
    const user = userEvent.setup();

    render(<Input.TextArea placeholder="请输入多行内容" maxLength={3} />);

    const textarea = screen.getByPlaceholderText("请输入多行内容");

    await user.type(textarea, "hello");

    expect(textarea).toHaveValue("hel");
  });

  it("Input.TextArea error 状态设置 aria-invalid 和错误样式", () => {
    render(<Input.TextArea placeholder="请输入多行内容" status="error" />);

    const textarea = screen.getByPlaceholderText("请输入多行内容");

    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAttribute("data-status", "error");
    expect(textarea).toHaveClass("border-red-500", "focus-visible:ring-red-500");
  });

  it("Input.TextArea warning 状态设置 data-status 和警告样式", () => {
    render(<Input.TextArea placeholder="请输入多行内容" status="warning" />);

    const textarea = screen.getByPlaceholderText("请输入多行内容");

    expect(textarea).toHaveAttribute("aria-invalid", "false");
    expect(textarea).toHaveAttribute("data-status", "warning");
    expect(textarea).toHaveClass(
      "border-amber-500",
      "focus-visible:ring-amber-500",
    );
  });

  it("Input.TextArea 透传 className 和原生 textarea 属性", () => {
    render(
      <Input.TextArea
        placeholder="请输入多行内容"
        className="custom-textarea"
        name="description"
        autoComplete="off"
      />,
    );

    const textarea = screen.getByPlaceholderText("请输入多行内容");

    expect(textarea).toHaveClass("custom-textarea");
    expect(textarea).toHaveAttribute("name", "description");
    expect(textarea).toHaveAttribute("autocomplete", "off");
  });

  it("Input.TextArea 支持 ref 指向 textarea 元素", () => {
    const ref = React.createRef<HTMLTextAreaElement>();

    render(<Input.TextArea ref={ref} placeholder="请输入多行内容" />);

    expect(ref.current).toBe(screen.getByPlaceholderText("请输入多行内容"));
  });

  it("支持解构 TextArea 使用", () => {
    const { TextArea: InputTextArea } = Input;

    render(<InputTextArea placeholder="请输入多行内容" />);

    expect(screen.getByPlaceholderText("请输入多行内容")).toBeInTheDocument();
  });

  it("支持 named export TextArea 使用", () => {
    render(<TextArea placeholder="请输入多行内容" />);

    expect(screen.getByPlaceholderText("请输入多行内容")).toBeInTheDocument();
  });

  it("Input.TextArea 支持 autoSize", () => {
    render(
      <Input.TextArea
        placeholder="请输入多行内容"
        defaultValue="第一行\n第二行"
        autoSize={{ minRows: 2, maxRows: 5 }}
      />,
    );

    expect(screen.getByPlaceholderText("请输入多行内容")).toHaveStyle({
      overflowY: "hidden",
    });
  });

  it("Input.Password 支持 defaultVisible 初始可见", () => {
    render(
      <Input.Password
        placeholder="请输入密码"
        visibilityToggle={{ defaultVisible: true }}
      />,
    );

    expect(screen.getByPlaceholderText("请输入密码")).toHaveAttribute(
      "type",
      "text",
    );
  });

  it("Input.Password 禁用时显隐按钮不可用", () => {
    render(
      <Input.Password disabled placeholder="请输入密码" />,
    );

    expect(screen.getByRole("button", { name: "显示密码" })).toBeDisabled();
  });

  it("无 suffix 时不包含右侧内边距类", () => {
    render(<Input placeholder="请输入内容" />);

    const input = screen.getByPlaceholderText("请输入内容");

    expect(input).not.toHaveClass("pr-9", "pr-16", "pr-24");
  });

  it("Input.TextArea autoSize 处理 minRows=0 和 maxRows=0", () => {
    render(
      <Input.TextArea
        placeholder="请输入多行内容"
        defaultValue="内容"
        autoSize={{ minRows: 0, maxRows: 0 }}
      />,
    );

    expect(screen.getByPlaceholderText("请输入多行内容")).toHaveStyle({
      overflowY: "hidden",
    });
  });

  it("Input.TextArea autoSize={true} 正常生效", () => {
    render(
      <Input.TextArea
        placeholder="请输入多行内容"
        defaultValue="内容"
        autoSize
      />,
    );

    expect(screen.getByPlaceholderText("请输入多行内容")).toHaveStyle({
      overflowY: "hidden",
    });
  });
});

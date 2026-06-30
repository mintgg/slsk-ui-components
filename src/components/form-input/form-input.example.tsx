"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { FormInput } from "./form-input";

export function FormInputExample() {
  const [value, setValue] = React.useState("可编辑的受控值");
  const [enterValue, setEnterValue] = React.useState("-");

  return (
    <div className="grid gap-4 p-4">
      <FormInput
        value={value}
        onChangeValue={setValue}
        placeholder="请输入内容"
      />
      <FormInput defaultValue="默认值" placeholder="非受控输入" />
      <FormInput
        prefix={<Search className="h-4 w-4" />}
        suffix="元"
        maxLength={20}
        placeholder="带前缀、后缀和最大长度"
      />
      <FormInput
        placeholder="输入后按回车"
        onPressEnter={(event) => setEnterValue(event.currentTarget.value)}
      />
      <FormInput status="error" placeholder="错误状态" />
      <FormInput status="warning" placeholder="警告状态" />
      <FormInput disabled defaultValue="禁用状态" />
      <div className="grid gap-1 text-sm text-muted-foreground">
        <div>当前受控值：{value || "空"}</div>
        <div>最近回车值：{enterValue}</div>
      </div>
    </div>
  );
}

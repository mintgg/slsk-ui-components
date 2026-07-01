"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "./input-compound";

export function InputExample() {
  const [value, setValue] = React.useState("可编辑的受控值");
  const [enterValue, setEnterValue] = React.useState("-");
  const { Password, TextArea } = Input;

  return (
    <div className="grid gap-4 p-4">
      <Input value={value} onChangeValue={setValue} placeholder="请输入内容" />
      <Input defaultValue="默认值" placeholder="非受控输入" />
      <Input
        prefix={<Search className="h-4 w-4" />}
        suffix="元"
        maxLength={20}
        placeholder="带前缀、后缀和最大长度"
      />
      <Input
        placeholder="输入后按回车"
        onPressEnter={(event) => setEnterValue(event.currentTarget.value)}
      />
      <Input status="error" placeholder="错误状态" />
      <Input status="warning" placeholder="警告状态" />
      <Input disabled defaultValue="禁用状态" />
      <Input.Password placeholder="请输入密码" />
      <Password placeholder="解构使用 Password" />
      <Input.TextArea placeholder="请输入多行内容" rows={3} />
      <TextArea
        placeholder="解构使用 TextArea"
        autoSize={{ minRows: 2, maxRows: 5 }}
      />
      <div className="grid gap-1 text-sm text-muted-foreground">
        <div>当前受控值：{value || "空"}</div>
        <div>最近回车值：{enterValue}</div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Select } from "./select";
import type { SelectOption, SelectValue } from "./select.types";

const cityOptions: SelectOption[] = [
  { label: "北京", value: "beijing", icon: ""},
  { label: "上海", value: "shanghai", icon: "" },
  { label: "杭州", value: "hangzhou", icon: "" },
  { label: "深圳（禁用）", value: "shenzhen", icon: "", disabled: true },
];

const sizeOptions: SelectOption[] = [
  { label: "小杯", value: "s" },
  { label: "中杯", value: "m" },
  { label: "大杯", value: "l" },
];

export function SelectExample() {
  const [value, setValue] = React.useState<SelectValue | undefined>("shanghai");

  return (
    <div className="grid gap-4 p-4">
      <Select
        value={value}
        options={cityOptions}
        placeholder="请选择城市"
        onChangeValue={setValue}
      />
      <Select defaultValue="m" options={sizeOptions} placeholder="非受控默认值" />
      <Select loading options={cityOptions} placeholder="加载中状态" />
      <Select status="error" options={cityOptions} placeholder="错误状态" />
      <Select status="warning" options={cityOptions} placeholder="警告状态" />
      <Select disabled options={cityOptions} placeholder="禁用状态" />
      <Select hideClear options={cityOptions} placeholder="隐藏清空按钮" />
      <div className="text-sm text-muted-foreground">
        当前受控值：{value === undefined ? "空" : String(value)}
      </div>
    </div>
  );
}
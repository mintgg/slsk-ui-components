"use client";

import * as React from "react";
import { Switch } from "./switch";

export function SwitchExample() {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="grid gap-6 p-4">
      {/* 基础受控 */}
      <div className="flex items-center gap-3">
        <Switch value={checked} onChangeValue={setChecked} />
        <span className="text-sm text-muted-foreground">
          受控值：{checked ? "开" : "关"}
        </span>
      </div>

      {/* 非受控默认值 */}
      <div className="flex items-center gap-3">
        <Switch defaultValue={true} />
        <span className="text-sm text-muted-foreground">非受控默认开启</span>
      </div>

      {/* 带文案 */}
      <div className="flex items-center gap-3">
        <Switch checkedChildren="开" unCheckedChildren="关" />
        <span className="text-sm text-muted-foreground">带内联文案</span>
      </div>

      {/* 小尺寸 */}
      <div className="flex items-center gap-3">
        <Switch size="small" />
        <Switch size="small" defaultValue={true} />
        <span className="text-sm text-muted-foreground">小尺寸</span>
      </div>

      {/* 加载中 */}
      <div className="flex items-center gap-3">
        <Switch loading />
        <Switch loading defaultValue={true} />
        <span className="text-sm text-muted-foreground">加载中状态</span>
      </div>

      {/* 禁用 */}
      <div className="flex items-center gap-3">
        <Switch disabled />
        <Switch disabled defaultValue={true} />
        <span className="text-sm text-muted-foreground">禁用状态</span>
      </div>
    </div>
  );
}

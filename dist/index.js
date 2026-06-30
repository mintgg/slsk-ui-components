import * as React from 'react';
import { X, Search } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsxs, jsx } from 'react/jsx-runtime';

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var FormInput = React.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      value,
      defaultValue,
      disabled,
      hideClear,
      prefix,
      suffix,
      placeholder,
      maxLength,
      status,
      onChange,
      onChangeValue,
      onPressEnter,
      className
    } = _b, props = __objRest(_b, [
      "value",
      "defaultValue",
      "disabled",
      "hideClear",
      "prefix",
      "suffix",
      "placeholder",
      "maxLength",
      "status",
      "onChange",
      "onChangeValue",
      "onPressEnter",
      "className"
    ]);
    const isControlled = value !== void 0;
    const [innerValue, setInnerValue] = React.useState(defaultValue != null ? defaultValue : "");
    const currentValue = isControlled ? value != null ? value : "" : innerValue;
    const canClear = !hideClear && !disabled && currentValue.length > 0;
    const emitChange = React.useCallback(
      (nextValue, event) => {
        if (!isControlled) {
          setInnerValue(nextValue);
        }
        onChange == null ? void 0 : onChange({ value: nextValue, event });
        onChangeValue == null ? void 0 : onChangeValue(nextValue);
      },
      [isControlled, onChange, onChangeValue]
    );
    const handleChange = (event) => {
      emitChange(event.target.value, event);
    };
    const handleKeyDown = (event) => {
      var _a2;
      (_a2 = props.onKeyDown) == null ? void 0 : _a2.call(props, event);
      if (!event.defaultPrevented && event.key === "Enter") {
        onPressEnter == null ? void 0 : onPressEnter(event);
      }
    };
    const handleClear = () => {
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" }
      };
      emitChange("", syntheticEvent);
    };
    return /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
      prefix ? /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-3 text-muted-foreground", children: prefix }) : null,
      /* @__PURE__ */ jsx(
        "input",
        __spreadValues({
          ref,
          value: currentValue,
          disabled,
          placeholder,
          maxLength,
          onChange: handleChange,
          onKeyDown: handleKeyDown,
          "aria-invalid": status === "error",
          "data-status": status,
          className: cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            prefix && "pl-9",
            (suffix || canClear) && "pr-9",
            suffix && canClear && "pr-16",
            status === "error" && "border-red-500 focus-visible:ring-red-500",
            status === "warning" && "border-amber-500 focus-visible:ring-amber-500",
            className
          )
        }, props)
      ),
      /* @__PURE__ */ jsxs("div", { className: "absolute right-2 flex items-center gap-1", children: [
        suffix ? /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: suffix }) : null,
        canClear ? /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": "\u6E05\u7A7A\u8F93\u5165\u5185\u5BB9",
            className: "inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: handleClear,
            children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
          }
        ) : null
      ] })
    ] });
  }
);
FormInput.displayName = "FormInput";
function FormInputExample() {
  const [value, setValue] = React.useState("\u53EF\u7F16\u8F91\u7684\u53D7\u63A7\u503C");
  const [enterValue, setEnterValue] = React.useState("-");
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-4 p-4", children: [
    /* @__PURE__ */ jsx(
      FormInput,
      {
        value,
        onChangeValue: setValue,
        placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
      }
    ),
    /* @__PURE__ */ jsx(FormInput, { defaultValue: "\u9ED8\u8BA4\u503C", placeholder: "\u975E\u53D7\u63A7\u8F93\u5165" }),
    /* @__PURE__ */ jsx(
      FormInput,
      {
        prefix: /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }),
        suffix: "\u5143",
        maxLength: 20,
        placeholder: "\u5E26\u524D\u7F00\u3001\u540E\u7F00\u548C\u6700\u5927\u957F\u5EA6"
      }
    ),
    /* @__PURE__ */ jsx(
      FormInput,
      {
        placeholder: "\u8F93\u5165\u540E\u6309\u56DE\u8F66",
        onPressEnter: (event) => setEnterValue(event.currentTarget.value)
      }
    ),
    /* @__PURE__ */ jsx(FormInput, { status: "error", placeholder: "\u9519\u8BEF\u72B6\u6001" }),
    /* @__PURE__ */ jsx(FormInput, { status: "warning", placeholder: "\u8B66\u544A\u72B6\u6001" }),
    /* @__PURE__ */ jsx(FormInput, { disabled: true, defaultValue: "\u7981\u7528\u72B6\u6001" }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-1 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        "\u5F53\u524D\u53D7\u63A7\u503C\uFF1A",
        value || "\u7A7A"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "\u6700\u8FD1\u56DE\u8F66\u503C\uFF1A",
        enterValue
      ] })
    ] })
  ] });
}

export { FormInput, FormInputExample };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
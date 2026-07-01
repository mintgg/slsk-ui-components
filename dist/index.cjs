'use strict';

var React5 = require('react');
var lucideReact = require('lucide-react');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React5__namespace = /*#__PURE__*/_interopNamespace(React5);

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
var INPUT_STATUS_CLASS_NAME_MAP = {
  error: "border-red-500 focus-visible:ring-red-500",
  warning: "border-amber-500 focus-visible:ring-amber-500"
};
var SUFFIX_PADDING_CLASS_NAME_MAP = {
  1: "pr-9",
  2: "pr-16",
  3: "pr-24"
};
function getSuffixPaddingClassName(count) {
  if (count <= 0) {
    return void 0;
  }
  const normalizedCount = Math.min(
    count,
    3
  );
  return SUFFIX_PADDING_CLASS_NAME_MAP[normalizedCount];
}
function getInputStatusClassName(status) {
  return status ? INPUT_STATUS_CLASS_NAME_MAP[status] : void 0;
}
var InputBase = React5__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      value,
      defaultValue,
      disabled,
      hideClear,
      prefix,
      suffix,
      extraSuffix,
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
      "extraSuffix",
      "placeholder",
      "maxLength",
      "status",
      "onChange",
      "onChangeValue",
      "onPressEnter",
      "className"
    ]);
    const isControlled = value !== void 0;
    const [innerValue, setInnerValue] = React5__namespace.useState(defaultValue != null ? defaultValue : "");
    const currentValue = isControlled ? value != null ? value : "" : innerValue;
    const canClear = !hideClear && !disabled && currentValue.length > 0;
    const suffixCount = [suffix, canClear, extraSuffix].filter(Boolean).length;
    const suffixPaddingClassName = getSuffixPaddingClassName(suffixCount);
    const statusClassName = getInputStatusClassName(status);
    const emitChange = React5__namespace.useCallback(
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
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative flex items-center", children: [
      prefix ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "pointer-events-none absolute left-3 text-muted-foreground", children: prefix }) : null,
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        __spreadProps(__spreadValues({}, props), {
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
            suffixPaddingClassName,
            statusClassName,
            className
          )
        })
      ),
      suffixCount > 0 ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "absolute right-2 flex items-center gap-1", children: [
        suffix ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: suffix }) : null,
        canClear ? /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            "aria-label": "\u6E05\u7A7A\u8F93\u5165\u5185\u5BB9",
            className: "inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
            onClick: handleClear,
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" })
          }
        ) : null,
        extraSuffix
      ] }) : null
    ] });
  }
);
InputBase.displayName = "Input";
var PASSWORD_VISIBILITY_STATE_MAP = {
  visible: {
    inputType: "text",
    buttonLabel: "\u9690\u85CF\u5BC6\u7801",
    Icon: lucideReact.EyeOff
  },
  hidden: {
    inputType: "password",
    buttonLabel: "\u663E\u793A\u5BC6\u7801",
    Icon: lucideReact.Eye
  }
};
function getPasswordVisibilityStateKey(visible) {
  return visible ? "visible" : "hidden";
}
var Password = React5__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, { visibilityToggle = true, disabled } = _b, props = __objRest(_b, ["visibilityToggle", "disabled"]);
    var _a2;
    const visibilityConfig = typeof visibilityToggle === "object" ? visibilityToggle : void 0;
    const isVisibilityControlled = (visibilityConfig == null ? void 0 : visibilityConfig.visible) !== void 0;
    const [innerVisible, setInnerVisible] = React5__namespace.useState(
      (_a2 = visibilityConfig == null ? void 0 : visibilityConfig.defaultVisible) != null ? _a2 : false
    );
    const visible = isVisibilityControlled ? Boolean(visibilityConfig == null ? void 0 : visibilityConfig.visible) : innerVisible;
    const showVisibilityToggle = visibilityToggle !== false;
    const visibilityState = PASSWORD_VISIBILITY_STATE_MAP[getPasswordVisibilityStateKey(visible)];
    const { inputType, buttonLabel, Icon } = visibilityState;
    const handleVisibleChange = () => {
      var _a3;
      const nextVisible = !visible;
      if (!isVisibilityControlled) {
        setInnerVisible(nextVisible);
      }
      (_a3 = visibilityConfig == null ? void 0 : visibilityConfig.onVisibleChange) == null ? void 0 : _a3.call(visibilityConfig, nextVisible);
    };
    const visibilityButton = showVisibilityToggle ? /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        "aria-label": buttonLabel,
        disabled,
        className: "inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50",
        onClick: handleVisibleChange,
        children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { className: "h-4 w-4" })
      }
    ) : null;
    return /* @__PURE__ */ jsxRuntime.jsx(
      InputBase,
      __spreadProps(__spreadValues({
        ref
      }, props), {
        disabled,
        type: inputType,
        extraSuffix: visibilityButton
      })
    );
  }
);
Password.displayName = "Input.Password";
var TEXTAREA_STATUS_CLASS_NAME_MAP = {
  error: "border-red-500 focus-visible:ring-red-500",
  warning: "border-amber-500 focus-visible:ring-amber-500"
};
function getTextAreaStatusClassName(status) {
  return status ? TEXTAREA_STATUS_CLASS_NAME_MAP[status] : void 0;
}
function getLineHeight(element) {
  const computedStyle = window.getComputedStyle(element);
  const lineHeight = Number.parseFloat(computedStyle.lineHeight);
  if (Number.isFinite(lineHeight)) {
    return lineHeight;
  }
  const fontSize = Number.parseFloat(computedStyle.fontSize);
  return Number.isFinite(fontSize) ? fontSize * 1.5 : 24;
}
function getAutoSizeConfig(autoSize) {
  if (typeof autoSize === "object") {
    return autoSize;
  }
  return void 0;
}
function getRowsHeight(rows, lineHeight, verticalOffset) {
  if (rows === void 0) {
    return void 0;
  }
  return rows * lineHeight + verticalOffset;
}
function getOverflowY(contentHeight, maxHeight) {
  if (maxHeight === void 0) {
    return "hidden";
  }
  return contentHeight > maxHeight ? "auto" : "hidden";
}
var TextArea = React5__namespace.forwardRef(
  (_a, ref) => {
    var _b = _a, {
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
      style
    } = _b, props = __objRest(_b, [
      "value",
      "defaultValue",
      "disabled",
      "placeholder",
      "maxLength",
      "readOnly",
      "rows",
      "autoSize",
      "status",
      "onChange",
      "onChangeValue",
      "className",
      "style"
    ]);
    const textareaRef = React5__namespace.useRef(null);
    const isControlled = value !== void 0;
    const [innerValue, setInnerValue] = React5__namespace.useState(defaultValue != null ? defaultValue : "");
    const currentValue = isControlled ? value != null ? value : "" : innerValue;
    const statusClassName = getTextAreaStatusClassName(status);
    React5__namespace.useImperativeHandle(
      ref,
      () => textareaRef.current
    );
    const resizeTextarea = React5__namespace.useCallback(() => {
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
      const borderBottom = Number.parseFloat(computedStyle.borderBottomWidth) || 0;
      const verticalOffset = paddingTop + paddingBottom + borderTop + borderBottom;
      const minHeight = getRowsHeight(
        autoSizeConfig == null ? void 0 : autoSizeConfig.minRows,
        lineHeight,
        verticalOffset
      );
      const maxHeight = getRowsHeight(
        autoSizeConfig == null ? void 0 : autoSizeConfig.maxRows,
        lineHeight,
        verticalOffset
      );
      element.style.height = "auto";
      const contentHeight = element.scrollHeight + borderTop + borderBottom;
      let nextHeight = contentHeight;
      if (minHeight !== void 0) {
        nextHeight = Math.max(nextHeight, minHeight);
      }
      if (maxHeight !== void 0) {
        nextHeight = Math.min(nextHeight, maxHeight);
      }
      element.style.overflowY = getOverflowY(contentHeight, maxHeight);
      element.style.height = `${nextHeight}px`;
    }, [autoSize]);
    React5__namespace.useLayoutEffect(() => {
      resizeTextarea();
    }, [resizeTextarea, currentValue]);
    const handleChange = (event) => {
      const nextValue = event.target.value;
      if (!isControlled) {
        setInnerValue(nextValue);
      }
      onChange == null ? void 0 : onChange({ value: nextValue, event });
      onChangeValue == null ? void 0 : onChangeValue(nextValue);
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "textarea",
      __spreadProps(__spreadValues({}, props), {
        ref: textareaRef,
        value: currentValue,
        disabled,
        placeholder,
        maxLength,
        readOnly,
        rows,
        onChange: handleChange,
        "aria-invalid": status === "error",
        "data-status": status,
        style,
        className: cn(
          "flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          statusClassName,
          className
        )
      })
    );
  }
);
TextArea.displayName = "Input.TextArea";

// src/components/input/input-compound.ts
var Input = Object.assign(InputBase, {
  Password,
  TextArea
});
function InputExample() {
  const [value, setValue] = React5__namespace.useState("\u53EF\u7F16\u8F91\u7684\u53D7\u63A7\u503C");
  const [enterValue, setEnterValue] = React5__namespace.useState("-");
  const { Password: Password2, TextArea: TextArea2 } = Input;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4 p-4", children: [
    /* @__PURE__ */ jsxRuntime.jsx(Input, { value, onChangeValue: setValue, placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9" }),
    /* @__PURE__ */ jsxRuntime.jsx(Input, { defaultValue: "\u9ED8\u8BA4\u503C", placeholder: "\u975E\u53D7\u63A7\u8F93\u5165" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      Input,
      {
        prefix: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { className: "h-4 w-4" }),
        suffix: "\u5143",
        maxLength: 20,
        placeholder: "\u5E26\u524D\u7F00\u3001\u540E\u7F00\u548C\u6700\u5927\u957F\u5EA6"
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      Input,
      {
        placeholder: "\u8F93\u5165\u540E\u6309\u56DE\u8F66",
        onPressEnter: (event) => setEnterValue(event.currentTarget.value)
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(Input, { status: "error", placeholder: "\u9519\u8BEF\u72B6\u6001" }),
    /* @__PURE__ */ jsxRuntime.jsx(Input, { status: "warning", placeholder: "\u8B66\u544A\u72B6\u6001" }),
    /* @__PURE__ */ jsxRuntime.jsx(Input, { disabled: true, defaultValue: "\u7981\u7528\u72B6\u6001" }),
    /* @__PURE__ */ jsxRuntime.jsx(Input.Password, { placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801" }),
    /* @__PURE__ */ jsxRuntime.jsx(Password2, { placeholder: "\u89E3\u6784\u4F7F\u7528 Password" }),
    /* @__PURE__ */ jsxRuntime.jsx(Input.TextArea, { placeholder: "\u8BF7\u8F93\u5165\u591A\u884C\u5185\u5BB9", rows: 3 }),
    /* @__PURE__ */ jsxRuntime.jsx(
      TextArea2,
      {
        placeholder: "\u89E3\u6784\u4F7F\u7528 TextArea",
        autoSize: { minRows: 2, maxRows: 5 }
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-1 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        "\u5F53\u524D\u53D7\u63A7\u503C\uFF1A",
        value || "\u7A7A"
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        "\u6700\u8FD1\u56DE\u8F66\u503C\uFF1A",
        enterValue
      ] })
    ] })
  ] });
}
function isSameValue(left, right) {
  if (left === void 0 || right === void 0) {
    return left === right;
  }
  return String(left) === String(right);
}
var Select = React5__namespace.forwardRef(
  ({
    className,
    value,
    defaultValue,
    disabled,
    loading,
    hideClear,
    placeholder,
    options = [],
    status,
    onChange,
    onChangeValue
  }, ref) => {
    var _a, _b;
    const isControlled = value !== void 0;
    const [innerValue, setInnerValue] = React5__namespace.useState(defaultValue);
    const [open, setOpen] = React5__namespace.useState(false);
    const containerRef = React5__namespace.useRef(null);
    const currentValue = isControlled ? value : innerValue;
    const selectedOption = React5__namespace.useMemo(
      () => options.find((option) => isSameValue(option.value, currentValue)),
      [currentValue, options]
    );
    const canClear = !hideClear && !disabled && !loading && currentValue !== void 0;
    const emitChange = React5__namespace.useCallback(
      (nextValue) => {
        if (!isControlled) {
          setInnerValue(nextValue);
        }
        onChange == null ? void 0 : onChange({ value: nextValue });
        onChangeValue == null ? void 0 : onChangeValue(nextValue);
      },
      [isControlled, onChange, onChangeValue]
    );
    const handleSelect = (nextValue) => {
      emitChange(nextValue);
      setOpen(false);
    };
    const handleClear = () => {
      emitChange(void 0);
      setOpen(false);
    };
    React5__namespace.useEffect(() => {
      if (!open) {
        return void 0;
      }
      const handlePointerDown = (event) => {
        var _a2;
        if (!((_a2 = containerRef.current) == null ? void 0 : _a2.contains(event.target))) {
          setOpen(false);
        }
      };
      const handleEscape = (event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handlePointerDown);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handlePointerDown);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open]);
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref: containerRef, className: "relative", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          ref,
          type: "button",
          disabled,
          "aria-haspopup": "listbox",
          "aria-expanded": open,
          "aria-invalid": status === "error",
          "data-status": status,
          className: cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            !selectedOption && "text-muted-foreground",
            status === "error" && "border-red-500 focus-visible:ring-red-500",
            status === "warning" && "border-amber-500 focus-visible:ring-amber-500",
            className
          ),
          onClick: () => setOpen((prevOpen) => !prevOpen),
          children: [
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex min-w-0 items-center gap-2 truncate text-left", children: [
              (selectedOption == null ? void 0 : selectedOption.icon) ? /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", className: "text-base leading-none", children: selectedOption.icon }) : null,
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: (_b = (_a = selectedOption == null ? void 0 : selectedOption.label) != null ? _a : placeholder) != null ? _b : "\u8BF7\u9009\u62E9" })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "ml-3 flex shrink-0 items-center gap-1 text-muted-foreground", children: [
              loading ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "h-4 w-4 animate-spin" }) : null,
              canClear ? /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  "aria-label": "\u6E05\u7A7A\u9009\u62E9\u5185\u5BB9",
                  className: "inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                  onClick: (event) => {
                    event.stopPropagation();
                    handleClear();
                  },
                  children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" })
                }
              ) : null,
              /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: cn("h-4 w-4 transition-transform", open && "rotate-180") })
            ] })
          ]
        }
      ),
      open ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute z-20 mt-2 w-full rounded-md border bg-white p-1 shadow-md", children: options.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx("div", { role: "listbox", className: "grid gap-1", children: options.map((option) => {
        const selected = isSameValue(option.value, currentValue);
        return /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            role: "option",
            "aria-selected": selected,
            disabled: option.disabled,
            className: cn(
              "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
              selected && "bg-accent text-accent-foreground",
              !selected && "hover:bg-accent/60",
              option.disabled && "cursor-not-allowed opacity-50"
            ),
            onClick: () => handleSelect(option.value),
            children: [
              option.icon ? /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", className: "text-base leading-none", children: option.icon }) : null,
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: option.label })
            ]
          },
          String(option.value)
        );
      }) }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-3 py-2 text-sm text-muted-foreground", children: "\u6682\u65E0\u53EF\u9009\u9879" }) }) : null
    ] });
  }
);
Select.displayName = "Select";
var cityOptions = [
  { label: "\u5317\u4EAC", value: "beijing", icon: "" },
  { label: "\u4E0A\u6D77", value: "shanghai", icon: "" },
  { label: "\u676D\u5DDE", value: "hangzhou", icon: "" },
  { label: "\u6DF1\u5733\uFF08\u7981\u7528\uFF09", value: "shenzhen", icon: "", disabled: true }
];
var sizeOptions = [
  { label: "\u5C0F\u676F", value: "s" },
  { label: "\u4E2D\u676F", value: "m" },
  { label: "\u5927\u676F", value: "l" }
];
function SelectExample() {
  const [value, setValue] = React5__namespace.useState("shanghai");
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4 p-4", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      Select,
      {
        value,
        options: cityOptions,
        placeholder: "\u8BF7\u9009\u62E9\u57CE\u5E02",
        onChangeValue: setValue
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(Select, { defaultValue: "m", options: sizeOptions, placeholder: "\u975E\u53D7\u63A7\u9ED8\u8BA4\u503C" }),
    /* @__PURE__ */ jsxRuntime.jsx(Select, { loading: true, options: cityOptions, placeholder: "\u52A0\u8F7D\u4E2D\u72B6\u6001" }),
    /* @__PURE__ */ jsxRuntime.jsx(Select, { status: "error", options: cityOptions, placeholder: "\u9519\u8BEF\u72B6\u6001" }),
    /* @__PURE__ */ jsxRuntime.jsx(Select, { status: "warning", options: cityOptions, placeholder: "\u8B66\u544A\u72B6\u6001" }),
    /* @__PURE__ */ jsxRuntime.jsx(Select, { disabled: true, options: cityOptions, placeholder: "\u7981\u7528\u72B6\u6001" }),
    /* @__PURE__ */ jsxRuntime.jsx(Select, { hideClear: true, options: cityOptions, placeholder: "\u9690\u85CF\u6E05\u7A7A\u6309\u94AE" }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm text-muted-foreground", children: [
      "\u5F53\u524D\u53D7\u63A7\u503C\uFF1A",
      value === void 0 ? "\u7A7A" : String(value)
    ] })
  ] });
}

exports.Input = Input;
exports.InputExample = InputExample;
exports.Password = Password;
exports.Select = Select;
exports.SelectExample = SelectExample;
exports.TextArea = TextArea;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { MDXComponents } from "mdx/types.js";

type MDXComponentProps = {
  children?: ReactNode;
};

type CodeProps = ComponentPropsWithoutRef<"code">;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }: MDXComponentProps) => (
      <h1 className="text-4xl font-bold tracking-tight text-slate-950 ">
        {children}
      </h1>
    ),
    h2: ({ children }: MDXComponentProps) => (
      <h2 className="mt-12 border-b pb-3 text-2xl font-semibold tracking-tight text-slate-950 p-4">
        {children}
      </h2>
    ),
    p: ({ children }: MDXComponentProps) => (
      <div className="mt-4 leading-7 text-muted-foreground">{children}</div>
    ),
    table: ({ children }: MDXComponentProps) => (
      <div className="mt-5 overflow-x-auto rounded-2xl bg-white">
        <table className="min-w-[760px] text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }: MDXComponentProps) => (
      <thead className="bg-slate-50 text-left text-slate-700 p-4">
        {children}
      </thead>
    ),
    tr: ({ children }: MDXComponentProps) => (
      <tr className="border-t first:border-t-0">{children}</tr>
    ),
    th: ({ children }: MDXComponentProps) => (
      <th className="whitespace-nowrap px-4 py-3 font-semibold">{children}</th>
    ),
    td: ({ children }: MDXComponentProps) => (
      <td className="max-w-[360px] px-4 py-3 align-top text-muted-foreground">
        {children}
      </td>
    ),
    pre: ({ children }: MDXComponentProps) => (
      <pre className="mt-6 rounded-2xl border bg-white p-10 shadow-sm">
        {children}
      </pre>
    ),
    code: ({ children, className }: CodeProps) => (
      <code
        className={[
          "rounded-md px-1.5 py-0.5 text-[0.9em]",
          className ?? "bg-slate-100 text-slate-800",
        ].join(" ")}
      >
        {children}
      </code>
    ),
    ...components,
  };
}

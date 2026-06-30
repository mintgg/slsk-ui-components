declare module "*.mdx" {
  import type { ComponentType } from "react";

  const MDXComponent: ComponentType;
  export default MDXComponent;
}

declare module "mdx/types.js" {
  export type MDXComponents = Record<
    string,
    React.ComponentType<Record<string, unknown>>
  >;
}

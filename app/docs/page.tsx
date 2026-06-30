import Link from "next/link";
import { componentNavItems } from "@/lib/docs-navigation";

export default function DocsPage() {
  return (
    <div className="grid gap-8">
      <div className="grid gap-3">
        <h1 className="text-3xl font-bold tracking-tight">组件文档</h1>
        <p className="text-muted-foreground">
          这里列出当前组件库已提供的组件和使用说明。
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {componentNavItems.map((component) => (
          <Link
            key={component.href}
            href={component.href}
            className="rounded-xl border p-5 transition-colors hover:bg-accent"
          >
            <h2 className="font-semibold">{component.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {component.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

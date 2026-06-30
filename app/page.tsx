import Link from "next/link";

const components = [
  {
    name: "FormInput",
    description: "支持受控、非受控、清空按钮和校验状态的表单输入组件。",
    href: "/docs/components/form-input",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-16">
      <section className="grid gap-4">
        <p className="text-sm font-medium text-muted-foreground">
          NX Components
        </p>
        <h1 className="text-4xl font-bold tracking-tight">slsk公共组件库</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          基于 Next.js、shadcn/ui 和 Tailwind CSS
          构建，组件源码、示例和文档同仓维护。
        </p>
      </section>

      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold">组件</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {components.map((component) => (
            <Link
              key={component.href}
              href={component.href}
              className="rounded-xl border bg-background p-5 transition-colors hover:bg-accent"
            >
              <h3 className="font-semibold">{component.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {component.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

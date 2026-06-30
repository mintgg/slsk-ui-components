import Link from "next/link";
import { componentNavItems } from "@/lib/docs-navigation";

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-slate-50/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-10 lg:h-fit">
          <div className="rounded-2xl border bg-white/90 p-4 shadow-sm backdrop-blur">
            <Link href="/docs" className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-100">
              组件文档
            </Link>
            <div className="mt-4 border-t pt-4">
              <p className="px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Components</p>
              <nav className="mt-2 grid gap-1" aria-label="所有组件菜单">
                {componentNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-slate-100 hover:text-slate-950"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </aside>
        <main className="min-w-0 rounded-3xl border bg-white px-6 py-8 shadow-sm md:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}

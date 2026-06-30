import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NX Components",
  description: "可拓展的公共组件库文档站点",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

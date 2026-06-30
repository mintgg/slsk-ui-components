import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NX Components",
  description: "slsk公共组件库文档",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

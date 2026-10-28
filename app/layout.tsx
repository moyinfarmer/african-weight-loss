import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "African Nutrition",
  description:
    "Track calories, nutrients, African foods and meal portions in grams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
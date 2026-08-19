import type { Metadata, Viewport } from "next";
import { Baloo_2, Caveat, Quicksand } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/shell/AppShell";

const baloo = Baloo_2({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const quicksand = Quicksand({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MARTU — Where did my money go?",
  description: "Tu app financiera personal. Registrá gastos, entendé tus hábitos, cuidá tus ahorros.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FBF3E7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${baloo.variable} ${caveat.variable} ${quicksand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

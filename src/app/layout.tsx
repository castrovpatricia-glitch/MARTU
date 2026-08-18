import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Caveat, Space_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/shell/AppShell";

const anton = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MARTU — Where did my money go?",
  description: "Tu revista financiera personal. Registrá gastos, entendé tus hábitos, cuidá tus ahorros.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F4EEDF",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${anton.variable} ${caveat.variable} ${spaceMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

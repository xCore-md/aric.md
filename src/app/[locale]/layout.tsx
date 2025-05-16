import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

import { routing } from "@/i18n/routing";
import { Footer } from "@/components/shared/Footer";
import "@/assets/styles/globals.css";
import { Header } from "@/components/shared/Header";

const fontInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aric.md",
  description: "Cumpără ușor biletul de autobuz online!",
  icons: [
    {
      rel: "icon",
      type: "image/svg",
      url: "/favicon.svg",
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${fontInter.variable} antialiased`}>
        <NextIntlClientProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="max-w-[1600px] w-full mx-auto">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

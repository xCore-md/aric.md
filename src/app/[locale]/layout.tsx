import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { Footer } from "@/components/shared/Footer";
import "@/assets/styles/globals.css";
import { Header } from "@/components/shared/Header";
import { Providers } from "@/providers";
import { CookieConsent } from "@/components/shared/CookieConsent";


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
  modal,
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = (
    await import(`../../../messages/${locale}.json`)
  ).default;

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="overflow-hidden">
                {children}
                {modal}
              </main>
              <Footer />
              <CookieConsent />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

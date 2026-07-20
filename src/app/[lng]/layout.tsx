import { Suspense } from "react";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, type Locale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { MotionProvider } from "@/components/providers/motion/MotionProvider";
import { routing } from "@/i18n/routing";

import "../globals.css";

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lng]">) {
  const { lng } = await params;
  if (!hasLocale(routing.locales, lng)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(lng);

  return (
    <html lang={lng} dir="ltr" className="h-full">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          integrity="sha384-V6D6tclS+1ROe6W7mgqDzlz750VoLpzneK+eS5rMAgkReZxe5YZeA91NeDdV+Z8E"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <Suspense>
          <NextIntlClientProvider>
            <MotionProvider>
              <Header lng={lng} />
              <main className="flex-1">{children}</main>
              <Footer />
            </MotionProvider>
          </NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  );
}

export async function generateMetadata({
  params,
}: Omit<LayoutProps<"/[lng]">, "children">): Promise<Metadata> {
  const { lng } = await params;
  const tMetadata = await getTranslations({
    locale: lng as Locale,
    namespace: "meta",
  });

  return {
    title: tMetadata("title"),
    description: tMetadata("description"),
  };
}

export async function generateStaticParams() {
  return routing.locales.map((lng) => ({ lng }));
}

"use client";

import { useOptimistic, useTransition } from "react";

import { type Locale, useLocale } from "next-intl";

import { EnglishIcon, TaegeukgiIcon } from "@/components/icons";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [optimisticLocale, setOptimisticLocale] = useOptimistic(locale);

  const nextLocale = (routing.locales.find((cur) => cur !== optimisticLocale) ??
    routing.locales[0]) as Locale;

  const handleSwitch = () => {
    startTransition(() => {
      setOptimisticLocale(nextLocale);
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleSwitch}
      aria-label={`Switch to ${nextLocale}`}
    >
      {nextLocale === "ko" ? (
        <TaegeukgiIcon aria-hidden="true" width={26} height={26} />
      ) : (
        <EnglishIcon aria-hidden="true" width={28} height={28} />
      )}
    </button>
  );
}

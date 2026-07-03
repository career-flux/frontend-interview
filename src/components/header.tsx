import Link from "next/link";

import { GITHUB_URL } from "@/config";

import { GithubIcon } from "./icons/github";
import { LogoIcon } from "./icons/logo";
import LanguageSwitcher from "./language-switcher";

interface HeaderProps {
  lng: string;
}

export default function Header({ lng }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href={`/${lng}`} aria-label="Flux Logo">
          <LogoIcon aria-hidden="true" width={120} height={48} />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1"
            aria-label="GitHub Link"
          >
            <GithubIcon aria-hidden="true" width={26} height={26} />
          </Link>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

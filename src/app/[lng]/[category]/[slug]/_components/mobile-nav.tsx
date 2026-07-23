"use client";

import { useState } from "react";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { CloseIcon, HamburgerIcon } from "@/components/icons";
import { IconButton } from "@/components/ui";
import { type NavCategory, type NavGroup } from "@/utils/nav";
import { cn } from "@/utils/tailwind";

import { NavGroups } from "./nav-groups";

type MobileNavParams = { category: string; slug: string };

interface MobileNavProps {
  navItems: Record<string, NavGroup[]>;
  categories: NavCategory[];
}

export function MobileNav({ navItems, categories }: MobileNavProps) {
  const t = useTranslations("common");
  const { category, slug } = useParams<MobileNavParams>();
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel = (navItems[category] ?? [])
    .flatMap((g) => g.items)
    .find((i) => i.slug === slug)?.title;

  const handleOpenDrawer = () => {
    setIsOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      <NavBar label={currentLabel} onOpen={handleOpenDrawer} />
      <Drawer
        isOpen={isOpen}
        onClose={handleCloseDrawer}
        navItems={navItems}
        categories={categories}
        label={t("navigation")}
      />
    </>
  );
}

interface NavBarProps {
  label: string | undefined;
  onOpen: () => void;
}

function NavBar({ label, onOpen }: NavBarProps) {
  return (
    <div className="sticky top-16 z-30 flex items-center gap-3 border-b border-neutral-200 bg-white px-4 py-3 lg:hidden">
      <IconButton
        aria-label="Open navigation"
        icon={<HamburgerIcon width={18} height={18} />}
        onClick={onOpen}
      />
      <span className="truncate text-base text-neutral-600">{label}</span>
    </div>
  );
}

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Record<string, NavGroup[]>;
  categories: NavCategory[];
  label: string;
}

function Drawer({ isOpen, onClose, navItems, categories, label }: DrawerProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white shadow-xl transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 px-4">
          <span className="text-lg font-semibold text-neutral-800">
            {label}
          </span>
          <IconButton
            aria-label="Close navigation"
            icon={<CloseIcon width={16} height={16} />}
            onClick={onClose}
          />
        </div>
        <NavGroups
          navItems={navItems}
          categories={categories}
          onNavigate={onClose}
        />
      </aside>
    </>
  );
}

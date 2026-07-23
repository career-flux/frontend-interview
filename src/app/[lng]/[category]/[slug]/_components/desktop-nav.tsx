import { type NavCategory, type NavGroup } from "@/utils/nav";

import { NavGroups } from "./nav-groups";

interface DesktopNavProps {
  navItems: Record<string, NavGroup[]>;
  categories: NavCategory[];
}

export function DesktopNav({ navItems, categories }: DesktopNavProps) {
  return (
    <aside className="fixed top-16 left-[max(0px,calc((100vw-80rem)/2))] hidden h-[calc(100dvh-4rem)] w-70 shrink-0 scrollbar-none overflow-y-auto lg:block">
      <NavGroups navItems={navItems} categories={categories} />
    </aside>
  );
}

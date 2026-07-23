"use client";

import { type ReactNode, useEffect, useState } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import { JavaScriptIcon, ReactIcon, TypeScriptIcon } from "@/components/icons";
import { Select } from "@/components/ui";
import { type NavCategory, type NavGroup } from "@/utils/nav";
import { cn } from "@/utils/tailwind";

const CATEGORY_ICON: Record<string, ReactNode> = {
  javascript: <JavaScriptIcon width={16} height={16} />,
  typescript: <TypeScriptIcon width={16} height={16} />,
  react: <ReactIcon width={16} height={16} />,
};

type NavGroupsParams = {
  lng: string;
  category: string;
  slug: string;
};

interface NavGroupsProps {
  navItems: Record<string, NavGroup[]>;
  categories: NavCategory[];
  onNavigate?: () => void;
}

export function NavGroups({
  navItems,
  categories,
  onNavigate,
}: NavGroupsProps) {
  const { lng, category, slug } = useParams<NavGroupsParams>();
  const [selectedCategory, setSelectedCategory] = useState(category);

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  const options = categories.map((c) => ({
    ...c,
    startIcon: CATEGORY_ICON[c.value],
  }));

  const navGroups = navItems[selectedCategory] ?? [];

  return (
    <div className="flex flex-col gap-7 px-4 py-5">
      <Select
        placeholder="Select a category"
        value={selectedCategory}
        size="sm"
        fullWidth
        options={options}
        onChange={setSelectedCategory}
      />

      <nav aria-label="Sidebar navigation" className="flex flex-col gap-6">
        {navGroups.map((group) => (
          <div key={group.label} className="flex flex-col gap-2">
            <span className="text-base font-semibold text-neutral-900">
              {group.label}
            </span>

            <div className="flex flex-col border-l-2 border-neutral-200">
              {group.items.map((item) => {
                const isActive =
                  selectedCategory === category && slug === item.slug;

                return (
                  <Link
                    key={item.slug}
                    href={`/${lng}/${selectedCategory}/${item.slug}`}
                    onClick={onNavigate}
                    className={cn(
                      "py-2 pr-2 pl-4 text-sm transition-colors",
                      isActive
                        ? "font-semibold text-blue-600"
                        : "text-neutral-500 hover:text-neutral-900"
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}

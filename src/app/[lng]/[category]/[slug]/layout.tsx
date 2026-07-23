import { getAllCategories, getAllNavItems } from "@/utils/nav";

import { DesktopNav } from "./_components/desktop-nav";
import { MobileNav } from "./_components/mobile-nav";

export default async function ContentLayout({
  children,
  params,
}: LayoutProps<"/[lng]/[category]/[slug]">) {
  const { lng } = await params;
  const navItems = getAllNavItems(lng);
  const categories = getAllCategories(lng);

  return (
    <div className="mx-auto max-w-7xl">
      <DesktopNav navItems={navItems} categories={categories} />
      <div className="lg:ml-70">
        <MobileNav navItems={navItems} categories={categories} />
        {children}
      </div>
    </div>
  );
}

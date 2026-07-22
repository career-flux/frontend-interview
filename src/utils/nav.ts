"use server";

import { cache } from "react";

import fs from "fs";
import matter from "gray-matter";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface NavItem {
  slug: string;
  title: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface NavCategory {
  value: string;
  label: string;
}

/**
 * Returns available categories by reading subdirectories in the content directory.
 *
 * @param {string} lng - Locale (e.g. "en", "ko")
 * @returns {NavCategory[]}
 *
 * @example
 * getAllCategories("en")
 * [
 *   { value: "javascript", label: "Javascript" },
 *   { value: "react", label: "React" }
 * ]
 */
export const getAllCategories = cache(function getAllCategories(
  lng: string
): NavCategory[] {
  const dir = path.join(CONTENT_DIR, lng);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      value: entry.name,
      label: entry.name.charAt(0).toUpperCase() + entry.name.slice(1),
    }));
});

/**
 * Returns all nav items grouped by category.
 *
 * @param {string} lng - Locale (e.g. "en", "ko")
 * @returns {Record<string, NavGroup[]>}
 *
 * @example
 * getAllNavItems("en")
 * {
 *   javascript: [{ label: "javascript", items: [...] }],
 *   react: [{ label: "react", items: [...] }]
 * }
 */
export const getAllNavItems = cache(function getAllNavItems(
  lng: string
): Record<string, NavGroup[]> {
  return Object.fromEntries(
    getAllCategories(lng).map((c) => [c.value, getNavItems(lng, c.value)])
  );
});

/**
 * Returns nav groups for the sidebar by reading markdown files in the given category directory.
 * Files are grouped by the `group` frontmatter field, falling back to the category name.
 *
 * @param {string} lng - Locale (e.g. "en", "ko")
 * @param {string} category - Content category (e.g. "javascript", "react")
 * @returns {NavGroup[]}
 *
 * @example
 * getNavItems("en", "react")
 * [
 *   {
 *      label: "react",
 *      items: [{ slug: "hooks", title: "React Hooks Complete Guide" }]
 *   }
 * ]
 */
export const getNavItems = cache(function getNavItems(
  lng: string,
  category: string
): NavGroup[] {
  const categoryDir = path.join(CONTENT_DIR, lng, category);

  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  const files = fs
    .readdirSync(categoryDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const groupMap = new Map<string, NavItem[]>();

  for (const file of files) {
    const filePath = path.join(categoryDir, file);
    const slug = file.replace(".md", "");
    const { data } = matter(fs.readFileSync(filePath, "utf-8"));
    const group = (data.group as string | undefined) ?? category;

    if (!groupMap.has(group)) {
      groupMap.set(group, []);
    }
    groupMap.get(group)?.push({ slug, title: data.title as string });
  }

  return Array.from(groupMap.entries()).map(([label, items]) => ({
    label,
    items,
  }));
});

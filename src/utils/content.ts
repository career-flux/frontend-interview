import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface ContentData {
  title: string;
  description: string;
  contributors: string[];
  group?: string;
  created_at: string;
  updated_at: string;
}

export interface Content extends ContentData {
  category: string;
  slug: string;
  html: string;
}

export interface ContentPath {
  lng: string;
  category: string;
  slug: string;
}

/**
 * Parses a markdown file and returns the content with HTML.
 *
 * @param {string} lng - Locale (e.g. "en", "ko")
 * @param {string} category - Content category (e.g. "javascript", "react")
 * @param {string} slug - Content slug (e.g. "hooks")
 * @returns {Promise<Content | null>}
 *
 * @example
 * getContent("en", "react", "hooks")
 * { title: "...", description: "...", html: "...", ... }
 */
export async function getContent(
  lng: string,
  category: string,
  slug: string
): Promise<Content | null> {
  const filePath = path.join(CONTENT_DIR, lng, category, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);

  return {
    ...(data as ContentData),
    category,
    slug,
    html: processed.toString(),
  };
}

/**
 * Returns all content paths
 *
 * @returns {ContentPath[]}
 *
 * @example
 * getContentPaths()
 * [
 *   { lng: "en", category: "react", slug: "hooks" },
 *   { lng: "ko", category: "react", slug: "hooks" }
 * ]
 */
export function getContentPaths(): ContentPath[] {
  const paths: ContentPath[] = [];

  const langs = fs.readdirSync(CONTENT_DIR);
  for (const lng of langs) {
    const langDir = path.join(CONTENT_DIR, lng);
    const categories = fs.readdirSync(langDir);

    for (const category of categories) {
      const categoryDir = path.join(langDir, category);
      const files = fs.readdirSync(categoryDir);

      for (const file of files) {
        if (file.endsWith(".md")) {
          paths.push({ lng, category, slug: file.replace(".md", "") });
        }
      }
    }
  }

  return paths;
}

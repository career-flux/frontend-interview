import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";
import path from "path";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * js-yaml's default schema (the one gray-matter uses) auto-parses unquoted
 * dates like `created_at: 2026-08-05` into a JS Date instead of a string.
 * CORE_SCHEMA drops that YAML-timestamp extension, so frontmatter dates
 * parse as plain strings regardless of quoting.
 */
const FRONTMATTER_OPTIONS = {
  engines: {
    yaml: (input: string) =>
      yaml.safeLoad(input, { schema: yaml.CORE_SCHEMA }) as object,
  },
};

/**
 * `rehype-raw` keeps raw HTML written in markdown (e.g. `<details>` FAQ
 * blocks) instead of silently dropping it. Content only ever comes from
 * markdown files reviewed through a PR, not runtime user input, so skipping
 * sanitization here is intentional rather than an oversight.
 */
const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeHighlight)
  .use(rehypeStringify);

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
  const { data, content } = matter(raw, FRONTMATTER_OPTIONS);

  const processed = await markdownProcessor.process(content);

  return {
    ...(data as ContentData),
    category,
    slug,
    html: processed.toString(),
  };
}

export interface RecentContent extends ContentData {
  category: string;
  slug: string;
}

/**
 * Returns the most recently created contents for a locale, across all categories.
 *
 * @param {string} lng - Locale (e.g. "en", "ko")
 * @param {number} limit - Max number of items to return
 * @returns {RecentContent[]}
 *
 * @example
 * getRecentContents("ko", 5)
 * [{ title: "...", category: "react", slug: "hooks", created_at: "2026-08-05", ... }]
 */
export function getRecentContents(lng: string, limit: number): RecentContent[] {
  const langDir = path.join(CONTENT_DIR, lng);

  if (!fs.existsSync(langDir)) {
    return [];
  }

  const categories = fs.readdirSync(langDir);
  const items: RecentContent[] = [];

  for (const category of categories) {
    const categoryDir = path.join(langDir, category);
    const files = fs
      .readdirSync(categoryDir)
      .filter((file) => file.endsWith(".md"));

    for (const file of files) {
      const filePath = path.join(categoryDir, file);
      const { data } = matter(
        fs.readFileSync(filePath, "utf-8"),
        FRONTMATTER_OPTIONS
      );

      items.push({
        ...(data as ContentData),
        category,
        slug: file.replace(".md", ""),
      });
    }
  }

  return items
    .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
    .slice(0, limit);
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

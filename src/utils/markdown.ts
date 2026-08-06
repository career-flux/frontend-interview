/**
 * Strips the YAML frontmatter block (--- ... ---) from a markdown string.
 *
 * @param {string} content - Raw markdown string
 * @returns {string} Markdown body without frontmatter
 *
 * @example
 * stripFrontmatter("---\ntitle: Hello\n---\n\n# Hello")
 * "# Hello"
 */
export function stripFrontmatter(content: string): string {
  if (!content.startsWith("---\n")) {
    return content;
  }

  const end = content.indexOf("\n---", 4);
  if (end === -1) {
    return content;
  }

  return content.slice(end + 4).trimStart();
}

/**
 * Converts a markdown string to HTML using the same pipeline as published
 * content (GFM + syntax highlighting + raw HTML like `<details>`), so the
 * editor preview matches what actually gets rendered on the site.
 *
 * @param {string} content - Raw markdown string
 * @returns {Promise<string>} HTML string
 *
 * @example
 * renderMarkdown("# Hello")
 * "<h1>Hello</h1>"
 */
export async function renderMarkdown(content: string): Promise<string> {
  const { unified } = await import("unified");
  const { default: remarkParse } = await import("remark-parse");
  const { default: remarkGfm } = await import("remark-gfm");
  const { default: remarkRehype } = await import("remark-rehype");
  const { default: rehypeRaw } = await import("rehype-raw");
  const { default: rehypeHighlight } = await import("rehype-highlight");
  const { default: rehypeStringify } = await import("rehype-stringify");

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return processed.toString();
}

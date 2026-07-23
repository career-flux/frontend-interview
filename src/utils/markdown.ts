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
 * Converts a markdown string to HTML using remark with GFM support.
 *
 * @param {string} content - Raw markdown string
 * @returns {Promise<string>} HTML string
 *
 * @example
 * renderMarkdown("# Hello")
 * "<h1>Hello</h1>"
 */
export async function renderMarkdown(content: string): Promise<string> {
  const { remark } = await import("remark");
  const { default: remarkGfm } = await import("remark-gfm");
  const { default: remarkHtml } = await import("remark-html");

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);
  return processed.toString();
}

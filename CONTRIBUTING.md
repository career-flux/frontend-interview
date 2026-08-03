# Contribution Guide

Korean version is available at [CONTRIBUTING.ko.md](./CONTRIBUTING.ko.md).  
A [Markdown editor](https://frontend-interview-delta.vercel.app/ko/markdown/editor) is provided for content creation.

Thank you for your interest in contributing to our project!
There are two main ways you can contribute to this repository:

1. **Adding or Improving Content**
2. **Site Development and Bug Fixes**

## Adding or Improving Content

All contents are located in the `[content/ko](./content/ko/)` and `[content/en](./content/en/)` directories.

### Folder names are used as categories

```text
📦content
 ┣ 📂ko
 ┃ ┣ 📂javascript
 ┃ ┗ 📂react
```

※ When you add a new category folder (e.g., `example`), it will automatically be added to the category list on the site.

### File names become URL paths (slug)

Please use `kebab-case` for file names so that the URL is easy to read and understand.

```text
📦content
 ┣ 📂ko
 ┃ ┣ 📂javascript
 ┃ ┃ ┗ 📜var-let-const.md
```

※ As shown in the example above, if the file name is `var-let-const.md`, the resulting URL will be `https://.../javascript/var-let-const`.

### Translations (locale)

To prepare for future expansion, content is managed in both English and Korean.
When contributing, we ask that you `create both versions`.

※ It is completely fine to use a machine translator for the secondary version.

### Content Template Notes (Frontmatter)

We use the following template (frontmatter) at the top of each markdown file to credit our contributors:

```md
---
title: "React Sample Question"
description: "This is a sample question for the React category."
contributors: ["dango0812"]
created_at: "2026-07-23"
updated_at: "2026-07-24"
---
```

※ When modifying existing content, please keep the original `contributors` and simply `add your GitHub ID` to the array.  
Ex: `["dango0812", "new-contributor"]`  
※ The `title` is used as the `h1` tag. Therefore, please do not use the `#` tag when writing content.

## Site Development / Bug Fixes

- This repository follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.
- Direct pushes to the `main` branch are restricted. Please create a new branch for your work.
- The Pull Request template will be automatically populated when you open a PR.
- Please keep your PR focused on a single topic (e.g., one question, one feature, or one bug fix per PR).

```sh
$ pnpm install
$ pnpm dev
```

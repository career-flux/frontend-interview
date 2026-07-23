"use client";

import { type ChangeEvent, useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import { ToastContainer, useToast } from "@/components/ui";
import { renderMarkdown, stripFrontmatter } from "@/utils/markdown";
import { LocalStorage } from "@/utils/storage";

import { EditorHeader } from "./editor-header";
import { PreviewPanel } from "./preview-panel";

const STORAGE_KEY = "markdown-editor-content";
const TODAY = new Date().toISOString().slice(0, 10);

const DEFAULT_CONTENT = `---
title:
description:
contributors: [github_username]
created_at: ${TODAY}
updated_at: ${TODAY}
---

## Section

> **Note:** Do not use \`#\` (h1) — the \`title\` field above becomes the page heading.
>
> **Contributors:** Enter GitHub usernames (e.g. \`dango0812\`). Avatars are fetched automatically.

`;

export function MarkdownEditor() {
  const t = useTranslations("editor_page");
  const { toasts, removeToast, success, error } = useToast();
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const saved = LocalStorage.get<string>(STORAGE_KEY);
    const initial = saved ?? content;
    if (saved) {
      setContent(saved);
    }
    renderMarkdown(stripFrontmatter(initial)).then(setPreview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    LocalStorage.set(STORAGE_KEY, value);
    renderMarkdown(stripFrontmatter(value)).then(setPreview);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      success(t("copy_success"));
    } catch {
      error(t("copy_error"));
    }
  };

  return (
    <div className="flex h-[calc(100dvh-130px)] flex-col">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <EditorHeader onCopy={handleCopy} />

      <div className="flex min-h-0 flex-1">
        <div className="flex w-1/2 flex-col border-r border-neutral-200">
          <textarea
            value={content}
            onChange={handleContentChange}
            aria-label={t("markdown_editor_header")}
            spellCheck={false}
            className="min-h-0 flex-1 resize-none bg-white px-5 py-4 font-mono text-sm text-neutral-800 outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          />
        </div>
        <PreviewPanel html={preview} />
      </div>
    </div>
  );
}

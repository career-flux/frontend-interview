"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui";

interface EditorHeaderProps {
  onCopy: () => void;
}

export function EditorHeader({ onCopy }: EditorHeaderProps) {
  const tCommon = useTranslations("common");
  const tEditor = useTranslations("editor_page");

  return (
    <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2.5">
      <div className="flex flex-col gap-0.5">
        <span className="text-lg font-semibold text-neutral-800">
          {tEditor("markdown_editor_header")}
        </span>
        <span className="text-base text-neutral-600">
          {tEditor("markdown_editor_description")}
        </span>
      </div>

      <Button size="sm" variant="outline" onClick={onCopy}>
        {tCommon("copy")}
      </Button>
    </div>
  );
}

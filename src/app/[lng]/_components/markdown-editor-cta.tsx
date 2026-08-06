import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { ArrowUpRightIcon } from "@/components/icons";
import { SlideUpRight } from "@/components/motion";
import { Button } from "@/components/ui";

interface MarkdownEditorCTAProps {
  lng: string;
}

export async function MarkdownEditorCTA({ lng }: MarkdownEditorCTAProps) {
  const t = await getTranslations("home_page");

  return (
    <div className="w-full overflow-hidden rounded-2xl">
      <div className="group relative aspect-2/1 w-full overflow-hidden">
        <Image
          src="/images/markdown-editor-preview.png"
          alt="markdown-editor-preview"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 600px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-3 border-b border-neutral-100 py-5">
        <div>
          <h3 className="font-bold text-neutral-900">
            {t("markdown_editor_title")}
          </h3>
          <p className="mt-1 text-base text-neutral-700">
            {t("markdown_editor_description")}
          </p>
        </div>

        <Link href={`/${lng}/markdown/editor`} className="w-fit">
          <Button
            variant={"outline"}
            endIcon={
              <SlideUpRight>
                <ArrowUpRightIcon width={18} height={18} />
              </SlideUpRight>
            }
          >
            {t("markdown_editor_cta")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

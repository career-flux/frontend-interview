import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { ArrowUpRightIcon, BugIcon } from "@/components/icons";
import { Shake, SlideUpRight } from "@/components/motion";
import { Button } from "@/components/ui";
import { BUG_REPORT_URL, CONTRIBUTION_URL } from "@/config";

import { MarkdownEditorCTA } from "./_components/markdown-editor-cta";
import { RecentPosts } from "./_components/recent-posts";

export default async function HomePage({ params }: PageProps<"/[lng]">) {
  const { lng } = await params;

  const t = await getTranslations("home_page");
  const tAction = await getTranslations("actions");

  return (
    <div>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-20 px-5 py-6 md:grid-cols-2 md:gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-xl font-bold text-neutral-900 md:text-2xl">
            {t("description")}
          </p>

          <div className="mt-2.5 flex items-center gap-2.5">
            <Link
              href={CONTRIBUTION_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant={"primary"}
                size={"md"}
                endIcon={
                  <SlideUpRight>
                    <ArrowUpRightIcon width={20} height={20} />
                  </SlideUpRight>
                }
                className="rounded-full"
              >
                {tAction("open_source_contribution")}
              </Button>
            </Link>

            <Link
              href={BUG_REPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant={"secondary"}
                size={"md"}
                endIcon={
                  <Shake>
                    <BugIcon width={20} height={20} />
                  </Shake>
                }
                className="gap-2 rounded-full"
              >
                {tAction("bug_report")}
              </Button>
            </Link>
          </div>

          <div className="mt-6">
            <MarkdownEditorCTA lng={lng} />
          </div>
        </div>

        <RecentPosts lng={lng} />
      </div>
    </div>
  );
}

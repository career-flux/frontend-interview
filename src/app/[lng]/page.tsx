import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { ArrowUpRightIcon, BugIcon } from "@/components/icons";
import { Shake, SlideUpRight } from "@/components/motion";
import { Button } from "@/components/ui";
import { BUG_REPORT_URL, CONTRIBUTION_URL } from "@/config";

export default async function HomePage() {
  const t = await getTranslations("home_page");
  const tAction = await getTranslations("actions");

  return (
    <div className="bg-gray-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-10 px-5 py-10 md:flex-row md:items-center md:gap-5 md:py-20">
        <div className="flex flex-col">
          <h1 className="text-neutral-900">{t("title")}</h1>
          <p className="my-2.5 text-xl font-semibold text-neutral-800">
            {t("description")}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href={CONTRIBUTION_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant={"primary"}
              endIcon={
                <SlideUpRight>
                  <ArrowUpRightIcon width={20} height={20} />
                </SlideUpRight>
              }
            >
              {tAction("open_source_contribution")}
            </Button>
          </Link>

          <Link href={BUG_REPORT_URL} target="_blank" rel="noopener noreferrer">
            <Button
              variant={"error"}
              endIcon={
                <Shake>
                  <BugIcon width={20} height={20} />
                </Shake>
              }
              className="gap-2"
            >
              {tAction("bug_report")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getContent, getContentPaths } from "@/utils/content";
import { cn } from "@/utils/tailwind";

export function generateStaticParams() {
  return getContentPaths();
}

export default async function ContentDetailPage({
  params,
}: PageProps<"/[lng]/[category]/[slug]">) {
  const { lng, category, slug } = await params;

  setRequestLocale(lng);

  const t = await getTranslations("common");
  const content = await getContent(lng, category, slug);

  if (!content) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-10 py-5 max-md:px-5">
      <div className="mb-5 grid grid-cols-1 gap-5 border-b border-neutral-200 pb-5 md:grid-cols-[1fr_auto] md:items-start">
        <h1 className="text-3xl text-neutral-900 md:col-start-1 md:row-start-1">
          {content.title}
        </h1>

        <p className="text-lg text-neutral-700 md:col-span-2 md:row-start-2">
          {content.description}
        </p>

        <div className="flex shrink-0 flex-col gap-2 md:col-start-2 md:row-start-1 md:items-end">
          <span className="text-base font-semibold text-neutral-900">
            {t("last_changed")}: {content.updated_at}
          </span>
          <div className="flex items-center gap-2.5">
            <span className="text-base font-semibold text-neutral-900">
              {t("contributors")}:
            </span>
            {content.contributors.map((username, index) => (
              <Link
                key={username}
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                title={username}
                aria-label={`${username} on GitHub`}
                className={cn(
                  "relative transition-transform hover:z-10 hover:scale-125",
                  index !== 0 && "-ml-4"
                )}
              >
                <Image
                  src={`https://avatars.githubusercontent.com/${username}?size=64`}
                  alt={username}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <article
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    </div>
  );
}

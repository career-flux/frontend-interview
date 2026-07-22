import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { getContent, getContentPaths } from "@/utils/content";

export function generateStaticParams() {
  return getContentPaths();
}

export default async function ContentDetailPage({
  params,
}: PageProps<"/[lng]/[category]/[slug]">) {
  const { lng, category, slug } = await params;

  setRequestLocale(lng);

  const content = await getContent(lng, category, slug);

  if (!content) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-10 py-5 max-md:px-5">
      <div className="mb-5 flex items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-neutral-900">{content.title}</h1>
          <p className="text-lg text-neutral-600">{content.description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {content.contributors.map((username) => (
            <Link
              key={username}
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${username} on GitHub`}
            >
              <Image
                src={`https://avatars.githubusercontent.com/${username}?size=64`}
                alt={username}
                width={32}
                height={32}
                className="rounded-full ring-2 ring-neutral-200 transition-opacity hover:opacity-80"
              />
            </Link>
          ))}
        </div>
      </div>

      <article
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    </div>
  );
}

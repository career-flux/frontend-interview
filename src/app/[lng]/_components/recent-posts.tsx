import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getRecentContents } from "@/utils/content";

interface RecentPostsProps {
  lng: string;
}

export async function RecentPosts({ lng }: RecentPostsProps) {
  const t = await getTranslations("home_page");
  const posts = getRecentContents(lng, 5);

  return (
    <div className="w-full">
      <h3 className="mb-4 font-bold text-neutral-900">{t("recent_posts")}</h3>

      <ul className="flex flex-col">
        {posts.map((post) => (
          <li
            key={`${post.category}-${post.slug}`}
            className="border-t border-neutral-200 first:border-t-0"
          >
            <Link
              href={`/${lng}/${post.category}/${post.slug}`}
              className="flex flex-col gap-1.5 py-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="line-clamp-2 text-lg font-bold text-neutral-900">
                  {post.title}
                </span>
                <span className="shrink-0 text-sm text-neutral-400">
                  {post.created_at}
                </span>
              </div>
              <p className="line-clamp-2 text-sm text-neutral-500">
                {post.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

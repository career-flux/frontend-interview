import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("home_page");

  return (
    <div className="container mx-auto">
      <h1>{t("title")}</h1>
    </div>
  );
}

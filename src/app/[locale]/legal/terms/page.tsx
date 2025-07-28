import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("legal_pages.terms");
  const sections = [1, 2, 3, 4, 5];

  return (
    <div className="html container py-12">
      <h1>{t("title")}</h1>
      {sections.map((n) => (
        <section key={n}>
          <h2>{t(`section${n}.title`)}</h2>
          <p>{t(`section${n}.text`)}</p>
        </section>
      ))}
    </div>
  );
}

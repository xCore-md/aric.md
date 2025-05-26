"use client";
import { PRIVATE_LINKS } from "@/utils/constants";
import { Link, usePathname } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "use-intl";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const pathname = usePathname();

  console.log({ pathname });
  return (
    <div className="container mt-4">
      <Card className="border">
        <CardContent>
          <div className="flex justify-center gap-8">
            {PRIVATE_LINKS?.map(({ label, path, svgPath }) => (
              <Link
                key={path}
                href={path}
                className="border-blue flex h-16 items-center gap-2 border-b px-8 py-5"
              >
                <svg width="24" height="24" className="fill-blue">
                  {svgPath}
                </svg>

                <span>{t(label)}</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
      {children}
    </div>
  );
}

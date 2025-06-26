"use client";
import { PRIVATE_LINKS } from "@/utils/constants";
import { Link, usePathname } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "use-intl";
import { cn } from "@/lib/utils";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <div className="container mt-4 mb-20">
      <Card className="hidden border lg:block">
        <CardContent>
          <div className="flex justify-center gap-8">
            {PRIVATE_LINKS?.map(({ label, path, svgPath }) => (
              <Link
                key={path}
                href={path}
                className={cn(
                  "text-text-gray border-platinum flex h-16 items-center gap-2 border-b px-2 py-5 font-semibold xl:px-8",
                  "hover:border-blue hover:text-blue transition",
                  pathname === path && "border-blue text-blue",
                )}
              >
                <svg width="24" height="24" fill="currentColor">
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

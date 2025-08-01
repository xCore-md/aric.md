"use client";

import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    setCookie("cookie_consent", "true", { maxAge: 60 * 60 * 24 * 365, path: "/" });
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-md bg-primary px-4 py-3 text-primary-foreground shadow-md">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm">{t("message")}</p>
        <Button size="sm" onClick={accept}>
          {t("ok")}
        </Button>
      </div>
    </div>
  );
}

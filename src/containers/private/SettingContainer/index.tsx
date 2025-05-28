"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { PRIVATE_LINK } from "@/utils/constants";

export const SettingContainer: React.FC = () => {
  const t = useTranslations();

  return (
    <>
      <div className="py-8">
        <h3 className="h3 !mb-0">{t(PRIVATE_LINK.settings.label)}</h3>
      </div>
    </>
  );
};

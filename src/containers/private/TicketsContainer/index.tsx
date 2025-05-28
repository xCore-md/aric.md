"use client";
import React from "react";
import { PRIVATE_LINK } from "@/utils/constants";
import { useTranslations } from "use-intl";

export const TicketsContainer: React.FC = () => {
  const t = useTranslations();

  return (
    <>
      <div className="py-8">
        <h3 className="h3 !mb-0">{t(PRIVATE_LINK.tickets.label)}</h3>
      </div>
    </>
  );
};

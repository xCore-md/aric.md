"use client";
import React from "react";
import { FAQSection } from "@/components/sections/FAQ";
import { EmailSubscriptionSection } from "@/components/sections/EmailSubscription";

export const FAQContainer: React.FC = () => {
  return (
    <>
      <div className="my-12">
        <FAQSection />
      </div>

      <EmailSubscriptionSection withBg />
    </>
  );
};

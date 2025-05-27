"use client";
import React from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ProgressProvider } from "@bprogress/next/app";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <NuqsAdapter>
      <ProgressProvider height="4px" color="#00C9FF" shallowRouting>
        {children}
      </ProgressProvider>
    </NuqsAdapter>
  );
};

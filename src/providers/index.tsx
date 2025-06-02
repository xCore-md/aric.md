"use client";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ProgressProvider } from "@bprogress/next/app";
import { getQueryClient } from "@/query/get-query-client";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <ProgressProvider height="4px" color="#00C9FF" shallowRouting>
          {children}
        </ProgressProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
};

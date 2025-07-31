"use client";

import React from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ProgressProvider } from "@bprogress/next/app";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { HTTPError } from "ky";
import { CurrencyProvider } from "./contexts/CurrencyContext";

function handleApiError(error: unknown) {
  console.error(error);

  if (error instanceof HTTPError) {
    error.response
      .json()
      .then((responseJson) => {
        const serverMessage =
          responseJson?.message ||
          Object.values(responseJson?.errors || {})?.flat()?.[0] ||
          "Произошла неизвестная ошибка.";

        toast.error(serverMessage);
      })
      .catch(() => {
        toast.error("Ошибка сервера. Не удалось прочитать ответ.");
      });
  } else if (error instanceof Error) {
    console.error(error.message);
    toast.error("Произошла ошибка при выполнении запроса.");
  } else {
    toast.error("Произошла неизвестная ошибка.");
  }
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleApiError,
  }),
  mutationCache: new MutationCache({
    onError: handleApiError,
  }),
});

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <ProgressProvider height="4px" color="#00C9FF" shallowRouting>
          <CurrencyProvider>
            {children}
            <Toaster richColors />
          </CurrencyProvider>
        </ProgressProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
};

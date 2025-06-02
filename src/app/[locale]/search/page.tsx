import { pokemonOptions } from "@/app/pokemon";
import { SearchContainer } from "@/containers/SearchContainer";
import { getQueryClient } from "@/query/get-query-client";
import { IParamsAndSearchParams } from "@/types";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page({ searchParams }: IParamsAndSearchParams) {
  console.log({ searchParams });
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(pokemonOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchContainer />
    </HydrationBoundary>
  );
}

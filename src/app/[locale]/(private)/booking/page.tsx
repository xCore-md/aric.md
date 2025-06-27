import { BookingContainer } from "@/containers/private/BookingContainer";
import { IParamsAndSearchParams } from "@/types";

export default async function Page(props: IParamsAndSearchParams) {
  const searchParams = await props?.searchParams;

  return <BookingContainer message={String(searchParams?.message)} />;
}

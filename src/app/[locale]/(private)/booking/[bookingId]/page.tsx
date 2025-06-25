import { BookingByIdContainer } from "@/containers/private/BookingByIdContainer";
import { IParamsAndSearchParams } from "@/types";

export default async function Page({ params }: IParamsAndSearchParams) {
  const p = await params;
  return <BookingByIdContainer id={Number(p?.bookingId)} />;
}

import { Timestamps } from "./common.types";

export type PassengerType = "adult" | "child";

export interface Passenger extends Timestamps {
  id: number;
  customer_id: number;
  first_name: string;
  last_name: string;
  phone: string | null;
  type: PassengerType;
}

export interface PassengerCreateDto {
  first_name: string;
  last_name: string;
  phone: string | null;
}

export interface PassengerUpdateDto extends Omit<PassengerCreateDto, "type"> {
  id: number;
}

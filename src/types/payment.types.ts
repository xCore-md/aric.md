import { CurrencyEnum } from "./common.types";

export type PaymentStatus = "pending" | "paid" | "failed";

export enum PaymentMethodEnum {
  Cash = "cash",
  Card = "card",
}

export type PaymentInput = {
  method: "cash" | "card";
  gateway?: string;
};

export type Payment = {
  id: number;
  customer_id: number;
  amount: number;
  currency: CurrencyEnum;
  payment_method: PaymentMethodEnum;
  status: PaymentStatus;
  external_id: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  ticket_id: number | null;
};

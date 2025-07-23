import { Timestamps } from "./common.types";

export interface NewsletterSubscription extends Timestamps {
  id: number;
  email: string;
  accepted: boolean;
  customer_id: number | null;
}

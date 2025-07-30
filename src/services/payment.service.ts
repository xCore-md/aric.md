import { apiInstance } from "@/utils/api";
import { PaginatedResponse, PaginationParams } from "@/types";
import { Payment } from "@/types/payment.types";

type PaymentResponse = {
  success: boolean;
  message?: string;
};

class PaymentService {
  private clientApi = apiInstance;

  getAll(params?: PaginationParams) {
    return this.clientApi
      .get("customer/payments", { searchParams: { ...params } })
      .json<PaginatedResponse<Payment>>();
  }

  async download(id: number) {
    const blob = await this.clientApi
      .get(`customer/payments/${id}/download`, {
        headers: { Accept: "application/pdf" },
      })
      .blob();

    return blob;
  }

  // Refund ticket
  refundTicket = (ticketId: number) => {
    return this.clientApi
      .post(`customer/payments/refund-ticket/${ticketId}`)
      .json<PaymentResponse>();
  };

  // Refund booking
  refundBooking = (bookingId: number) => {
    return this.clientApi
      .post(`customer/payments/refund-booking/${bookingId}`)
      .json<PaymentResponse>();
  };

  // Pay ticket
  payTicket = (
    ticketId: number,
    data: { gateway: string; recaptcha_token: string },
  ) => {
    return this.clientApi
      .post(`customer/payments/pay-ticket/${ticketId}`, { json: data })
      .json<PaymentResponse & { redirect_url?: string }>();
  };

  // Pay booking
  payBooking = (
    bookingId: number,
    data: { gateway: string; recaptcha_token: string },
  ) => {
    return this.clientApi
      .post(`customer/payments/pay-booking/${bookingId}`, { json: data })
      .json<PaymentResponse & { redirect_url?: string }>();
  };

  // Pay unpaid booking
  payUnpaidBooking = (
    bookingId: number,
    data: { gateway: string; recaptcha_token: string },
  ) => {
    return this.clientApi
      .post(`customer/booking/pay-unpaid/${bookingId}`, { json: data })
      .json<PaymentResponse & { redirect_url?: string }>();
  };
}

export const paymentService = new PaymentService();

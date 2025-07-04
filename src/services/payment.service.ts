import { apiInstance } from "@/utils/api";
import {
  Booking,
  PaginatedResponse,
  PaginationParams,
  BookingCompleteDto,
  BookingCompleteResponse,
} from "@/types";
import { Payment } from "@/types/payment.types";

type RefundPayload = {
  reason?: string;
  amount?: number;
};

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

  // Refund ticket
  ticketRefund = ({ booking_id, ...data }: BookingCompleteDto) => {
    return this.clientApi
      .post(`customer/payments/ticket/${booking_id}/refund`, { json: data })
      .json<BookingCompleteResponse>();
  };

  // Refund booking
  bookingRefund = (bookingId: number, data?: RefundPayload) => {
    return this.clientApi
      .post(`customer/payments/booking/${bookingId}/refund`, {
        json: data,
      })
      .json<PaymentResponse>();
  };

  // Pay ticket
  payTicket = (ticketId: number) => {
    return this.clientApi
      .post(`customer/payments/pay-ticket/${ticketId}`)
      .json<PaymentResponse>();
  };

  // Pay booking
  payBooking = (bookingId: number) => {
    return this.clientApi
      .post(`customer/payments/pay-booking/${bookingId}`)
      .json<PaymentResponse>();
  };

  // Pay unpaid booking
  payUnpaidBooking = (bookingId: number) => {
    return this.clientApi
      .post(`customer/booking/pay-unpaid/${bookingId}`)
      .json<PaymentResponse>();
  };
}

export const paymentService = new PaymentService();

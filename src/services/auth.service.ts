import ky from "ky";
import { signIn, signOut } from "next-auth/react";
import { API_URL } from "@/utils/constants";
import type {
  ApiResponse,
  ExpiresInResponseData,
  SendCodePayload,
  TokenResponseData,
  VerifyCodePayload,
} from "@/types";

class AuthService {
  private authApi = ky.create({
    prefixUrl: API_URL + "/customer/auth",
  });

  /**
   * Send verification code to the customer.
   * @param data
   */
  sendVerificationCode = (data: SendCodePayload) => {
    return this.authApi
      .post("verification-code", { json: data, timeout: 60000 })
      .json<ApiResponse<ExpiresInResponseData>>();
  };

  /**
   * Verify customer code and sync session with NextAuth.
   * @param data
   */
  async verify(data: VerifyCodePayload) {
    const response = await this.authApi
      .post("verify", { json: data })
      .json<ApiResponse<TokenResponseData>>();

    // Данные пользователя и токен получаем из ответа backend
    const { user, token } = response.data || {};

    // Синхронизируем с next-auth, если есть user и token
    if (user && token) {
      await signIn("credentials", {
        redirect: false,
        token: JSON.stringify(token),
        user: JSON.stringify(user),
      });
    }

    return response;
  }

  /**
   * Logout customer from NextAuth.
   */
  async logout() {
    await signOut({ redirectTo: "/", redirect: true });
  }
}

export const authService = new AuthService();

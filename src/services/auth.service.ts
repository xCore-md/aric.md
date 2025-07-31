import ky from "ky";
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
   * Verify customer code.
   * @param data
   */
  async verify(data: VerifyCodePayload) {
    const response = await this.authApi
      .post("verify", { json: data })
      .json<ApiResponse<TokenResponseData>>();

    const token = response.data?.token;
    if (token) {
      document.cookie = `token=${token}; path=/; Secure; SameSite=Lax;`;
    }

    return response;
  }


  /**
   * Logout customer.
   */
  async logout() {
    await this.authApi.post("logout", {
      headers: { Accept: "application/json" },
      credentials: "include",
    });

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  }
}

export const authService = new AuthService();

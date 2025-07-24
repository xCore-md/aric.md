import ky from "ky";
import { signOut } from "next-auth/react";

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

  sendVerificationCode = (data: SendCodePayload) => {
    return this.authApi
      .post("verification-code", { json: data })
      .json<ApiResponse<ExpiresInResponseData>>();
  };

  verify(data: VerifyCodePayload) {
    return this.authApi
      .post("verify", { json: data })
      .json<ApiResponse<TokenResponseData>>();
  }

  async logout() {
    await signOut({ redirectTo: "/", redirect: true });
  }
}

export const authService = new AuthService();

import ky from "ky";
import { signOut } from "next-auth/react";

import { API_URL } from "@/utils/constants";
import type { ILogin } from "@/types";

class AuthService {
  private authApi = ky.create({
    prefixUrl: API_URL + "auth",
  });

  login(data: ILogin) {
    return this.authApi.post("login", { json: data });
  }

  refreshToken(refresh: string) {
    return this.authApi.post("token/refresh", { json: { refresh } });
  }

  async logout() {
    await signOut();
  }
}

export const authService = new AuthService();

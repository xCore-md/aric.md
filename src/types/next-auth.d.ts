import type { DefaultSession } from "next-auth";
import type { ILoginResponse } from "@/types/index";

declare module "next-auth" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: Date | null;
    id?: string;
  }

  interface Session {
    user: {} & DefaultSession["user"] & ILoginResponse;
    error: string | null;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: Date | null;
  }

  // interface User extends ILoginResponse {}
}

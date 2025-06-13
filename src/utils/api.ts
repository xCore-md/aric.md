import ky from "ky";
import { getSession } from "next-auth/react";
import { API_URL } from "@/utils/constants";
import { auth } from "@/auth";

export const apiInstance = ky.create({
  prefixUrl: API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let token: string;

        if (typeof window === "undefined") {
          // Server side
          const session = await auth();
          token = session?.accessToken || "";
        } else {
          // Client side
          const session = await getSession();
          token = session?.accessToken || "";
        }

        request.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
  },
});

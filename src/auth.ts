import { skipCSRFCheck } from "@auth/core";
import Credentials from "@auth/core/providers/credentials";
import NextAuth, { type User } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        token: {},
        user: {},
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.token || !credentials?.user) {
            throw new Error("Token and user are required.");
          }

          const user = JSON.parse(credentials.user as string);
          const token = JSON.parse(credentials.token as string);

          return {
            id: user.id,
            name:
              `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || "",
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone,
            language: user.language,
            token,
          } as User;
        } catch (err) {
          console.error("Authorization error:", err);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.phone = user.phone;
        token.language = user.language;
      }
      return token;
    },

    async session({ session, token }) {
      // @ts-expect-error: extended user fields are defined in global.d.ts
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email || "",
        first_name: token.first_name,
        last_name: token.last_name,
        phone: token.phone,
        language: token.language,
      };
      session.accessToken = token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/",
  },
  trustHost: true,
  skipCSRFCheck,
  debug: process.env.NODE_ENV !== "production",
});

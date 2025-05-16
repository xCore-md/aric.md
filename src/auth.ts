import CredentialsProvider from "next-auth/providers/credentials";

import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      authorize(credentials) {
        if (
          credentials?.username === "admin" &&
          credentials.password === "admin"
        ) {
          return { id: "1", name: "admin" };
        }

        return null;
      },
    }),
  ],
});

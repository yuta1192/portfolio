import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/user_select`,
          {
            body: JSON.stringify({ credentials }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          }
        );
        const json = await response.json();

        if (!json || response.status !== 200) {
          return Promise.resolve(null);
        } else {
          const user = { id: json.id, email: json.email };
          return Promise.resolve(user);
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: `${process.env.AUTH_SECRET_KEY}`,
  jwt: {
    secret: `${process.env.AUTH_JWT_SECRET_KEY}`,
  },
});

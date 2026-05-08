import NextAuth            from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare }         from "bcryptjs"; // v3 uses named exports — no default export
import { LoginSchema }     from "@/lib/schemas";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },

  pages: {
    signIn: "/dashboard/login",
    error:  "/dashboard/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text"     },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          // 1. Zod validates shape
          const result = LoginSchema.safeParse(credentials);
          if (!result.success) {
            console.error("[auth] Zod validation failed:", result.error.issues);
            return null;
          }

          const { username, password } = result.data;

          // 2. Env var guard
          const adminUser = process.env.ADMIN_USERNAME;
          const adminHash = process.env.ADMIN_PASSWORD_HASH;

          console.log("[auth] Attempting login for user:", username,password);

          if (!adminUser || !adminHash) {
            console.error("[auth] Missing ADMIN_USERNAME or ADMIN_PASSWORD_HASH in env");
            return null;
          }

          // 3. Username check
          const isValidUser = username.trim() === adminUser.trim();

          // 4. bcryptjs v3 named import — `compare` not `bcrypt.compare`
          const isValidPass = await compare(password, adminHash);

          if (!isValidUser || !isValidPass) {
            console.error("[auth] Invalid credentials — user match:", isValidUser, "pass match:", isValidPass);
            return null;
          }

          return { id: "admin", name: username, role: "admin" };

        } catch (err) {
          // Surface the real error — without this, authorize silently returns null
          console.error("[auth] authorize() threw:", err.message);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.role = token.role;
      return session;
    },
  },
});
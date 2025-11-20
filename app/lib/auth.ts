import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "./db"; // <-- Tu pool de MySQL
import { compare } from "bcryptjs";

interface DBUser {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: string;
}

interface TokenUser {
  id: number;
  name: string;
  email: string;
  rol: string;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<NextAuthUser | null> {
        if (!credentials) return null;

        const [rows]: any = await pool.query(
          "SELECT * FROM User WHERE email = ?",
          [credentials.email]
        );

        const user: DBUser = rows[0];
        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.nombre,
          email: user.email,
          rol: user.rol,
        } as unknown as NextAuthUser;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as TokenUser;
        token.id = u.id;
        token.name = u.name;
        token.email = u.email;
        token.rol = u.rol;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as number,
        name: token.name as string,
        email: token.email as string,
        rol: token.rol as string,
      };
      return session;
    },
  },
};

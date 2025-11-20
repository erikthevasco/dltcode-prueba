import NextAuth, { AuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import db from "../../lib/db";

interface DBUser {
  id: number;
  name: string;
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

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<NextAuthUser | null> {
        if (!credentials?.email || !credentials?.password) return null;

        const [rows]: any = await db.execute(
          "SELECT * FROM User WHERE email = ?",
          [credentials.email]
        );

        const user: DBUser = rows[0];
        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        // Forzamos tipos de NextAuthUser
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          rol: user.rol, // ¡importante!
        } as unknown as NextAuthUser;
      },
    }),
  ],

  session: { strategy: "jwt" },

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

  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

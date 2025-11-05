import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { z } from 'zod';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credenciais',
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        // TODO: substituir por lookup em banco utilizando Prisma
        if (parsed.data.email === 'demo@ijs.eng.br' && parsed.data.password === 'demo123') {
          return {
            id: 'demo-user',
            name: 'Usuário Demo',
            email: parsed.data.email,
            role: 'ENGINEER',
          } satisfies Record<string, unknown>;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
};

export const { handlers: authHandlers, auth, signIn, signOut } = NextAuth(authOptions);

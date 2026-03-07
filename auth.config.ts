import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const { email, password } = credentials as any;

                if (!email || !password) return null;

                const user = await prisma.user.findUnique({
                    where: { email }
                });

                if (!user || !user.password) return null;

                const passwordsMatch = await bcrypt.compare(password, user.password);

                if (passwordsMatch) return user;

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role
            }
            return token
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                (session.user as any).role = token.role as string
            }
            return session
        }
    }
} satisfies NextAuthConfig

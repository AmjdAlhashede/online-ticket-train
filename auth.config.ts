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

                try {
                    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://online-ticket-train-dashboard.vercel.app/api';
                    const res = await fetch(`${API_BASE_URL}/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await res.json();
                    if (data.success && data.user) {
                        return data.user;
                    }
                } catch (e) {
                    console.error("Login API error:", e);
                }

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

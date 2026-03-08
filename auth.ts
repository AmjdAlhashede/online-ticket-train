import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "fallback_secret_for_academic_project_981273918273",
    session: { strategy: "jwt" },
    ...authConfig,
})

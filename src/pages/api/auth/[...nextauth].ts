
import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismaService from "@/lib/prismaService";


export default NextAuth({
    // adapter: PrismaAdapter(prismaService),
    providers: [
        GithubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
        }),
    ],

    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET as string,
});


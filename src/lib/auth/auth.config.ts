import { JWT } from "next-auth/jwt";
import NextAuth, { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import prisma from "../prisma";
import { UserRoleEnum } from "../../../generated/prisma";

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const SESSION_MAX_AGE = 7 * 24 * 60 * 60;
const SESSION_UPDATE_AGE = 24 * 60 * 60;
const TOKEN_SYNC_INTERVAL_SECONDS = 5 * 60;

if (!NEXTAUTH_SECRET) {
    // console.warn("NEXTAUTH_SECRET environment variable is not set. Using default secret for development.");
}

type AuthUserRecord = {
    userId: string;
    email: string | null;
    name: string;
    role: UserRoleEnum;
};

type ExtendedJWT = JWT & {
    syncedAt?: number;
};

const normalizeEmail = (email?: string | null) => email?.trim().toLowerCase() ?? "";

const upsertUserByEmail = async (email: string, nameFallback?: string | null): Promise<AuthUserRecord> => {
    const normalizedEmail = normalizeEmail(email);
    const userName = nameFallback?.trim() || normalizedEmail.split("@")[0];

    return prisma.userV2.upsert({
        where: { email: normalizedEmail },
        update: {
            name: userName,
        },
        create: {
            email: normalizedEmail,
            name: userName,
            role: UserRoleEnum.GUEST,
        },
        select: {
            userId: true,
            email: true,
            name: true,
            role: true,
        },
    });
};

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            id: "google",
            name: "Google",
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                    scope: "openid email profile",
                },
            },
            
        }),
    ],
    pages: {
        signIn: "/",
        error: "/",
    },
    session: {
        strategy: "jwt",
        maxAge: SESSION_MAX_AGE,
        updateAge: SESSION_UPDATE_AGE,
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "google") {
                return true;
            }

            const email = normalizeEmail(user.email);
            if (!email) {
                return false;
            }

            try {
                const dbUser = await upsertUserByEmail(email, user.name);

                Object.assign(user, {
                    id: dbUser.userId,
                    userId: dbUser.userId,
                    email: dbUser.email ?? email,
                    name: dbUser.name,
                    role: dbUser.role,
                });
            } catch (error) {
                return false;
            }

            return true;
        },
        async jwt({ token, user, trigger, session }): Promise<JWT> {
            const now = Math.floor(Date.now() / 1000);

            if (user) {
                const u = user as typeof user & {
                    userId?: string;
                    role?: UserRoleEnum;
                };

                const email = normalizeEmail(u.email);
                if (!email) {
                    return {
                        ...token,
                        sub: u.id ?? token.sub,
                        userId: u.userId ?? u.id,
                        email: u.email ?? undefined,
                        name: u.name ?? undefined,
                        image: u.image ?? undefined,
                        role: u.role,
                        syncedAt: now,
                    };
                }

                try {
                    const dbUser = await upsertUserByEmail(email, u.name);

                    return {
                        ...token,
                        sub: dbUser.userId,
                        userId: dbUser.userId,
                        email: dbUser.email ?? email,
                        name: dbUser.name,
                        image: u.image ?? undefined,
                        role: dbUser.role,
                        syncedAt: now,
                    };
                } catch (error) {
                }

                return {
                    ...token,
                    sub: u.id ?? token.sub,
                    userId: u.userId ?? u.id,
                    email: email || undefined,
                    name: u.name ?? undefined,
                    image: u.image ?? undefined,
                    role: u.role,
                    syncedAt: now,
                };
            }

            if (trigger === "update") {
                if (session) {
                    token = {
                        ...token,
                        ...session,
                    };
                }
            }

            const email = normalizeEmail(token.email);
            if (!email) {
                return token;
            }

            const extendedToken = token as ExtendedJWT;
            const shouldSync =
                !extendedToken.userId ||
                !extendedToken.role ||
                !extendedToken.syncedAt ||
                now - extendedToken.syncedAt >= TOKEN_SYNC_INTERVAL_SECONDS;

            if (!shouldSync) {
                return token;
            }

            try {
                const dbUser =
                    (await prisma.userV2.findUnique({
                        where: { email },
                        select: {
                            userId: true,
                            email: true,
                            name: true,
                            role: true,
                        },
                    })) ?? (await upsertUserByEmail(email, token.name));

                return {
                    ...token,
                    userId: dbUser.userId,
                    email: dbUser.email ?? email,
                    name: dbUser.name,
                    role: dbUser.role,
                    syncedAt: now,
                };
            } catch (error) {
                return token;
            }
        },
        async session({ token, session }) {
            if (token.error) {
                session.error = token.error;
            }

            const resolvedUserId =
                (typeof token.userId === "string" && token.userId) ||
                (typeof token.sub === "string" && token.sub) ||
                "";
            const resolvedEmail =
                (typeof token.email === "string" && token.email) ||
                session.user?.email ||
                "";
            const resolvedName =
                (typeof token.name === "string" && token.name) ||
                session.user?.name ||
                "";
            const resolvedImage =
                (typeof token.image === "string" && token.image) ||
                session.user?.image ||
                "";

            if (resolvedEmail && resolvedName) {
                session.user = {
                    userId: resolvedUserId,
                    email: resolvedEmail,
                    name: resolvedName,
                    image: resolvedImage,
                    role: token.role ?? UserRoleEnum.GUEST,
                };
            }

            return session;
        },
    },
    secret: NEXTAUTH_SECRET || "your-secret-key-change-in-production",
    debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);


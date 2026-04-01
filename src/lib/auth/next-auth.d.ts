import { UserRoleEnum } from "../../../generated/prisma";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        error?: string;
        user: {
            userId: string;
            name: string;
            email: string;
            image: string;
            role: UserRoleEnum;
        };
        expires: Date;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        error?: string;
        userId?: string;
        role?: UserRoleEnum;
        image?: string;
    }
}


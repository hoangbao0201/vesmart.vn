import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getServerSession } from "next-auth";
import { UserRoleEnum } from "../../../generated/prisma";
import { authOptions } from "./auth.config";

type AdminDeny = Extract<GetServerSidePropsResult<Record<string, unknown>>, { redirect: unknown }>;

export async function requireAdminPage(context: GetServerSidePropsContext): Promise<AdminDeny | null> {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session?.user?.userId || session.user.role !== UserRoleEnum.ADMIN) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return null;
}

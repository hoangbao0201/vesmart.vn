import { PrismaClient } from "@prisma/client"

const prismaService = global.prismadb || new PrismaClient();

if(process.env.NODE_ENV !== 'production') global.prismadb = prismaService;

export default prismaService;

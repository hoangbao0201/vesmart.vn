import { Prisma } from "../../../generated/prisma";

export type PrismaSelect<T> = Prisma.SelectSubset<T, any>;

export enum SelectRole {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}

export enum SelectContext {
  LIST = 'LIST',
  DETAIL = 'DETAIL',
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IPageOptions {
  page: number;
  take: number;
  order?: Order;
  q?: string;
}
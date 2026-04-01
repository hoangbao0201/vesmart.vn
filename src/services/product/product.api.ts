import prisma from "@/lib/prisma";
import { PageOptionsMapper } from "../mappers/page-options.mapper";
import { SelectContext, SelectRole } from "../prisma-select/prisma-select-config";
import { ProductSelectConfig } from "../prisma-select/product-select";
import { IGetProductDetailParam, IGetProductDetailResponse, IGetProductListQuery, IGetProductListResponse } from "./product.type";
import { ProductMapper } from "../mappers/product.mappers";


export const getProductDetailApi = async ({ param }: { param: IGetProductDetailParam }): Promise<IGetProductDetailResponse | null> => {
    try {
        const { productId } = param;
        const select = ProductSelectConfig(SelectContext.DETAIL, SelectRole.GUEST);
        const data = await prisma.productV2.findUnique({
            where: { productId },
            select: select,
        });

        if (!data) {
            return null;
        }
        const dataMap = ProductMapper.toDtoDetail(data);
        return { product: dataMap };
    } catch (error) { return null; }
}

export const getProductListApi = async ({ query }: { query: IGetProductListQuery }): Promise<IGetProductListResponse | null> => {
    try {
        const { take, page, order } = query;
        
        const select = ProductSelectConfig(SelectContext.LIST, SelectRole.GUEST);
        const [data, count] = await prisma.$transaction([
            prisma.productV2.findMany({
                take: take,
                skip: (page - 1) * take,
                select: select,
                orderBy: {
                    createdAt: order,
                },
            }),
            prisma.productV2.count(),
        ]);
        if (!data) {
            return null;
        }
        const meta = new PageOptionsMapper({ page, take, itemCount: count });
        return {
            products: ProductMapper.toDtoList(data),
            meta,
        };
    } catch (error) { return null; }
}
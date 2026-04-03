import type { PublicListMeta } from "@/configs/list-infinite.config";
import type { PageOptionsMapper } from "@/services/mappers/page-options.mapper";

export function pageMetaToPlain(meta: PageOptionsMapper): PublicListMeta {
    return {
        page: meta.page,
        take: meta.take,
        itemCount: meta.itemCount,
        pageCount: meta.pageCount,
    };
}

import { MetaTypeEnum } from "../../../generated/prisma";

export class PostMapper {
    static toDtoDetail(data: any) {
        if (!data) return null;

        const { metas, ...rest } = data;

        const tags = metas?.filter((m: any) => m.meta.type === MetaTypeEnum.TAG).map((m: any) => ({ name: m.meta.name }));

        return {
            ...rest,
            tags,
        };
    }

    static toDto(data: any) {
        if (!data) return null;

        const { metas, ...rest } = data;
        const tags = metas?.filter((m: any) => m.meta.type === MetaTypeEnum.TAG).map((m: any) => ({ name: m.meta.name }));

        return {
            ...rest,
            tags,
        };
    }

    static toDtoList(list: any[]) {
        return list.map(PostMapper.toDto).filter((v): v is any => v !== null);
    }
}

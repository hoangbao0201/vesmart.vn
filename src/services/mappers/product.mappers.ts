
export class ProductMapper {
    static toDtoDetail(data: any) {
        if (!data) return null;

        const { metas, ...rest } = data;

        return {
            ...rest,
        };
    }

    static toDto(data: any) {
        if (!data) return null;

        const { metas, ...rest } = data;

        return {
            ...rest,
        };
    }

    static toDtoList(list: any[]) {
        return list.map(ProductMapper.toDto).filter((v): v is any => v !== null);
    }
}

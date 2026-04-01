export class PageOptionsMapper {
    readonly page: number;

    take: number;

    readonly itemCount: number;

    pageCount: number;

    constructor({ page, take, itemCount }: { page: number; take: number; itemCount: number }) {
        this.page = page;
        this.take = take;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
    }
}
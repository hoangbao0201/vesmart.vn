/** Kích thước mỗi lần tải cho danh sách sản phẩm / bài viết (SSG + infinite scroll). */
export const LIST_PAGE_SIZE = 48;

export type PublicListMeta = {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
};

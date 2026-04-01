/**
 * Slug URL cho thẻ (Meta TAG): chữ thường, dấu gạch ngang, bỏ ký tự đặc biệt.
 * Phải khớp với cách tra cứu trong DB (so khớp slug ↔ meta.name).
 */
export function tagNameToSlug(name: string): string {
    return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

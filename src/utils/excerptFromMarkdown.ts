/**
 * Tạo đoạn mô tả thuần text từ markdown cho meta description / JSON-LD.
 */
export function excerptFromMarkdown(markdown: string, maxLen = 158): string {
    if (!markdown || typeof markdown !== "string") {
        return "";
    }
    let s = markdown
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
        .replace(/\[[^\]]*\]\([^)]*\)/g, "$1")
        .replace(/^#{1,6}\s+.*/gm, " ")
        .replace(/[*_>`|-]{1,3}/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    if (s.length <= maxLen) {
        return s;
    }

    const cut = s.slice(0, maxLen + 1);
    const lastSpace = cut.lastIndexOf(" ");
    const wordBoundary = lastSpace > 100 ? lastSpace : maxLen;
    return `${s.slice(0, wordBoundary).trimEnd()}…`;
}

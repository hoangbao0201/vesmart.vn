export function cloudinaryDeliveryUrl(
    src: string | undefined | null,
    opts: { maxWidth: number } = { maxWidth: 800 },
): string {
    if (!src || typeof src !== "string") return "";
    const marker = "/image/upload/";
    if (!src.includes("res.cloudinary.com") || !src.includes(marker)) return src;
    if (/\/image\/upload\/[^/]*\bf_auto\b/.test(src)) return src;

    const { maxWidth } = opts;
    const transform = `f_auto,q_auto,w_${maxWidth},c_limit`;
    return src.replace(marker, `${marker}${transform}/`);
}

export function cloudinarySrcSet(src: string | undefined | null, widths: number[]): string | undefined {
    if (!src || !widths.length) return undefined;
    const marker = "/image/upload/";
    if (!src.includes("res.cloudinary.com") || !src.includes(marker)) return undefined;

    return widths
        .map((w) => {
            const url = cloudinaryDeliveryUrl(src, { maxWidth: w });
            return `${url} ${w}w`;
        })
        .join(", ");
}

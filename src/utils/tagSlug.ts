/**
 * Slug URL cho thẻ (Meta TAG): chữ thường, dấu gạch ngang, bỏ ký tự đặc biệt.
 * Phải khớp với cách tra cứu trong DB (so khớp slug ↔ meta.name).
 */
export function tagNameToSlug(text: string): string | null {
    if (!text) {
        return null;
    }

    text = text.toLowerCase(); // Chuyển chuỗi sang chữ thường

    text = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    text = text.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    text = text.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    text = text.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    text = text.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    text = text.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    text = text.replace(/đ/g, "d");

    text = text.replace(/[^\w\s]/gi, ""); // Loại bỏ tất cả các ký tự đặc biệt và chữ số
    text = text.trim().replace(/\s+/g, "-"); // Thay thế khoảng trắng bằng dấu gạch ngang

    return text;
}

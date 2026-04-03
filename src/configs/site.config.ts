const SITE_URL = "https://vesmart.vn";

export const SITE_CONFIG = {
    name: "VESMART",
    email: "vesmart98@gmail.com",
    phone: "0971183153",
    address: "634/24 Trưng Nữ Vương, phường Hòa Thuận Tây, Đà Nẵng",
    description: "Trung tâm sửa chữa robot hút bụi VESMART",
    facebook: "https://facebook.com/suachuarobothutbuidanang",
    tiktok: "https://tiktok.com/@vesmart98",
    url: SITE_URL,
    logo: "/logo.png",
    icon: "/icon.png",
    theme: "light",
    language: "vi",
    currency: "VND",
    timezone: "Asia/Ho_Chi_Minh",
    /** Đồng bộ với public/manifest.json (PWA / theme-color). */
    themeColor: "#f43f5e",
    /**
     * Dữ liệu cho JSON-LD Offer (Google: shippingDetails, hasMerchantReturnPolicy).
     * Cập nhật cho khớp chính sách vận chuyển / đổi trả thực tế của cửa hàng.
     */
    merchant: {
        shipping: {
            /** Phí vận chuyển mặc định hiển thị trong schema (0 = miễn phí). */
            rateValueVnd: 0,
            destinationCountry: "VN",
            handlingDaysMin: 1,
            handlingDaysMax: 2,
            transitDaysMin: 2,
            transitDaysMax: 7,
        },
        returns: {
            applicableCountry: "VN",
            merchantReturnDays: 7,
            /** https://schema.org/MerchantReturnFiniteReturnWindow */
            returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
            /** https://schema.org/ReturnByMail */
            returnMethod: "https://schema.org/ReturnByMail",
            /** https://schema.org/FreeReturn */
            returnFees: "https://schema.org/FreeReturn",
            /** Trang chính sách đổi trả (đổi khi có URL riêng). */
            policyPageUrl: SITE_URL,
        },
    },
} as const;

export type SITE_CONFIG_TYPE = typeof SITE_CONFIG;
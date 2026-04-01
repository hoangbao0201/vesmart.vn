import Link from "next/link";

import PageSeoHead from "@/components/seo/PageSeoHead";
import { SITE_CONFIG } from "@/configs/site.config";
import { buildPageTitle } from "@/lib/seo";

export default function Page500() {
    const title = buildPageTitle("Lỗi máy chủ");

    return (
        <>
            <PageSeoHead
                title={title}
                description="Đã xảy ra lỗi tạm thời. Vui lòng thử lại sau."
                canonicalUrl="/500"
                ogType="website"
                noindex
                includeHreflang={false}
            />
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
                <p className="text-6xl font-bold text-slate-300 mb-2">500</p>
                <h1 className="text-2xl font-bold text-slate-800 mb-3">Lỗi máy chủ</h1>
                <p className="text-gray-600 max-w-md mb-8">
                    Chúng tôi đang gặp sự cố kỹ thuật. Bạn vui lòng tải lại trang hoặc quay lại sau.
                </p>
                <Link
                    href="/"
                    className="px-5 py-2.5 rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900 transition-colors"
                >
                    Về trang chủ
                </Link>
            </div>
        </>
    );
}

import Link from "next/link";

import PageSeoHead from "@/components/seo/PageSeoHead";
import { SITE_CONFIG } from "@/configs/site.config";
import { buildPageTitle } from "@/lib/seo";

export default function Page404() {
    const title = buildPageTitle("Không tìm thấy trang");

    return (
        <>
            <PageSeoHead
                title={title}
                description={`Trang không tồn tại hoặc đã được chuyển. Quay về ${SITE_CONFIG.name} để tiếp tục.`}
                canonicalUrl="/404"
                ogType="website"
                noindex
                includeHreflang={false}
            />
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
                <p className="text-6xl font-bold text-slate-300 mb-2">404</p>
                <h1 className="text-2xl font-bold text-slate-800 mb-3">Không tìm thấy trang</h1>
                <p className="text-gray-600 max-w-md mb-8">
                    Đường dẫn có thể đã đổi hoặc bị gõ sai. Bạn có thể về trang chủ hoặc tìm bài viết, sản phẩm.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                    <Link
                        href="/"
                        className="px-5 py-2.5 rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900 transition-colors"
                    >
                        Trang chủ
                    </Link>
                    <Link
                        href="/bai-viet"
                        className="px-5 py-2.5 rounded-lg border border-gray-300 text-slate-800 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Bài viết
                    </Link>
                    <Link
                        href="/san-pham"
                        className="px-5 py-2.5 rounded-lg border border-gray-300 text-slate-800 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Sản phẩm
                    </Link>
                </div>
            </div>
        </>
    );
}

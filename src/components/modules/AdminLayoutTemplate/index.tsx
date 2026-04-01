import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/router";

interface AdminLayoutTemplateProps {
    children: ReactNode;
}

const menuItems = [
    { href: "/admin/bai-viet", label: "Danh sách bài viết" },
    { href: "/admin/san-pham", label: "Danh sách sản phẩm" },
    { href: "/admin/don-hang", label: "Danh sách đặt hàng" },
];

const AdminLayoutTemplate = ({ children }: AdminLayoutTemplateProps) => {
    const router = useRouter();

    return (
        <div className="container mx-auto px-3 py-6 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
                <aside className="bg-white border border-gray-200 rounded-lg h-fit">
                    <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-lg font-semibold">Quản trị</p>
                    </div>
                    <nav className="p-2 flex flex-col gap-1">
                        {menuItems.map((item) => {
                            const isActive = router.asPath.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-3 py-2 rounded-md transition-all ${
                                        isActive
                                            ? "bg-sky-100 text-sky-700 font-medium"
                                            : "hover:bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                <section className="min-w-0">{children}</section>
            </div>
        </div>
    );
};

export default AdminLayoutTemplate;

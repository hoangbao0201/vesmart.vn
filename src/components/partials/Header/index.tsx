"use client";

import Link from "next/link";
import { lazy } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import NavSearch from "./NavSearch";
import classNames from "@/utils/classNames";
import { SITE_CONFIG } from "@/configs/site.config";

const NavCart = dynamic(() => import("./NavCart"), { ssr: false, loading: () => <div className="w-10 h-10 bg-gray-200 rounded-full" /> });
const NavAuth = dynamic(() => import("./NavAuth"), { ssr: false, loading: () => <div className="w-10 h-10 bg-gray-200 rounded-full" /> });

const NAV_ITEMS = [
  {
    href: "/",
    label: "Trang chủ",
    isActive: (pathname: string | null) => pathname === "/",
  },
  {
    href: "/bai-viet",
    label: "Bài viết",
    isActive: (pathname: string | null) => pathname?.startsWith("/bai-viet"),
  },
  {
    href: "/san-pham",
    label: "Sản phẩm",
    isActive: (pathname: string | null) => pathname?.startsWith("/san-pham"),
  },
  {
    href: "/gio-hang",
    label: "Giỏ hàng",
    isActive: (pathname: string | null) => pathname === "/gio-hang",
  },
];

interface HeaderProps {
  isDynamic: boolean;
}
export default function Header({ isDynamic }: HeaderProps) {
  const pathname = usePathname();

  return (
    <>
      <div className="sticky top-0 z-10 border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <div className="container max-w-7xl px-3 mx-auto">
          <div className="py-1 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0 overflow-hidden relative">
              <div className="animate-scroll whitespace-nowrap">
                <span className="inline-flex items-center text-sm">
                  <span className="font-medium">Không mất phí nếu không sửa được!</span>
                  <span className="w-1 h-1 mx-3 bg-slate-400 rounded-full" />
                  <span>Tiếp nhận sửa chữa trên mọi tỉnh thành</span>
                  <span className="w-1 h-1 mx-3 bg-slate-400 rounded-full" />
                  <span>Chuyên sửa robot hút bụi, máy hút bụi cầm tay, máy lọc không khí, thiết bị smart home</span>
                  <span className="w-1 h-1 mx-3 bg-slate-400 rounded-full" />
                </span>
                <span className="inline-flex items-center text-sm">
                  <span className="font-medium">Không mất phí nếu không sửa được!</span>
                  <span className="w-1 h-1 mx-3 bg-slate-400 rounded-full" />
                  <span>Tiếp nhận sửa chữa trên mọi tỉnh thành</span>
                  <span className="w-1 h-1 mx-3 bg-slate-400 rounded-full" />
                  <span>Chuyên sửa robot hút bụi, máy hút bụi cầm tay, máy lọc không khí, thiết bị smart home</span>
                  <span className="w-1 h-1 mx-3 bg-slate-400 rounded-full" />
                </span>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0 text-sm">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-1.5 hover:text-blue-300 transition-colors"
                title={`Email: ${SITE_CONFIG.email}`}
              >
                <span>{SITE_CONFIG.email}</span>
              </a>
              <span className="text-slate-400">|</span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SITE_CONFIG.phone}
                className="flex items-center gap-1.5 hover:text-blue-300 transition-colors"
                title={`Đà Nẵng: ${SITE_CONFIG.phone}`}
              >
                <span>Đà Nẵng: {SITE_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <header className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-800">
        <div className="container max-w-7xl px-3 py-2 mx-auto">
          <div className="flex justify-between items-stretch">

            <Link
              href="/"
              title={SITE_CONFIG.name}
              className="text-md leading-10 font-extrabold text-white"
            >
              {SITE_CONFIG.name}
            </Link>

            <div className="flex-1 flex justify-end max-w-full gap-2">
              <NavSearch />

              <NavCart />

              <NavAuth />
            </div>
          </div>
        </div>
      </header>

      {/* Nav links */}
      <nav className="bg-white border-b border-gray-100">
        <div className="container max-w-7xl px-3 mx-auto">
          <div className="py-1 font-semibold flex items-center flex-wrap gap-2">
            {NAV_ITEMS.map(({ href, label, isActive }) => (
              <Link
                key={href}
                href={href}
                className={classNames("group flex items-center justify-center gap-2 px-3 py-1 rounded-sm transition-colors",
                  isActive(pathname) ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                )}
              >
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav >
    </>
  );
}

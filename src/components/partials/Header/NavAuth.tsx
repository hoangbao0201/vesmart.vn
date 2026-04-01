'use client';

import { Fragment, useState } from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import { Dialog, Popover, Transition } from "@headlessui/react";

import IconXmark from "../../icons/IconXmark";
import Image from "next/image";
import classNames from "@/utils/classNames";
import { UserRoleEnum } from "../../../../generated/prisma";
import Link from "next/link";
import IconUser from "@/components/icons/IconUser";

const NavAuth = () => {
    const { data: session, status } = useSession();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState<"LOGIN" | "REGISTER">("LOGIN");

    const handleOpenAuthModal = (open: boolean) => {
        setIsAuthModalOpen(open);
    }

    const handleChangeTab = (tab: "LOGIN" | "REGISTER") => {
        setSelectedTab(tab);
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);
        try {
            const formData = new FormData(e.target as HTMLFormElement);

            const account = formData.get("account") as string;
            const password = formData.get("password") as string;

            // const response = await fetch("/api/auth/login", {
            //     method: "POST",
            //     body: JSON.stringify({ account, password }),
            // });
            // const data = await response.json();
            // if (data.success) {
            //     toast.success("Đăng nhập thành công");
            // }
        } catch (error) {
            // console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new FormData(e.target as HTMLFormElement);

            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const confirmPassword = formData.get("confirmPassword") as string;

            // const response = await fetch("/api/auth/register", {
            //     method: "POST",
            //     body: JSON.stringify({ name, email, password, confirmPassword }),
            // });
            // const data = await response.json();
            // if (data.success) {
            //     toast.success("Đăng ký thành công");
            // }
        } catch (error) {
            // console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleLoginWithGoogle = async () => {
        setIsSubmitting(true);
        try {
            await signIn("google", {
                callbackUrl: window.location.href,
            });
        } catch (error) {
            // console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            {
                status === "loading" ? (
                    <div></div>
                ) : (
                    !session ? (
                        <button
                            type="button"
                            onClick={() => handleOpenAuthModal(true)}
                            aria-label="Đăng nhập hoặc đăng ký"
                            className="w-10 h-10 cursor-pointer relative bg-slate-600 hover:bg-slate-500 rounded-full transition-colors"
                        >
                            <IconUser className="w-10 h-10 p-2 fill-white" aria-hidden />
                        </button>
                    ) : (
                        <div>
                            <Popover className="relative">
                            {({ open }) => (
                                <>
                                    <Popover.Button
                                        className="flex items-center justify-center cursor-pointer text-white focus:outline-none"
                                        aria-label={
                                            session.user?.name
                                                ? `Menu tài khoản — ${session.user.name}`
                                                : "Menu tài khoản"
                                        }
                                    >
                                        <Image
                                            src={session.user.image ?? ""}
                                            alt=""
                                            width={100}
                                            height={100}
                                            className="w-10 h-10 rounded-full"
                                            aria-hidden
                                        />
                                    </Popover.Button>
                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel
                                            static
                                            className="absolute right-0 z-20 mt-3 w-60 origin-top-right rounded-md shadow-2xl bg-white border border-gray-300"
                                        >
                                            <div className="p-4 text-gray-800">
                                                <div className="flex items-center mb-2">
                                                    <Image
                                                        width={36}
                                                        height={36}
                                                        src={session.user.image ?? ""}
                                                        alt={session.user.name ?? ""}
                                                        className="w-8 h-8 border border-gray-200 rounded-full mr-2"
                                                    />
                                                    <div>
                                                        <div className="text-sm font-semibold">{session.user.name}</div>
                                                        <div className="text-xs text-gray-500">{session.user.email}</div>
                                                    </div>
                                                </div>
                                                <hr className="my-2 border-gray-200" />

                                                <div className="flex flex-col gap-2 mb-1">
                                                    {
                                                        session.user.role === UserRoleEnum.ADMIN ? (
                                                            <Link href="/admin" className="w-full cursor-pointer text-left text-sm hover:bg-blue-100 text-blue-600 px-3 py-2 rounded transition">
                                                                Quản trị
                                                            </Link>
                                                        ) : null
                                                    }
                                                </div>
                                                <button
                                                    onClick={() => signOut()}
                                                    className="w-full cursor-pointer text-left text-sm bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded transition"
                                                >
                                                    Đăng xuất
                                                </button>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                            </div>
                    )
                )
            }
            <Transition appear show={isAuthModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => handleOpenAuthModal(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-semibold uppercase leading-6 text-gray-900"
                                        >
                                            {selectedTab === "LOGIN" ? "Đăng nhập" : "Đăng ký"}
                                        </Dialog.Title>
                                        <button
                                            onClick={() => handleOpenAuthModal(false)}
                                            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
                                        >
                                            <IconXmark className="w-8 h-8 p-1 fill-gray-600" />
                                        </button>
                                    </div>

                                    <div className="mb-6">
                                        <div className="p-1 flex space-x-1 rounded-xl bg-gray-200">
                                            <button
                                                onClick={() => handleChangeTab("LOGIN")}
                                                className={classNames(
                                                    "w-full cursor-pointer rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors",
                                                    selectedTab === "LOGIN"
                                                        ? "bg-white"
                                                        : ""
                                                )}
                                            >
                                                Đăng nhập
                                            </button>
                                            <button
                                                onClick={() => handleChangeTab("REGISTER")}
                                                className={classNames(
                                                    "w-full cursor-pointer rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors",
                                                    selectedTab === "REGISTER"
                                                        ? "bg-white"
                                                        : ""
                                                )}
                                            >
                                                Đăng ký
                                            </button>
                                        </div>
                                    </div>

                                    {selectedTab === "LOGIN" ? (
                                        <div>
                                            <form onSubmit={handleLogin} className="space-y-4">
                                                <div>
                                                    <label
                                                        htmlFor="login-account"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Tài khoản
                                                    </label>
                                                    <input
                                                        required
                                                        id="login-account"
                                                        name="account"
                                                        type="text"
                                                        autoComplete="username"
                                                        placeholder="Email hoặc tài khoản"
                                                        className="appearance-none relative block w-full px-3 h-11 leading-11 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="login-password"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Mật khẩu
                                                    </label>
                                                    <input
                                                        required
                                                        id="login-password"
                                                        name="password"
                                                        type="password"
                                                        autoComplete="current-password"
                                                        placeholder="Mật khẩu"
                                                        className="appearance-none relative block w-full px-3 h-11 leading-11 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full cursor-pointer flex justify-center px-3 h-11 leading-11 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    ) : (
                                        <div>
                                            <form onSubmit={handleRegister} className="space-y-4">
                                                <div>
                                                    <label
                                                        htmlFor="register-name"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Họ và tên
                                                    </label>
                                                    <input
                                                        required
                                                        id="register-name"
                                                        name="name"
                                                        type="text"
                                                        autoComplete="name"
                                                        placeholder="Họ và tên"
                                                        className="appearance-none relative block w-full px-3 h-11 leading-11 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="register-email"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Email
                                                    </label>
                                                    <input
                                                        required
                                                        id="register-email"
                                                        name="email"
                                                        type="email"
                                                        autoComplete="email"
                                                        placeholder="Email"
                                                        className="appearance-none relative block w-full px-3 h-11 leading-11 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="register-password"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Mật khẩu
                                                    </label>
                                                    <input
                                                        id="register-password"
                                                        name="password"
                                                        type="password"
                                                        autoComplete="new-password"
                                                        required
                                                        placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                                                        className="appearance-none relative block w-full px-3 h-11 leading-11 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="register-confirm-password"
                                                        className="block text-sm font-medium mb-1"
                                                    >
                                                        Xác nhận mật khẩu
                                                    </label>
                                                    <input
                                                        required
                                                        id="register-confirm-password"
                                                        name="confirmPassword"
                                                        type="password"
                                                        autoComplete="new-password"
                                                        placeholder="Xác nhận mật khẩu"
                                                        className="appearance-none relative block w-full px-3 h-11 leading-11 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full cursor-pointer flex justify-center px-3 h-11 leading-11 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}

                                    <div className="mt-4">
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300" />
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white text-gray-500">Hoặc</span>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <button onClick={handleLoginWithGoogle} className="w-full cursor-pointer flex justify-center px-3 h-11 leading-11 border border-gray-200 rounded-md text-sm font-medium bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                                                {isSubmitting ? "Đang xử lý..." : "Đăng nhập với Google"}
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default NavAuth;
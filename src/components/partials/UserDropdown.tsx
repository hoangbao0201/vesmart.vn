import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";

const UserDropdown = ({ session }: { session: Session }) => {
    const { email, image } = session?.user || {};

    if (!email) return null;

    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button>
                    <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-105 sm:h-9 sm:w-9">
                        <Image
                            alt={email}
                            src={
                                image ||
                                `https://avatars.dicebear.com/api/micah/${email}.svg`
                            }
                            width={45}
                            height={45}
                        />
                    </span>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                            {
                                email === "hoangbao020103@gmail.com" && (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href={`/admin`}
                                                target="_blank"
                                                className={`${
                                                    active
                                                        ? "bg-gray-100"
                                                        : "text-gray-900"
                                                } group flex w-full items-center rounded-sm px-2 py-2 text-sm`}
                                            >
                                                Admin
                                            </Link>
                                        )}
                                    </Menu.Item>
                                )
                            }
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => signOut()}
                                        className={`${
                                            active
                                                ? "bg-gray-100"
                                                : "text-gray-900"
                                        } group flex w-full items-center rounded-sm px-2 py-2 text-sm`}
                                    >
                                        Đăng xuất
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default UserDropdown;

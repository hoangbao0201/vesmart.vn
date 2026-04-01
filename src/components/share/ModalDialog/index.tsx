import { Dispatch, Fragment, ReactNode, SetStateAction } from "react";

import { Dialog, Transition } from "@headlessui/react";

import IconXmark from "../../icons/IconXmark";
import classNames from "@/utils/classNames";

interface ModalDialogProps {
    title?: string
    children: ReactNode
    isOpen: boolean
    className?: string
    size?: "small" | "medium" | "large" | "extra" | "full";
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const ModalDialog = ({
    title,
    children,
    isOpen,
    setIsOpen,
    className = "",
    size = "medium",
}: ModalDialogProps) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={setIsOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/10" />
                </Transition.Child>

                <div className="fixed flex flex-col top-0 left-0 right-0 bottom-0 h-screen w-screen md:pt-20 pb-5 py-5 px-1">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel
                            className={classNames(
                                "relative flex flex-col min-h-0 w-full mx-auto transform bg-white rounded-lg shadow-xl transition-all pb-4",
                                size === "small" ? "max-w-md" : "",
                                size === "medium" ? "max-w-xl" : "",
                                size === "large" ? "max-w-3xl" : "",
                                size === "extra" ? "max-w-7xl" : "",
                                size === "full" ? "max-w-full h-full" : ""
                            )}
                        >
                            <Dialog.Title className={`uppercase font-semibold text-lg py-4 text-center border-b border-gray-200`}>{title}</Dialog.Title>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute cursor-pointer right-4 top-4 bg-gray-200 fill-gray-600 hover:bg-gray-300 p-[6px] rounded-full outline-none"
                            >
                                <IconXmark className="w-6 h-6 p-1 fill-gray-500" />
                            </button>
                            <div className="relative md:px-10 px-5 py-4 flex flex-col overflow-y-auto">{children}</div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ModalDialog;

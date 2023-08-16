import Link from "next/link";
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react";

import { signIn } from "next-auth/react";

import Modal from "../share/Modal";
import LoadingDots from "./Loading/LoadingDots";
import { IconGoogle } from "../../../public/static/icons/IconSvg";

interface SignInModalProps {
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
}

const SignInModal = ({ isShow, setIsShow }: SignInModalProps) => {
    const [signInClicked, setSignInClicked] = useState(false);

    return (
        <Modal isShow={isShow} setIsShow={setIsShow}>
            <div className="w-full overflow-hidden">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
                    <Link href={`/`}>
                        <p className="text-xl leading-normal font-bold select-none">VESMART</p>
                    </Link>
                    <h3 className="font-display text-2xl font-bold">Đăng nhập</h3>
                </div>

                <div className="flex flex-col space-y-4 py-8">
                    <button
                        disabled={signInClicked}
                        className={`${
                            signInClicked
                                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                                : "border border-gray-200 bg-white text-black hover:bg-gray-50"
                        } flex h-12 w-full items-center justify-center space-x-3 rounded-md border text-base shadow-sm transition-all duration-75 focus:outline-none`}
                        onClick={() => {
                            setSignInClicked(true);
                            signIn("google");
                        }}
                    >
                        {signInClicked ? (
                            <LoadingDots color="#808080" />
                        ) : (
                            <>
                                <IconGoogle className="h-5 w-5" />
                                <p>Đăng nhập với Google</p>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

// export default SignInModal;

export function useSignInModal() {
    const [isShowModal, setIsShowModal] = useState(false);

    const SignInModalCallback = useCallback(() => {
        return (
            <SignInModal
                isShow={isShowModal}
                setIsShow={setIsShowModal}
            />
        );
    }, [isShowModal, setIsShowModal]);

    return useMemo(
        () => ({ setIsShowModal, SignInModal: SignInModalCallback }),
        [setIsShowModal, SignInModalCallback]
    );
}

import "@/styles/tailwind.css";
import "@/styles/globals.scss";
import "@/styles/feature.scss";
import "react-markdown-editor-lite/lib/index.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ReactElement, ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

import ProviderLayout from "@/components/layouts/ProviderLayout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <div className={`${inter.className} antialiased`}>
            <ProviderLayout>
                {getLayout(<Component {...pageProps} />)}
            </ProviderLayout>
        </div>
    );
}

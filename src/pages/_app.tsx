import "@/styles/globals.scss";
import "@/styles/feature.scss";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";


import "nprogress/nprogress.css";
import NProgress from "nprogress";
import { Router } from "next/router";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { GoogleAnalytics } from '@next/third-parties/google'

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <>
            <ThemeProvider attribute="class">
                <SessionProvider session={session}>
                    <Provider store={store}>
                        <PersistGate loading={false} persistor={persistor}>
                            {() => getLayout(<Component {...pageProps} />)}
                        </PersistGate>
                    </Provider>
                </SessionProvider>

                <ToastContainer />
            </ThemeProvider>
            <GoogleAnalytics gaId="G-XH5WY2HDXE" />
        </>
    )
}

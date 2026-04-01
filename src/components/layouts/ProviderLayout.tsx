"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react"
import { PersistGate } from "redux-persist/integration/react";

import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import { GoogleAnalytics } from "@next/third-parties/google";

import { persistor, store } from "@/store";

const ProviderLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <NextTopLoader
                showSpinner={false}
                // color="#2563ebcc"
                initialPosition={0.1}
                height={3}
                easing="ease"
                speed={50}
            />
            <Toaster position="top-center" richColors />
            <SessionProvider
                refetchInterval={0}
                refetchOnWindowFocus={false}
            >
                <Provider store={store}>
                    <ThemeProvider attribute="class" defaultTheme="light">
                        <PersistGate loading={children} persistor={persistor}>
                            {children}
                        </PersistGate>
                    </ThemeProvider>
                </Provider>
            </SessionProvider>
            <GoogleAnalytics gaId="G-XH5WY2HDXE" />
        </>
    )
}

export default ProviderLayout;
import { Html, Head, Main, NextScript } from "next/document";

import { SITE_CONFIG } from "@/configs/site.config";

export default function Document() {
    return (
        <Html lang="vi">
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content={SITE_CONFIG.themeColor} />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/static/icons/ios/apple-icon-180x180.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href="/static/icons/android/android-icon-192x192.png"
                />
                <meta
                    name="google-site-verification"
                    content="oixwdquX6MnMAWSPI4eKn9BlO7ooi292xlAwt-vs9_o"
                />

                <meta
                    name="google-adsense-account"
                    content="ca-pub-6688547661590907"
                />
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6688547661590907"
                    crossOrigin="anonymous"
                ></script>

            </Head>
            <body className="antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

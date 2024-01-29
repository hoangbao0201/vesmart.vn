import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="vi">
            <Head>
                <meta
                    name="google-site-verification"
                    content="oixwdquX6MnMAWSPI4eKn9BlO7ooi292xlAwt-vs9_o"
                />

                <link rel="text" href="/ads.txt" />
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
            <body className="text-gray-800">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

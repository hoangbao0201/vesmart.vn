import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="vi">
            <Head>

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
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

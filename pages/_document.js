import { Head, Html, Main, NextScript } from "next/document";

const MyDocument = () => {
  return (
    <Html>
      <Head>
        <link
          rel="preload"
          href="/fonts/RobotoSlab-Bold.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/RobotoSlab-Regular.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/RobotoSlab-ExtraLight.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/RobotoSlab-ExtraBold.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/RobotoSlab-SemiBold.ttf"
          as="font"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main></Main>
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;

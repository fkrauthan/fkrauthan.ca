import Head from "next/head";
import { useRouter } from "next/router";

import BuyACoffee from "./BuyACoffee";
import Header from "./header";

function Layout({ children, pageTitle, pageDescription, headerContent, headerClassName, hideTopNavigation }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />

        <title>{`${pageTitle} | Florian Krauthan`}</title>
        <meta name="description" content={pageDescription} />

        <meta property="og:url" content={router.asPath} />
        <meta property="og:title" content={`${pageTitle} | Florian Krauthan`} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Florian Krauthan" />
        <meta property="og:locale" content="en_CA" />
      </Head>

      <Header content={headerContent} headerClassName={headerClassName} hideTopNavigation={hideTopNavigation} />
      {children && <main>{children}</main>}

      <BuyACoffee />
    </>
  );
}

export default Layout;

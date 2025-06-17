import PlausibleProvider from "next-plausible";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const customDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST;
  const enabled = process.env.NEXT_PUBLIC_PLAUSIBLE_ENABLED === "1";

  return (
    <PlausibleProvider domain={domain} customDomain={customDomain} enabled={enabled} trackOutboundLinks>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </PlausibleProvider>
  );
}

export default MyApp;

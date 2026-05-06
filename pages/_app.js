import PlausibleProvider from "next-plausible";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const customDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST;
  const enabled = process.env.NEXT_PUBLIC_PLAUSIBLE_ENABLED === "1";

  return (
    <PlausibleProvider
      src={`${customDomain}/js/pa-axkESUYVPVBXzmkVDK5rw.js`}
      enabled={enabled}
      init={{
        endpoint: `${customDomain}/api/event`,
      }}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </PlausibleProvider>
  );
}

export default MyApp;

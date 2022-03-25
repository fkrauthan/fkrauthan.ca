import { ThemeProvider } from "next-themes";

import usePiwikAnalytics from "../components/hooks/usePiwikAnalytics";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  usePiwikAnalytics();

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

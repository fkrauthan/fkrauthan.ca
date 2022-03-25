import { useRouter } from "next/router";
import { useEffect } from "react";

const usePiwikAnalytics = () => {
  const domain = process.env.NEXT_PUBLIC_PIWIK_DOMAIN;
  const siteId = process.env.NEXT_PUBLIC_PIWIK_SITE_ID;

  if (!domain || !siteId) {
    return;
  }

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (window && window._paq) {
        window._paq.push(["setCustomUrl", url]);
        window._paq.push(["setDocumentTitle", document.title]);
        window._paq.push(["trackPageView"]);
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
};
export default usePiwikAnalytics;

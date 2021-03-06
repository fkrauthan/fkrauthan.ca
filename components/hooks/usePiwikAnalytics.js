import { useRouter } from "next/router";
import { useEffect } from "react";

const usePiwikAnalytics = () => {
  const router = useRouter();
  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_PIWIK_DOMAIN;
    const siteId = process.env.NEXT_PUBLIC_PIWIK_SITE_ID;

    if (!domain || !siteId) {
      return;
    }

    const handleRouteChange = (url) => {
      if (window && window._paq) {
        window._paq.push(["setCustomUrl", url]);
        window._paq.push(["setDocumentTitle", document.title]);
        window._paq.push(["trackPageView"]);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
};
export default usePiwikAnalytics;

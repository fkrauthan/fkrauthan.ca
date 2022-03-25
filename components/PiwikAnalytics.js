function PiwikAnalytics() {
  const domain = process.env.NEXT_PUBLIC_PIWIK_DOMAIN;
  const siteId = process.env.NEXT_PUBLIC_PIWIK_SITE_ID;

  if (!domain || !siteId) {
    return null;
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
      var _paq = window._paq = window._paq || [];
      /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
      var u="//${domain}/";
      _paq.push(['setTrackerUrl', u+'matomo.php']);
      _paq.push(['setSiteId', '${siteId}']);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
    })();
    `,
      }}
    />
  );
}

export default PiwikAnalytics;

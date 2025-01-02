const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      require("unplugin-icons/webpack").default({
        compiler: "jsx",
        jsx: "react",
      })
    );

    return config;
  },
});

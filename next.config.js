const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const isDockerBuild = process.env.IS_DOCKER_BUILD === "true";
module.exports = withBundleAnalyzer({
  output: "export",

  ...(!isDockerBuild
    ? {}
    : {
        trailingSlash: true,
        skipTrailingSlashRedirect: true,
      }),

  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      require("unplugin-icons/webpack")({
        compiler: "jsx",
        jsx: "react",
      })
    );

    return config;
  },
});

import type { NextConfig } from "next";
const pages = process.env.GITHUB_PAGES === "true";
const configuredPath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? "/chetanapatel.github.io";
const normalizedPath = configuredPath.replace(/^\/+|\/+$/g, "");
const basePath = pages && normalizedPath ? `/${normalizedPath}` : "";
const config: NextConfig = {
  ...(pages
    ? {
        output: "export",
        basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_PORTFOLIO: pages ? "true" : "false",
  },
};
export default config;

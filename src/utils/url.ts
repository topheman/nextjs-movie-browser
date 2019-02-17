import { Request } from "express";
import { SingletonRouter } from "next/router";

/**
 * Will be used to get canonical urls in meta-tags
 * Will be overriden if NEXTJS_APP_CLIENT_BASE_PATH is set in env vars
 */
export const getBasePath = (
  req: Request | undefined,
  location: Location | undefined
) => {
  if (process.env.NEXTJS_APP_CLIENT_BASE_PATH) {
    return process.env.NEXTJS_APP_CLIENT_BASE_PATH;
  }
  if (req) {
    const [hostname, port] = (
      (req.headers && req.headers.host && req.headers.host) ||
      req.hostname
    ).split(":");
    // ⚠️ TODO check - protocol might be hidden from a reverse proxy or whatever ?
    return `${req.protocol}://${hostname}${
      port && port !== "80" ? `:${port}` : ""
    }`;
  }
  if (location) {
    return `${location.protocol}//${location.hostname}${
      location.port && location.port !== "80" ? `:${location.port}` : ""
    }`;
  }
};

export const getPathName = (router: SingletonRouter) => {
  const [pathname] = ((router && router.asPath) || "").split("?");
  return pathname;
};

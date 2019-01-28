import { SingletonRouter } from "next/router";
import { NextContext, NextComponentType } from "@types/next";

export interface AppNextRootPageProps {
  t: i18next.TranslationFunction;
  router: SingletonRouter;
  languageOverride: string;
}

export interface AppNextRootPageGetInitialProps {
  req?: any;
  languageOverride: string;
}

export interface CustomNextContext<Q extends DefaultQuery = DefaultQuery> {
  languageOverride: string; // SPECIFIC
  /** path section of URL */
  pathname: string;
  /** query string section of URL parsed as an object */
  query: Q;
  /** String of the actual path (including the query) shows in the browser */
  asPath: string;
  /** HTTP request object (server only) */
  req?: http.IncomingMessage;
  /** HTTP response object (server only) */
  res?: http.ServerResponse;
  /** Fetch Response object (client only) - from https://developer.mozilla.org/en-US/docs/Web/API/Response */
  jsonPageRes?: NodeResponse;
  /** Error object if any error is encountered during the rendering */
  err?: Error;
}

export interface CustomNextAppContext<Q extends DefaultQuery = DefaultQuery> {
  Component: NextComponentType<any, any, NextContext<Q>>;
  router: RouterProps<Q>;
  ctx: CustomNextContext<Q>;
}

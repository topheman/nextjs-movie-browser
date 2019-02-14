import { SingletonRouter } from "next/router";
import { NextContext, NextComponentType } from "@types/next";
import { MyMobxStore } from "../stores";
import TranslationsStore from "../stores/TranslationsStore";

export interface AppNextRootPageProps {
  t: i18next.TranslationFunction;
  router: SingletonRouter;
  translationLanguageFullCode?: string;
  defaultLanguageFullCode: string;
}

export interface AppWithIdNextRootPageProps<T> extends AppNextRootPageProps {
  data: T;
  query: { id: string };
  translationsStore: TranslationsStore;
}

export interface AppNextRootPageGetInitialProps {
  req?: any;
  translationLanguageFullCode?: string;
  defaultLanguageFullCode: string;
}

export interface AppWithIdNextRootPageGetInitialProps
  extends AppNextRootPageGetInitialProps {
  mobxStore?: MyMobxStore;
  query: { id: string };
}

export interface CustomNextContext<Q extends DefaultQuery = DefaultQuery> {
  mobxStore: MyMobxStore; // SPECIFIC
  translationLanguageFullCode?: string; // SPECIFIC
  defaultLanguageShortCode: string; // SPECIFIC
  defaultLanguageFullCode: string; // SPECIFIC
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

export class CustomNextApp<P = {}> extends React.Component<
  P & DefaultAppIProps & AppProps
> {
  mobxStore: MyMobxStore;
  static getInitialProps(context: NextAppContext): Promise<DefaultAppIProps>;
}

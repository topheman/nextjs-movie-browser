import { Component } from "react";
import { withRouter } from "next/router";
import { inject, observer } from "mobx-react";

import Layout from "../src/components/Layout";
import { withNamespaces } from "../i18n";
import { apiTmdb } from "../src/services/apis";
import {
  TmdbMovieEntity,
  AppWithIdNextRootPageProps,
  AppWithIdNextRootPageGetInitialProps
} from "../src/@types";

import MovieComponent from "../src/components/Movie";

type IComponentProps = AppWithIdNextRootPageProps<TmdbMovieEntity>;

type IComponentState = { data: TmdbMovieEntity | undefined };

type IGetInitialProps = AppWithIdNextRootPageGetInitialProps;

type ICallApi = <C extends any, T>(
  props: C,
  apiCall: ({ language, id }: { language: string; id: string }) => Promise<T>
) => Promise<T>;

const callApi: ICallApi = async (props, apiCall) => {
  console.log("callApi");
  const translationLanguageFullCode = props.translationLanguageFullCode;
  const defaultLanguageFullCode = props.defaultLanguageFullCode;
  const language = translationLanguageFullCode || defaultLanguageFullCode;
  const data = await apiCall({ language, id: props.query.id });
  return data;
};

/**
 * Lifecycle:
 *
 * Server-side:
 * - getInitialProps
 *   -> callApi
 * - constructor
 * - render
 *
 * Client-side
 * - constructor
 * - render
 * - componentDidMount
 * Change link
 * - getInitialProps
 *   -> callApi
 * - render
 * - componentDidUpdate
 */
class Movie extends Component<IComponentProps, IComponentState> {
  state: IComponentState = {
    data: undefined
  };
  static async getInitialProps(
    props: IGetInitialProps
  ): Promise<{
    data: TmdbMovieEntity;
    namespacesRequired: string[];
  }> {
    console.log("Movie.getInitialProps");
    const data = await callApi(props, ({ language, id }) =>
      apiTmdb().movie(id, { language })
    );
    // store injected from _app.tsx, used in ssr
    const translationsStore =
      props.mobxStore && props.mobxStore.translationsStore;
    if (translationsStore) {
      translationsStore.setTranslations(
        (data.translations && data.translations.translations) || []
      );
    }
    return {
      data,
      namespacesRequired: ["movie", "common"]
    };
  }
  constructor(props: IComponentProps) {
    super(props);
    console.log("Movie.constructor");
    // store data from getInitialProps into state to be able to trigger a change when detecting language change
    this.state.data = props.data;
  }
  componentDidMount() {
    console.log("Movie.componentDidMount");
    this.props.translationsStore.setTranslations(
      (this.props.data.translations &&
        this.props.data.translations.translations) ||
        []
    );
  }
  componentDidUpdate(prevProps: IComponentProps) {
    console.log("Movie.componentDidUpdate");
    // update translations client side when change from getInitialProps
    this.props.translationsStore.setTranslations(
      (this.props.data.translations &&
        this.props.data.translations.translations) ||
        []
    );
    // just after first load (from ssr), ensure state is updated if data provided by getInitialProps changes
    if (prevProps.data.id !== this.props.data.id) {
      this.setState({ data: this.props.data });
    }
    // re-call api with different language when it changes
    if (
      prevProps.translationLanguageFullCode !==
        this.props.translationLanguageFullCode ||
      prevProps.defaultLanguageFullCode !== this.props.defaultLanguageFullCode
    ) {
      callApi(
        { ...this.props, query: { id: this.props.data.id } },
        ({ language, id }) => apiTmdb().movie(id, { language })
      ).then(data => this.setState({ data }));
    }
  }
  render() {
    console.log("Movie.render");
    const data = this.props.translationsStore.retrieveDataWithFallback(
      this.state.data,
      this.props.defaultLanguageFullCode,
      this.props.translationLanguageFullCode
    );
    return (
      <Layout>
        <MovieComponent {...data} />
      </Layout>
    );
  }
}

export default withNamespaces("movie")(
  inject("translationsStore")(observer(withRouter(Movie)))
);

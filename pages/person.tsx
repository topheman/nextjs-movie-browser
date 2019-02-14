import { Component } from "react";
import { withRouter } from "next/router";
import { inject, observer } from "mobx-react";

import Layout from "../src/components/Layout";
import { withNamespaces } from "../i18n";
import { apiTmdb } from "../src/services/apis";
import {
  TmdbPersonEntity,
  AppWithIdNextRootPageProps,
  AppWithIdNextRootPageGetInitialProps
} from "../src/@types";

import PersonComponent from "../src/components/Person";

type IComponentProps = AppWithIdNextRootPageProps<TmdbPersonEntity>;

type IComponentState = { data: TmdbPersonEntity | undefined };

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
class Person extends Component<IComponentProps, IComponentState> {
  state: IComponentState = {
    data: undefined
  };
  static async getInitialProps(
    props: IGetInitialProps
  ): Promise<{
    data: TmdbPersonEntity;
    namespacesRequired: string[];
  }> {
    console.log("Person.getInitialProps");
    const data = await callApi(props, ({ language, id }) =>
      apiTmdb().person(id, { language })
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
      namespacesRequired: ["person", "common"]
    };
  }
  constructor(props: IComponentProps) {
    super(props);
    console.log("Person.constructor");
    // store data from getInitialProps into state to be able to trigger a change when detecting language change
    this.state.data = props.data;
  }
  componentDidMount() {
    console.log("Person.componentDidMount");
    this.props.translationsStore.setTranslations(
      (this.props.data.translations &&
        this.props.data.translations.translations) ||
        []
    );
  }
  componentDidUpdate(prevProps: IComponentProps) {
    console.log("Person.componentDidUpdate");
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
        ({ language, id }) => apiTmdb().person(id, { language })
      ).then(data => this.setState({ data }));
    }
  }
  render() {
    console.log("Person.render");
    const data = this.props.translationsStore.retrieveDataWithFallback(
      this.state.data,
      this.props.defaultLanguageFullCode,
      this.props.translationLanguageFullCode
    );
    return (
      <Layout>
        <PersonComponent {...data} />
      </Layout>
    );
  }
}

export default withNamespaces("movie")(
  inject("translationsStore")(observer(withRouter(Person)))
);

import { Component } from "react";
import { withRouter } from "next/router";
import { inject, observer } from "mobx-react";
import hoistNonReactStatics from "hoist-non-react-statics";

import Layout from "../components/Layout";
import { withNamespaces } from "../../i18n";
import {
  AppWithIdNextRootPageProps,
  AppWithIdNextRootPageGetInitialProps
} from "../@types";

type IPrepareCallApi = <C extends any, T>(
  props: C,
  apiCall: ({ language, id }: { language: string; id: string }) => Promise<T>
) => Promise<T>;

const prepareParamsAndCallApi: IPrepareCallApi = async (props, apiCall) => {
  const translationLanguageFullCode = props.translationLanguageFullCode;
  const defaultLanguageFullCode = props.defaultLanguageFullCode;
  const language = translationLanguageFullCode || defaultLanguageFullCode;
  console.log("callApi", language);
  const data = await apiCall({ language, id: props.query.id });
  return data;
};

/**
 * Decorator for NextJS pages that need to make an api request based on `query.id`
 *
 * Specify:
 * - apiCall: to be called to retrieve data based on id/language
 * - namespaces: will be injected in the `withNamespaces` decorator of the component
 * - namespacesRequired: will be returned by `getInitialProps` to prepare the translations needed
 */
const withCallingApi = <ApiEntity extends any>({
  apiCall,
  namespaces,
  namespacesRequired
}: {
  apiCall: ({
    language,
    id
  }: {
    language: string;
    id: string;
  }) => Promise<ApiEntity>;
  namespaces: string;
  namespacesRequired: string[];
}) => (Comp: any) => {
  type IComponentProps = AppWithIdNextRootPageProps<ApiEntity>;

  type IComponentState = { data: ApiEntity | undefined };

  type IGetInitialProps = AppWithIdNextRootPageGetInitialProps;

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
  class PageWithId extends Component<IComponentProps, IComponentState> {
    state: IComponentState = {
      data: undefined
    };
    static displayName = `withCallingApi(${Comp.displayName ||
      Comp.name ||
      "Component"})`;
    static async getInitialProps(
      props: IGetInitialProps
    ): Promise<{
      data: ApiEntity;
      namespacesRequired: string[];
    }> {
      console.log(`${PageWithId.displayName}.getInitialProps`);
      const data = await prepareParamsAndCallApi(props, ({ language, id }) =>
        apiCall({ id, language })
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
        namespacesRequired: namespacesRequired
      };
    }
    constructor(props: IComponentProps) {
      super(props);
      console.log(`${PageWithId.displayName}.constructor`);
      // store data from getInitialProps into state to be able to trigger a change when detecting language change
      this.state.data = props.data;
    }
    componentDidMount() {
      console.log(`${PageWithId.displayName}.componentDidMount`);
      this.props.translationsStore.setTranslations(
        (this.props.data.translations &&
          this.props.data.translations.translations) ||
          []
      );
    }
    componentDidUpdate(prevProps: IComponentProps) {
      console.log(`${PageWithId.displayName}.componentDidUpdate`);
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
        prepareParamsAndCallApi(
          { ...this.props, query: { id: this.props.data.id } },
          ({ language, id }) => apiCall({ id, language })
        ).then(data => this.setState({ data }));
      }
    }
    render() {
      console.log(`${PageWithId.displayName}.render`);
      const data = this.props.translationsStore.retrieveDataWithFallback(
        this.state.data,
        this.props.defaultLanguageFullCode,
        this.props.translationLanguageFullCode
      );
      return (
        <Layout>
          <Comp {...data} />
        </Layout>
      );
    }
  }

  return withNamespaces(namespaces)(
    inject("translationsStore")(
      observer(withRouter(hoistNonReactStatics(PageWithId, Comp)))
    )
  );
};

export default withCallingApi;

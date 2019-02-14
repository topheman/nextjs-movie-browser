import { Component } from "react";
import { observer, inject } from "mobx-react";

import UIStore from "../stores/UIStore";

@inject("uiStore")
@observer
export default class ShowLoadingState extends Component<{
  uiStore?: UIStore;
  children: ({
    error,
    loading
  }: {
    error: boolean;
    loading: boolean;
  }) => JSX.Element;
}> {
  render() {
    const { error, loading } = this.props.uiStore!;
    return this.props.children({ error, loading });
  }
}

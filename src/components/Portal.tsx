// inspired by https://github.com/zeit/next.js/blob/canary/examples/with-portals/components/Portal.js

import React from "react";
import ReactDOM from "react-dom";

export default class Portal extends React.Component<{ selector: string }> {
  element: Element | null = null;
  componentDidMount() {
    this.element = document.querySelector(this.props.selector);
    this.forceUpdate();
  }

  render() {
    if (this.element === null) {
      return null;
    }

    return ReactDOM.createPortal(this.props.children, this.element);
  }
}

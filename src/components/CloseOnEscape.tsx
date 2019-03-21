/**
 * Inspired by https://github.com/conorhastings/react-close-on-escape
 */

import React, { Component } from "react";

interface Props {
  onEscape: () => any;
}

export default class CloseOnEscape extends Component<Props> {
  onEscape = ({ keyCode }: React.KeyboardEvent) => {
    if (keyCode === 27) {
      this.props.onEscape();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onEscape as any);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEscape as any);
  }

  render() {
    return this.props.children;
  }
}

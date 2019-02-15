import { Component } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

/**
 * Wraps a component with a simple class component
 * Can be usefull to decorate functional components using hooks
 * connected to mobx (since hooks and react-mobx don't work well together yet - see mobx-react-lite eventually)
 */
const withBlankWrapper = (Comp: any) => {
  class Wrapper extends Component<{ innerRef: React.Ref<{}> }> {
    static displayName = `withBlankWrapper(${Comp.displayName ||
      Comp.name ||
      "Component"})`;
    render() {
      return <Comp {...this.props} />;
    }
  }
  return hoistNonReactStatics(Wrapper, Comp);
};

export default withBlankWrapper;

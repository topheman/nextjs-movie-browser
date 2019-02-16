import ShowLoadingState from "../ShowLoadingState";

import { render, cleanup } from "../../testUtils";
import UIStore from "../../stores/UIStore";

const makeLoadingStateConnectedComponent = ({
  loading
}: {
  loading: boolean;
}) => Comp => {
  const uiStore = new UIStore();
  uiStore.setLoadingState({ loading });
  const Wrapper = props => (
    <ShowLoadingState uiStore={uiStore}>
      {({ loading }) => <Comp {...props} loading={loading} />}
    </ShowLoadingState>
  );
  return {
    uiStore,
    Wrapper
  };
};

const makeTestComponent = ({ loading }: { loading: boolean }) => {
  const Test = ({ loading }: { loading: boolean }) => (
    <>{loading && <span data-testid="loading">loading</span>}</>
  );
  return makeLoadingStateConnectedComponent({ loading })(Test);
};

const renderWithLoadingState = ({ loading = false }) => {
  const { Wrapper, uiStore } = makeTestComponent({ loading });
  const result = render(<Wrapper />);
  return {
    ...result,
    uiStore
  };
};

describe("src/components/ShowLoadingState", () => {
  afterEach(cleanup);
  [{ loading: false }, { loading: true }].forEach(({ loading }) => {
    it(`should render {loading: ${loading}}`, () => {
      const { queryByTestId } = renderWithLoadingState({
        loading
      });
      expect(queryByTestId("loading"))[loading ? "toBeTruthy" : "toBeFalsy"]();
    });
  });
});

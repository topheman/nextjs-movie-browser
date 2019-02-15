import ShowLoadingState from "../ShowLoadingState";

import { render, cleanup } from "../../testUtils";
import UIStore from "../../stores/UIStore";

const makeLoadingStateConnectedComponent = ({
  loading,
  error
}: {
  loading: boolean;
  error: boolean;
}) => Comp => {
  const uiStore = new UIStore();
  uiStore.setLoadingState({ loading, error });
  const Wrapper = props => (
    <ShowLoadingState uiStore={uiStore}>
      {({ error, loading }) => (
        <Comp {...props} error={error} loading={loading} />
      )}
    </ShowLoadingState>
  );
  return {
    uiStore,
    Wrapper
  };
};

const makeTestComponent = ({
  loading,
  error
}: {
  loading: boolean;
  error: boolean;
}) => {
  const Test = ({ error, loading }) => (
    <>
      {error && <span data-testid="error">error</span>}
      {loading && <span data-testid="loading">loading</span>}
    </>
  );
  return makeLoadingStateConnectedComponent({ loading, error })(Test);
};

const renderWithLoadingState = ({ loading = false, error = false }) => {
  const { Wrapper, uiStore } = makeTestComponent({ loading, error });
  const result = render(<Wrapper />);
  return {
    ...result,
    uiStore
  };
};

describe("src/components/ShowLoadingState", () => {
  afterEach(cleanup);
  [
    { error: false, loading: false },
    { error: false, loading: true },
    { error: true, loading: false }
  ].forEach(({ error, loading }) => {
    it(`should render {error: ${error}, loading: ${loading}}`, () => {
      const { queryByTestId } = renderWithLoadingState({
        error,
        loading
      });
      expect(queryByTestId("error"))[error ? "toBeTruthy" : "toBeFalsy"]();
      expect(queryByTestId("loading"))[loading ? "toBeTruthy" : "toBeFalsy"]();
    });
  });
});

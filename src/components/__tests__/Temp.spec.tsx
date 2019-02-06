import React from "react";

// TODO store mocks in /src/services/apis/__mocks__
// /src/services/apis/__mocks__/index.ts -> export a util to:
// - mock/unmock
// - call jest.mock() / mockImplementation on specific implementation

import Temp from "../Temp";
import { render, waitForElement } from "../../testUtils";

import { apiTmdb, IApiTmdb } from "../../services/apis";
jest.mock("../../services/apis");

describe("src/component/Temp", () => {
  it("should render", async () => {
    (apiTmdb as jest.Mock<IApiTmdb>).mockImplementation(() => ({
      movie: () => Promise.resolve("Hello world!")
    }));
    const { getByText } = render(<Temp />);
    const node = await waitForElement(() => getByText("Hello world!"));
    expect(node).toBeTruthy();
  });
});

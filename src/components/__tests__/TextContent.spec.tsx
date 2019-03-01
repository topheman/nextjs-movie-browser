import TextContent from "../TextContent";

import { render } from "../../testUtils";

describe("src/components/TextContent", () => {
  it("should render ONE empty <p> from an empty string", () => {
    const { container } = render(<TextContent>{""}</TextContent>);
    expect(container.innerHTML).toMatchSnapshot();
  });
  it("should render ONE <p> from a string", () => {
    const { container } = render(<TextContent>{"Lorem ipsum"}</TextContent>);
    expect(container.innerHTML).toMatchSnapshot();
  });
  it("should render MULTIPLE <p> from a string containing carriage return", () => {
    const { container } = render(
      <TextContent>
        {"Lorem ipsum\n\ndolor sit amet\n\nconsectetur adipiscing elit"}
      </TextContent>
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
  it("should spread props on each paragraph", () => {
    const { container } = render(
      <TextContent dir="auto" style={{ fontWeight: "bold" }}>
        {"Lorem ipsum\n\ndolor sit amet\n\nconsectetur adipiscing elit"}
      </TextContent>
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
});

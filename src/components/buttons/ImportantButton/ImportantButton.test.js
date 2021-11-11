import ImportantButton from "./ImportantButton";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByTestId } = render(<ImportantButton />);
  await findByTestId("important-button");
});

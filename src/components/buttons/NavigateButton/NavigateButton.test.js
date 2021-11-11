import NavigateButton from "./NavigateButton";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByTestId } = render(<NavigateButton />);
  await findByTestId("navigate-button");
});

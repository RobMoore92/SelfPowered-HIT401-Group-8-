import HelpButton from "./HelpButton";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByTestId } = render(<HelpButton />);
  await findByTestId("help-button");
});

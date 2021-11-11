import DueIcon from "./DueIcon";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByTestId } = render(<DueIcon />);
  await findByTestId("due-icon");
});

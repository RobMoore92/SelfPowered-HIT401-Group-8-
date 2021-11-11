import CompletedCheckbox from "./CompletedCheckbox";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByTestId } = render(<CompletedCheckbox />);
  await findByTestId("completed-checkbox");
});

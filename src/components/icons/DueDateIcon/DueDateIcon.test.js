import DueDateIcon from "./DueDateIcon";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByTestId } = render(<DueDateIcon />);
  await findByTestId("due-date-icon");
});

import StartDateIcon from "./StartDateIcon";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByTestId } = render(<StartDateIcon />);
  await findByTestId("start-date-icon");
});

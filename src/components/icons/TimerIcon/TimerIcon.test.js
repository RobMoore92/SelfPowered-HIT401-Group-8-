import TimerIcon from "./TimerIcon";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByTestId } = render(<TimerIcon />);
  await findByTestId("timer-icon");
});

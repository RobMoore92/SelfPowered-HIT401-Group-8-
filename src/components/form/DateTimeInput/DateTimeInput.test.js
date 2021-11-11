const { render } = require("@testing-library/react");
import DateTimeInput from "./DateTimeInput";

test("renders without crashing", async () => {
  const { findByTestId } = render(<DateTimeInput />);
  await findByTestId("date-time-input");
});

const { render } = require("@testing-library/react");
import BackButton from "./BackButton";

test("renders without crashing", async () => {
  const { findByTestId } = render(<BackButton />);
  await findByTestId("back-button");
});

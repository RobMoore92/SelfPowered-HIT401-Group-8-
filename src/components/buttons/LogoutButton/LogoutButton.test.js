const { render } = require("@testing-library/react");
import LogoutButton from "./LogoutButton";

test("renders without crashing", async () => {
  const { findByTestId } = render(<LogoutButton />);
  await findByTestId("logout-button");
});

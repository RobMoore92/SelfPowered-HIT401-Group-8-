import EditButton from "./EditButton";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByTestId } = render(<EditButton />);
  await findByTestId("edit-button");
});

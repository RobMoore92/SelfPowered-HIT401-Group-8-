import TagsButton from "./TagsButton";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByTestId } = render(<TagsButton />);
  await findByTestId("tags-button");
});

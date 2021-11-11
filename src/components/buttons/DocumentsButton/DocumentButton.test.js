const { render } = require("@testing-library/react");
import DocumentsButton from "./DocumentsButton";

test("renders without crashing", async () => {
  const { findByTestId } = render(<DocumentsButton />);
  await findByTestId("documents-button");
});

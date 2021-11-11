const { render } = require("@testing-library/react");
import DeleteDocumentButton from "./DeleteDocumentButton";

test("renders without crashing", async () => {
  const { findByTestId } = render(<DeleteDocumentButton />);
  await findByTestId("delete-document-button");
});

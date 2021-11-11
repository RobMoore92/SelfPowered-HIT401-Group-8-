import DocumentHelp from "./DocumentHelp";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByText } = render(<DocumentHelp isPopped={true} />);
  await findByText("Document Help");
});

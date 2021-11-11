import DocumentCard from "./DocumentCard";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByTestId } = render(
    <DocumentCard name={"file"} contentType={"image"} />
  );
  await findByTestId("document-card");
});

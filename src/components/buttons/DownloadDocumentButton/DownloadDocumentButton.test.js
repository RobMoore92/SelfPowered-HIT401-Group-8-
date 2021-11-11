import DownloadDocumentButton from "./DownloadDocumentButton";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByTestId } = render(<DownloadDocumentButton />);
  await findByTestId("download-document-button");
});

import JobHelp from "./JobHelp";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByText } = render(<JobHelp isPopped={true} />);
  await findByText("Job Help");
});

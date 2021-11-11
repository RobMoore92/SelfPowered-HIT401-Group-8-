import ClientHelp from "./ClientHelp";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByText } = render(<ClientHelp isPopped={true} />);
  await findByText("Client Help");
});

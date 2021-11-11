import NoData from "./NoData";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByText } = render(<NoData message={"message"} />);
  await findByText("message");
});

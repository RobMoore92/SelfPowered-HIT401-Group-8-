import TaskHelp from "./TaskHelp";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByText } = render(<TaskHelp isPopped={true} />);
  await findByText("Task Help");
});

const { render } = require("@testing-library/react");
import AddButton from "./AddButton";

test("renders without crashing", async () => {
  const { findByTestId } = render(<AddButton setPopped={false} />);
  await findByTestId("add-button");
});

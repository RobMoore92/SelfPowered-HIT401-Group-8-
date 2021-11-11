const { render } = require("@testing-library/react");
import DeleteButton from "./DeleteButton";

test("renders without crashing", async () => {
  const mockFunction = jest.fn();
  const { findByTestId } = render(
    <DeleteButton
      text={"Delete Task"}
      toggleSettings={mockFunction}
      statement={mockFunction}
      warningMessage={"Warning"}
      present={mockFunction}
    />
  );
  await findByTestId("delete-button");
});

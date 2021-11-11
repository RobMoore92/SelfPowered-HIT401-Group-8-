const { render } = require("@testing-library/react");
import Subtitle from "./Subtitle";

test("renders without crashing", async () => {
  const { findByText } = render(
    <Subtitle
      icon={jest.fn()}
      color={"bg-red-300"}
      text={"test text"}
      textColor={"text-red-300"}
      hasHover={true}
    />
  );
  await findByText("test text");
});

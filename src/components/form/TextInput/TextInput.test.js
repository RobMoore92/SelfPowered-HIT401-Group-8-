import TextInput from "./TextInput";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByText } = render(
    <TextInput
      id={"description"}
      values={{ description: jest.fn() }}
      errors={{ description: jest.fn() }}
      label={"label"}
    />
  );
  await findByText("label");
});

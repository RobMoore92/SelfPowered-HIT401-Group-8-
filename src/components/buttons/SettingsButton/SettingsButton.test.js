import SettingsButton from "./SettingsButton";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByTestId } = render(<SettingsButton />);
  await findByTestId("settings-button");
});

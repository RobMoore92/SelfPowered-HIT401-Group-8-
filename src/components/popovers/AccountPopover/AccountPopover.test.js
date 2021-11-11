import AccountPopover from "./AccountPopover";
import { useAuthState } from "../../../__mocks__/react-firebase-hooks/auth";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  useAuthState.mockReturnValue([{ email: "test123@gmail.com" }, false]);
  const { findByTestId } = render(<AccountPopover isPopped={true} />);
  await findByTestId("account-popover");
});

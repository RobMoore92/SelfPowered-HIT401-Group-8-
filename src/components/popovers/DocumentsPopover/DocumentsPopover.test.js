import { useAuthState } from "../../../__mocks__/react-firebase-hooks/auth";
import DocumentsPopover from "./DocumentsPopover";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  useAuthState.mockReturnValue([{ email: "test123@gmail.com" }, false]);
  const { findByTestId } = render(<DocumentsPopover isPopped={true} />);
  await findByTestId("documents-popover");
});

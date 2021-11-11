import { useAuthState } from "../../../__mocks__/react-firebase-hooks/auth";
import ChangeUsernameForm from "./ChangeUsernameForm";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  useAuthState.mockReturnValue([true, false]);
  const { findByText } = render(<ChangeUsernameForm isPopped={true} />);
  await findByText("Change Username");
});

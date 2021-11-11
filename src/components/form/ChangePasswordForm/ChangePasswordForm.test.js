import { useAuthState } from "../../../__mocks__/react-firebase-hooks/auth";
import ChangePasswordForm from "./ChangePasswordForm";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  useAuthState.mockReturnValue([true, false]);
  const { findByText } = render(<ChangePasswordForm isPopped={true} />);
  await findByText("Change Password");
});

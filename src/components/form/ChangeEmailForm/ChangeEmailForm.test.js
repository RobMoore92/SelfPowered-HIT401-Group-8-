import { useAuthState } from "../../../__mocks__/react-firebase-hooks/auth";
import ChangeEmailForm from "./ChangeEmailForm";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  useAuthState.mockReturnValue([true, false]);
  const { findByText } = render(<ChangeEmailForm isPopped={true} />);
  await findByText("Change Email");
});

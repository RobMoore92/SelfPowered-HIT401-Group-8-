import AddClient from "./AddClient";
import { useAuthState } from "../../../__mocks__/react-firebase-hooks/auth";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  useAuthState.mockReturnValue([true, false]);
  const { findByText } = render(<AddClient isPopped={true} />);
  await findByText("First name");
});

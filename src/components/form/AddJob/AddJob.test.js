import { useAuthState } from "../../../__mocks__/react-firebase-hooks/auth";
import AddJob from "./AddJob";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  useAuthState.mockReturnValue([true, false]);
  const { findByText } = render(<AddJob isPopped={true} />);
  await findByText("Title");
});

import ClientSettings from "./ClientSettings";
import { useAuthState } from "../../../../__mocks__/react-firebase-hooks/auth";

const { render } = require("@testing-library/react");
test("renders without crashing", async () => {
  useAuthState.mockReturnValue([true, false]);
  const props = {
    uid: 123123,
    client: {
      client_id: 123123,
      active: true,
    },
    settings: true,
  };
  const { findByTestId } = render(<ClientSettings {...props} />);
  await findByTestId("client-settings");
});

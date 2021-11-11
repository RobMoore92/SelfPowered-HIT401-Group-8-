const { render } = require("@testing-library/react");
import ClientCard from "./ClientCard";
import { useAuthState } from "../../../__mocks__/react-firebase-hooks/auth";

test("renders without crashing", async () => {
  useAuthState.mockReturnValue([true, false]);
  const item = {
    client_id: 123,
    name: "John Smith",
    firstName: "John",
    lastName: "Smith",
    company: "BBC",
    phone: "0400123123",
    email: "john.smith@gmail.com",
    important: true,
    active: true,
  };
  const { findAllByText } = render(<ClientCard item={item} />);
  await findAllByText("John Smith");
});

const { render } = require("@testing-library/react");
import JobCard from "./JobCard";
import { useAuthState } from "../../../__mocks__/react-firebase-hooks/auth";
import router from "react-router";

test("renders without crashing", async () => {
  const mockLocation = {
    pathname: "/welcome",
    hash: "",
    search: "",
    state: "",
  };
  jest.spyOn(router, "useLocation").mockReturnValue(mockLocation);
  jest.mock("date-fns", () => ({ format: jest.fn() }));
  useAuthState.mockReturnValue([true, false]);
  const item = {
    client_name: "John Smith",
    job_id: "123",
    start: { seconds: 1000 },
    due: { seconds: 1000 },
    completed: true,
    title: "Test title",
    description: "description",
  };
  const { findAllByText } = render(<JobCard item={item} />);
  await findAllByText("Test title");
});

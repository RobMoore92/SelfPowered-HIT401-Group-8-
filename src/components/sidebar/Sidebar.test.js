import { render } from "@testing-library/react";
import Sidebar from "./Sidebar";

describe("sidebar", () => {
  test("elements render correctly with user", async () => {
    const { getByTestId, getByText } = render(
      <Sidebar user={{ email: "test@test.com" }} />
    );
    expect(getByTestId("sidebar"));
    expect(getByText("Application"));
    expect(getByText("Overview"));
    expect(getByText("Clients"));
    expect(getByText("Jobs"));
    expect(getByText("Tags"));
    expect(getByText("Account"));
    expect(getByText("About"));
    expect(getByText("Logout"));
  });
  test("elements render correctly without user", async () => {
    const { getByTestId, getByText} = render(
      <Sidebar />
    );
    expect(getByTestId("sidebar"));
    expect(getByText("Application"));
    expect(getByText("Login"));
    expect(getByText("Signup"));
  });
});

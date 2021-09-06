import { render } from "@testing-library/react";
import Login from "./Login";

describe("login", () => {
  test("elements render correctly", async () => {
    const setPopped = jest.fn();
    const { getByTestId } = render(
      <Login isPopped={true} setPopped={setPopped} />
    );
    expect(getByTestId("email-input"));
    expect(getByTestId("username-input"));
    expect(getByTestId("password-input"));
    expect(getByTestId("login-button"));
    expect(getByTestId("google-button"));
  });
});

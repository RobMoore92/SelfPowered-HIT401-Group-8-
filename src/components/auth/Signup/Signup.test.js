import { render } from "@testing-library/react";
import Signup from "./Signup";

describe("signup", () => {
  test("elements render correctly", async () => {
    const setPopped = jest.fn();
    const { getByTestId } = render(
      <Signup isPopped={true} setPopped={setPopped} />
    );
    expect(getByTestId("email-input"));
    expect(getByTestId("username-input"));
    expect(getByTestId("password-input"));
    expect(getByTestId("confirm-input"));
    expect(getByTestId("signup-button"));
  });
});

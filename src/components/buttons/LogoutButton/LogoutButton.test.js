
import {  render } from "@testing-library/react";
import LogoutButton from "./LogoutButton";

describe("logout-button", () => {
  test("elements render correctly", async () => {
    const { getByTestId } = render(
      <LogoutButton/>
    );
    expect(getByTestId("logout-button"));
  });
});

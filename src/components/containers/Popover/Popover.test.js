import { render } from "@testing-library/react";
import Popover from "./Popover";

describe("popover", () => {
  test("elements render correctly", async () => {
    const setPopped = jest.fn;
    const { getByTestId } = render(
      <Popover isPopped={true} setPopped={setPopped}>
        <p data-testid="test">test</p>
      </Popover>
    );
    expect(getByTestId("popover"));
    expect(getByTestId("test")).toHaveTextContent("test")
  });
});

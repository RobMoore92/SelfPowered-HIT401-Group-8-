import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { ionFireEvent } from "@ionic/react-test-utils";
import LogoutButton from "./LogoutButton";

describe("logout button", () => {
  test("renders without crashing", async () => {
    await waitFor(() => render(<LogoutButton />));
  });
  test("button can be clicked", async () => {
    const { getByTestId } = await waitFor(() => render(<LogoutButton />));
    const button = getByTestId("logout-button");
    ionFireEvent.click(button);
  });
});

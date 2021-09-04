import { render, waitFor } from "@testing-library/react";
import Sidebar from "./Sidebar";

describe("sidebar", () => {
  test("renders without crashing", async () => {
    await waitFor(() => render(<Sidebar />));
  });
  test("sidebar has correct content", async () => {
    const { findByText } = render(<Sidebar />);
    await findByText("Application");
    await findByText("About")
  });
});

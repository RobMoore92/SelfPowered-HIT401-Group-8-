import { render, waitFor } from "@testing-library/react";
import PageLayout from "./PageLayout";

describe("page layout", () => {
  test("renders without crashing", async () => {
    await waitFor(() => render(<PageLayout />));
  });
});

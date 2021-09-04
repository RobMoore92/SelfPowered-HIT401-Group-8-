import { render, waitFor } from "@testing-library/react";
import App from "./App";

describe("app", () => {
  test("renders without crashing", async () => {
    await waitFor(() => render(<App />));
  });
});

import { render, waitFor, cleanup } from "@testing-library/react";
import PageLayout from "./PageLayout";
import { useAuthState } from "../../__mocks__/react-firebase-hooks/auth";

describe("logout-button", () => {
  test("elements render correctly", () => {
    useAuthState.mockReturnValue([true, false]);
    render(
      <PageLayout title="title-test">
        <p data-testid="test">test</p>
      </PageLayout>
    );
  });
});

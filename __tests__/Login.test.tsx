import LoginPage from "@/app/_components/LoginPage/LoginPage";
import { IntlProviderLocal } from "@/app/_context/IntlContext";
import { render, screen } from "@testing-library/react";

describe("Login Use Cases", () => {
  test("displays login page when initiated", async () => {
    render(
      <IntlProviderLocal remoteLocale="en">
        <LoginPage />
      </IntlProviderLocal>
    );
    expect(screen.getByText("Login")).toBeDefined();
  });
});

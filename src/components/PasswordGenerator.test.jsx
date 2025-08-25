import { render, screen, fireEvent } from "@testing-library/react";
import PasswordGenerator from "./PasswordGenerator";
import { ThemeProvider } from "../contexts/ThemeContext";

test("generates password with selected criteria", () => {
  render(
    <ThemeProvider>
      <PasswordGenerator />
    </ThemeProvider>
  );
  fireEvent.change(screen.getByRole("slider"), { target: { value: "8" } });
  fireEvent.click(screen.getByLabelText("Uppercase"));
  fireEvent.click(screen.getByText("Generate"));
  const pw = screen.getByText(/^[A-Z]{8}$/); // Adjust regex as needed
  expect(pw).toBeInTheDocument();
});

test("copies to clipboard", () => {
  Object.assign(navigator, {
    clipboard: { writeText: jest.fn().mockResolvedValue() },
  });
  render(
    <ThemeProvider>
      <PasswordGenerator />
    </ThemeProvider>
  );
  fireEvent.click(screen.getByText("Generate"));
  fireEvent.click(screen.getByText(/Copy/));
  expect(navigator.clipboard.writeText).toHaveBeenCalled();
});

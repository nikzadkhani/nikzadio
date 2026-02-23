import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ThemeToggle } from "./theme-toggle";

// Mock next-themes
const mockSetTheme = vi.fn();
vi.mock("next-themes", () => ({
  useTheme: () => ({
    setTheme: mockSetTheme,
    theme: "light",
  }),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    cleanup();
    mockSetTheme.mockClear();
  });

  it("renders toggle button", () => {
    render(<ThemeToggle />);
    expect(screen.getByLabelText("Toggle Dark Mode")).toBeDefined();
  });

  it("toggles theme on click", () => {
    render(<ThemeToggle />);
    const button = screen.getByLabelText("Toggle Dark Mode");
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { InteractiveSkills } from "./interactive-skills";
import { SKILLS } from "data/portfolio";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      whileHover,
      whileTap,
      layout,
      initial,
      animate,
      exit,
      transition,
      ...props
    }: any) => <div {...props}>{children}</div>,
    button: ({
      children,
      onClick,
      whileHover,
      whileTap,
      layout,
      initial,
      animate,
      exit,
      transition,
      ...props
    }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("InteractiveSkills", () => {
  it("renders all skill categories", () => {
    render(<InteractiveSkills />);
    Object.keys(SKILLS).forEach((category) => {
      expect(screen.getByText(category)).toBeDefined();
    });
  });

  it("renders skill bubbles", () => {
    render(<InteractiveSkills />);
    const firstSkill = Object.values(SKILLS)[0][0];
    expect(screen.getByText(firstSkill)).toBeDefined();
  });

  it("shows details when a skill is clicked", () => {
    render(<InteractiveSkills />);
    const firstSkill = Object.values(SKILLS)[0][0];
    const button = screen.getByText(firstSkill);

    fireEvent.click(button);

    // Should show years of experience and potentially related roles
    expect(screen.getByText(/Years/)).toBeDefined();
    expect(screen.getAllByText(firstSkill).length).toBeGreaterThan(1); // Shows in button and title
  });

  it("toggles selection off when clicked again", () => {
    render(<InteractiveSkills />);
    const firstSkill = Object.values(SKILLS)[0][0];
    const button = screen.getByText(firstSkill);

    fireEvent.click(button);
    expect(
      screen.queryByText(/Select a technology from the above/i)
    ).toBeNull();

    fireEvent.click(button);
    expect(
      screen.getByText(/Select a technology from the above/i)
    ).toBeDefined();
  });
});

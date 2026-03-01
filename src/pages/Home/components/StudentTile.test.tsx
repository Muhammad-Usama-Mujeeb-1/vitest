import { render, screen } from "@testing-library/react";
import StudentTile, { type StudentTileProps } from "./StudentTile";
import { it, expect, describe, vi } from "vitest";

describe("StudentTile", () => {
  it("renders student information correctly", () => {
    const student: StudentTileProps = {
      id: 1,
      name: "John Doe",
      email: "john@test.com",
    };

    render(<StudentTile {...student} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("john@test.com")).toBeInTheDocument();
    expect(screen.getByText("No address provided")).toBeInTheDocument();
  });

  it("renders address when address is provided", () => {
    const student: StudentTileProps = {
      id: 2,
      name: "Jane Smith",
      email: "jane@test.com",
      address: "123 Main St",
    };

    render(<StudentTile {...student} />);

    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("jane@test.com")).toBeInTheDocument();
    expect(screen.getByText("123 Main St")).toBeInTheDocument();
  });

  it("calls onClick handler when tile is clicked", () => {
    const student: StudentTileProps = {
      id: 3,
      name: "Alice Johnson",
      email: "alice@test.com",
    };
    const onClickMock = vi.fn();

    render(<StudentTile {...student} onClick={onClickMock} />);

    screen.getByText("Alice Johnson").click();
    expect(onClickMock).toHaveBeenCalledWith(3);
  });
});

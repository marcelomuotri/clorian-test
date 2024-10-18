// CartRow.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import CartRow from "./CartRow";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";

describe("CartRow Component", () => {
  const mockItem = {
    id: 1,
    name: "Test Product",
    description: "Test Description",
    price: 10.0,
    quantity: 2,
  };

  it("should render without errors", () => {
    render(<CartRow item={mockItem} onRemoveItem={() => {}} />);
  });

  it("should display product information correctly", () => {
    render(<CartRow item={mockItem} onRemoveItem={() => {}} />);

    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(mockItem.description)).toBeInTheDocument();
    expect(
      screen.getByText(`€ ${mockItem.price.toFixed(2)}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockItem.quantity.toString())).toBeInTheDocument();
    expect(
      screen.getByText(`€ ${(mockItem.price * mockItem.quantity).toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("should call onRemoveItem with correct id when 'Remove' button is clicked", () => {
    const mockOnRemoveItem = vi.fn();

    render(<CartRow item={mockItem} onRemoveItem={mockOnRemoveItem} />);

    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);

    expect(mockOnRemoveItem).toHaveBeenCalledWith(mockItem.id);
    expect(mockOnRemoveItem).toHaveBeenCalledTimes(1);
  });
});

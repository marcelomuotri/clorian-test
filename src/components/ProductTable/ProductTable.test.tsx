// ProductTable.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ProductTable from "./ProductTable";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { Provider } from "react-redux";
import store from "../../state/store";

describe("ProductTable Component", () => {
  const mockProducts = [
    {
      id: 1,
      name: "Product 1",
      description: "Description of product 1",
      price: 10.0,
      validUntil: "2025-12-31",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description of product 2",
      price: 20.0,
      validUntil: "2024-12-31",
    },
  ];

  it("should render without errors", () => {
    render(
      <Provider store={store}>
        <ProductTable products={[]} />
      </Provider>
    );
  });

  it("should display table headers correctly", () => {
    render(
      <Provider store={store}>
        <ProductTable products={[]} />
      </Provider>
    );

    expect(screen.getByText("Product Name")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it("should render the correct number of product rows", () => {
    render(
      <Provider store={store}>
        <ProductTable products={mockProducts} />
      </Provider>
    );

    const productRows = screen.getAllByTestId("product-row");
    expect(productRows).toHaveLength(mockProducts.length);
  });

  it("should display the Snackbar when a product is added", async () => {
    render(
      <Provider store={store}>
        <ProductTable products={mockProducts} />
      </Provider>
    );

    const addToCartButtons = screen.getAllByTestId(/^add-to-cart-button-/);
    expect(addToCartButtons).toHaveLength(mockProducts.length);

    // Click the first "Add to Cart" button
    fireEvent.click(addToCartButtons[0]);

    // Wait for the Snackbar to appear
    expect(
      await screen.findByText("Product added to cart!")
    ).toBeInTheDocument();
  });
});

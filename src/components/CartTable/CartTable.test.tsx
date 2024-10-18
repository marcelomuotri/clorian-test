import { render, screen } from "@testing-library/react";
import CartTable from "./CartTable";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../state/slices/cartSlice";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

const mockCartItems = [
  {
    id: 1,
    name: "Product 1",
    description: "Description of product 1",
    price: 10.0,
    quantity: 2,
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description of product 2",
    price: 20.0,
    quantity: 1,
  },
];

let store;

beforeEach(() => {
  store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: mockCartItems,
      },
    },
  });
});

describe("CartTable Component", () => {
  it("should render without errors", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CartTable />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should display table headers correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CartTable />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Product Name")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Total Price")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("should render the correct number of cart rows", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CartTable />
        </BrowserRouter>
      </Provider>
    );

    const cartRows = screen.getAllByTestId("cart-row");
    expect(cartRows).toHaveLength(mockCartItems.length);
  });

  it("should display the correct total price", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CartTable />
        </BrowserRouter>
      </Provider>
    );

    const expectedTotalPrice = mockCartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

    expect(screen.getByText(`€ ${expectedTotalPrice}`)).toBeInTheDocument();
  });

  it("should render 'Clear Cart' and 'Continue Shopping' buttons", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CartTable />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Clear Cart")).toBeInTheDocument();
    expect(screen.getByText("Continue Shopping")).toBeInTheDocument();
  });
});

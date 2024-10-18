// Home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("./hooks/useHome", () => ({
  default: vi.fn(() => ({
    search: "",
    setSearch: vi.fn(),
    sortBy: "name",
    setSortBy: vi.fn(),
    filteredAndSortedProducts: [
      {
        id: 1,
        name: "Product 1",
        description: "description",
        price: 50.06,
        validUntil: "2024-11-15",
      },
    ],
    totalCartQuantity: 2,
  })),
}));

import useHome from "./hooks/useHome";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../state/store";

describe("Home Component", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should render TopBar and ProductTable components", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();

    const productName = screen.getByText("Product 1");
    expect(productName).toBeInTheDocument();
  });

  it("should pass the correct props to TopBar", () => {
    const mockedSetSearch = vi.fn();
    const mockedSetSortBy = vi.fn();

    const mockedUseHome = vi.mocked(useHome);

    mockedUseHome.mockReturnValue({
      search: "test search",
      setSearch: mockedSetSearch,
      sortBy: "description",
      setSortBy: mockedSetSortBy,
      filteredAndSortedProducts: [],
      totalCartQuantity: 5,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const searchInput = screen.getByDisplayValue("test search");
    expect(searchInput).toBeInTheDocument();

    const cartQuantity = screen.getByText("5");
    expect(cartQuantity).toBeInTheDocument();
  });
});

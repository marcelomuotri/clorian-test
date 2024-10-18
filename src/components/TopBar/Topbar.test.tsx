import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import TopBar from "./TopBar";

describe("TopBar Component", () => {
  const setSearch = vi.fn();
  const setSortBy = vi.fn();

  it("should render the search input, sort select, and cart button", () => {
    render(
      <BrowserRouter>
        <TopBar
          search=""
          setSearch={setSearch}
          sortBy="name"
          setSortBy={setSortBy}
          totalCartQuantity={3}
        />
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText("Search");
    expect(searchInput).toBeInTheDocument();

    const sortSelect = screen.getByRole("combobox");
    expect(sortSelect).toBeInTheDocument();

    const cartButton = screen.getByText("3");
    expect(cartButton).toBeInTheDocument();
  });

  it("should call setSearch when typing in the search input", () => {
    render(
      <BrowserRouter>
        <TopBar
          search=""
          setSearch={setSearch}
          sortBy="name"
          setSortBy={setSortBy}
          totalCartQuantity={0}
        />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(setSearch).toHaveBeenCalledWith("test");
  });

  it("should call setSortBy when selecting a different sort option", () => {
    render(
      <BrowserRouter>
        <TopBar
          search=""
          setSearch={setSearch}
          sortBy="name"
          setSortBy={setSortBy}
          totalCartQuantity={0}
        />
      </BrowserRouter>
    );

    const sortSelect = screen.getByRole("combobox");
    fireEvent.mouseDown(sortSelect);
    const descriptionOption = screen.getByRole("option", {
      name: /description/i,
    });
    fireEvent.click(descriptionOption);
    expect(setSortBy).toHaveBeenCalledWith("description");
  });
});

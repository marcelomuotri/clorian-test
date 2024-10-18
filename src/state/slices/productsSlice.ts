import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types";
import products from "../../../data.json";

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: products,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;

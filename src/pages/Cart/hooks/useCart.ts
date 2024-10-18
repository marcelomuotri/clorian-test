// useCart.ts
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../../../state/slices/cartSlice";
import { Product } from "../../../types";
import { RootState } from "../../../state/store";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const addToCart = (product: Product, quantity: number) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    const totalQuantityInCart = existingItem ? existingItem.quantity : 0;

    if (totalQuantityInCart + quantity > 10) {
      throw new Error("Cannot add more than 10 items of this product.");
    } else {
      dispatch(addItemToCart({ ...product, quantity }));
    }
  };

  const removeFromCart = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  const getTotalCartQuantity = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getTotalPrice = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return total.toFixed(2);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCartItems,
    getTotalCartQuantity,
    getTotalPrice,
  };
};

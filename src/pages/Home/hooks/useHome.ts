import { useState, useMemo } from "react";
import { useCart } from "../../Cart/hooks/useCart";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

const useProductFilterAndSort = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const { getTotalCartQuantity } = useCart();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredAndSortedProducts = useMemo(() => {
    const filteredProducts = products?.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    );

    filteredProducts.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "description") {
        return a.description.localeCompare(b.description);
      }
      return 0;
    });

    return filteredProducts;
  }, [products, search, sortBy]);

  const totalCartQuantity = getTotalCartQuantity();

  return {
    search,
    setSearch,
    sortBy,
    setSortBy,
    filteredAndSortedProducts,
    totalCartQuantity,
  };
};

export default useProductFilterAndSort;

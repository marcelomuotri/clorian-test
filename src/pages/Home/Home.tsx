import { Box } from "@mui/material";
import ProductTable from "../../components/ProductTable/ProductTable";
import TopBar from "../../components/TopBar/TopBar";
import useHome from "./hooks/useHome";

const Home = () => {
  const {
    search,
    setSearch,
    sortBy,
    setSortBy,
    filteredAndSortedProducts,
    totalCartQuantity,
  } = useHome();
  return (
    <Box>
      <TopBar
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalCartQuantity={totalCartQuantity}
      />
      <ProductTable products={filteredAndSortedProducts} />
    </Box>
  );
};

export default Home;

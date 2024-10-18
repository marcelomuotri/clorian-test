import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStyles } from "./topBar.styles";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  search: string;
  setSearch: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  totalCartQuantity: number;
}

const TopBar = ({
  search,
  setSearch,
  sortBy,
  setSortBy,
  totalCartQuantity,
}: TopBarProps) => {
  const { classes: styles } = useStyles();
  const navigate = useNavigate();
  const sortByOptions = ["name", "description"];
  const onNavigateToCart = () => {
    navigate("/cart");
  };
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onCleanSearch = () => {
    setSearch("");
  };
  const onChangeSort = (e: SelectChangeEvent<string>) => {
    setSortBy(e.target.value as string);
  };
  return (
    <Box className={styles.container}>
      <TextField
        className={styles.searchInput}
        size="small"
        placeholder="Search"
        value={search}
        onChange={onChangeSearch}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: search && (
              <IconButton onClick={onCleanSearch}>
                <ClearIcon />
              </IconButton>
            ),
          },
        }}
      />
      <Select value={sortBy} onChange={onChangeSort} size="small">
        {sortByOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </MenuItem>
        ))}
      </Select>

      <IconButton
        onClick={onNavigateToCart}
        color="primary"
        data-testid="cartButton"
      >
        <ShoppingCartIcon sx={{ fontSize: 30 }} />
        {totalCartQuantity}
      </IconButton>
    </Box>
  );
};

export default TopBar;

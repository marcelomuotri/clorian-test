// CartTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartRow from "./CartRow/CartRow";
import { useCart } from "../../pages/Cart/hooks/useCart";
import { cartTableColumns } from "../../constants/constants";

const CartTable = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCartItems, getTotalPrice } =
    useCart();

  const onContinueShopping = () => {
    navigate("/home");
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {cartTableColumns.map((column) => (
              <TableCell key={column}>
                <strong>{column}</strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item) => (
            <CartRow key={item.id} item={item} onRemoveItem={removeFromCart} />
          ))}
          <TableRow>
            <TableCell colSpan={4}>
              <strong>Total Price</strong>
            </TableCell>
            <TableCell colSpan={2}>€ {getTotalPrice()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        onClick={clearCartItems}
        style={{ margin: "20px" }}
        disabled={cartItems.length === 0}
      >
        Clear Cart
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={onContinueShopping}
        style={{ margin: "20px" }}
      >
        Continue Shopping
      </Button>
    </TableContainer>
  );
};

export default CartTable;

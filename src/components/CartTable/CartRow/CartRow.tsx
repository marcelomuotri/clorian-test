// CartRow.tsx
import { TableRow, TableCell, Button } from "@mui/material";

interface CartRowProps {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
  };
  onRemoveItem: (id: number) => void;
}

const CartRow = ({ item, onRemoveItem }: CartRowProps) => {
  return (
    <TableRow key={item.id} data-testid="cart-row">
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>€ {item.price.toFixed(2)}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>€ {(item.price * item.quantity).toFixed(2)}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onRemoveItem(item.id)}
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartRow;

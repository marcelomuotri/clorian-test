import { TableRow, TableCell, Select, MenuItem, Button } from "@mui/material";
import { useCart } from "../../../pages/Cart/hooks/useCart";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  validUntil: string;
}

interface ProductRowProps {
  product: Product;
  onProductAdded: (message: string, severity: "success" | "error") => void;
}

const ProductRow = ({ product, onProductAdded }: ProductRowProps) => {
  const { addToCart } = useCart();
  const isExpired = new Date(product.validUntil) < new Date();
  const [quantity, setQuantity] = useState(1);

  const onAddToCart = () => {
    try {
      addToCart(product, quantity);
      onProductAdded("Product added to cart!", "success");
    } catch (error) {
      onProductAdded((error as Error).message, "error");
    }
  };

  return (
    <TableRow data-testid="product-row">
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>€ {product.price.toFixed(2)}</TableCell>
      <TableCell>
        <Select
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value as string))}
          disabled={isExpired}
          id={`select-quantity-${product.id}`}
        >
          {[1, 2, 3, 4, 5].map((quantityValue) => (
            <MenuItem key={quantityValue} value={quantityValue}>
              {quantityValue}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          disabled={isExpired}
          onClick={onAddToCart}
          data-testid={`add-to-cart-button-${product.id}`}
        >
          Add to Cart
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;

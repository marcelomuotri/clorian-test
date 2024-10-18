export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  validUntil: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

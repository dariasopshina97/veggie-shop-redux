export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
};

export type CartItem = { product: Product; qty: number };

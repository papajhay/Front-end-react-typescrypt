import { Locale } from "../../snackBar";

export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
}

export interface ProductDetailProps {
    product: Product;
}

export interface EditProductProps {
    products: Product[];
}

export interface ProductListProps {
    products: { id: number; name: string; description: string; image: string; price: number }[];
}

export interface ShowProductProps {
    products?: Product[];
    product?: Product; 
}

export interface ProductContextProps {
  products: Product[];
  addProduct: (product: Product) => void;
}


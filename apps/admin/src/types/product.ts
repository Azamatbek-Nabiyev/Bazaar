export type Category = {
  _id: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  _id: string;
  title: string;
  category: Category;
  brand: string;
  image: string;
  images: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  colors: string[];
  sizes: string[];
  badge?: string;
  description: string;
  stock: number;
  isActive: boolean;
};
import type { Category } from "./category";

export type Product = {
  _id?: string,
  image: string;
  category: Category,
  brand: string;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  colors: string[];
  badge?: string;
  description: string,
  sizes: string[]
};

export type ProductGalleryProps = {
  images: string[];
  alt: string;
};
export type Category = {
  _id: string;
  name: string;
  description: string;
  productCount: number;
};

export const MOCK_CATEGORIES: Category[] = [
  { _id: "1", name: "Men's Clothing", description: "Shirts, jeans, jackets, and everyday essentials for men.", productCount: 128 },
  { _id: "2", name: "Women's Clothing", description: "Dresses, tops, outerwear, and modern styles for women.", productCount: 214 },
  { _id: "3", name: "Kids' Clothing", description: "Comfortable and durable clothing for children of all ages.", productCount: 76 },
  { _id: "4", name: "Shoes & Footwear", description: "Sneakers, boots, sandals, and formal shoes for every occasion.", productCount: 95 },
  { _id: "5", name: "Bags & Accessories", description: "Backpacks, handbags, belts, and everyday carry essentials.", productCount: 63 },
  { _id: "6", name: "Jewelry & Watches", description: "Elegant jewelry pieces and timepieces for every style.", productCount: 41 },
];
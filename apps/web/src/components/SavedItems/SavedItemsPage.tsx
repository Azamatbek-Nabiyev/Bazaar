import React, { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Trash2 } from "lucide-react";
import type { Product } from "../../types/product";

// Boshlang'ich ma'lumot — keyinchalik bu API/store'dan keladi
const initialSavedItems: Product[] = [
  {
    _id: 1,
    image: "https://makepedia.uz/wp-content/uploads/2018/06/samsa.jpg",
    category: {
      title: "test",
      description: "demomde",
    },
    brand: "Maison De",
    title: "Classic Leather Tote",
    price: 240,
    rating: 4,
    reviewCount: 342,
    colors: ["#8b8b8b", "#1a1a1a", "#6b4a3a"],
    badge: "sale",
    description:
      "A classic leather tote with a timeless design, spacious interior, and durable construction.",
    sizes: ["Small", "Medium", "Large"],
  },
  {
    _id: 2,
    image: "https://makepedia.uz/wp-content/uploads/2018/06/samsa.jpg",
    category: {
      title: "test",
      description: "demomde",
    },
    brand: "Audiom",
    title: "Pro Wireless Headphones",
    price: 249,
    rating: 4,
    reviewCount: 2341,
    colors: ["#1a1a1a", "#e5e5e5"],
    badge: "new",
    description:
      "Premium wireless headphones with immersive sound, comfortable ear cushions, and long-lasting battery life.",
    sizes: ["One Size"],
  },
];

const recommendations: Product[] = [
  {
    _id: 3,
    image: "https://makepedia.uz/wp-content/uploads/2018/06/samsa.jpg",
    category: {
      title: "test",
      description: "demomde",
    },
    brand: "Stride",
    title: "Air Runner Pro",
    price: 129,
    rating: 4,
    reviewCount: 1204,
    badge: "bestseller",
    colors: ["#8b0000", "#1a1a1a", "#e5e5e5"],
    description:
      "Lightweight performance running shoes designed for comfort, stability, and everyday training.",
    sizes: ["39", "40", "41", "42", "43", "44"],
  },
  {
    _id: 4,
    image: "https://makepedia.uz/wp-content/uploads/2018/06/samsa.jpg",
    category: {
      title: "test",
      description: "demomde",
    },
    brand: "Nord",
    title: "Minimalist Watch",
    price: 299,
    rating: 4,
    reviewCount: 89,
    badge: "new",
    colors: ["#c9c9c9", "#1a1a1a"],
    description:
      "A minimalist watch featuring a clean dial, premium materials, and a timeless design.",
    sizes: ["One Size"],
  },
  {
    _id: 5,
    image: "https://makepedia.uz/wp-content/uploads/2018/06/samsa.jpg",
    category: {
      title: "test",
      description: "demomde",
    },
    brand: "Atelier",
    title: "Oversized Wool Coat",
    price: 620,
    rating: 4,
    reviewCount: 156,
    badge: "sale",
    colors: ["#c9c9c9", "#1a1a1a", "#6b4a3a"],
    description:
      "A sophisticated oversized wool coat with a relaxed silhouette and premium finish.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    _id: 6,
    image: "https://makepedia.uz/wp-content/uploads/2018/06/samsa.jpg",
    category: {
      title: "test",
      description: "demomde",
    },
    brand: "Kroft",
    title: "Linen Tailored Blazer",
    price: 195,
    rating: 4,
    reviewCount: 67,
    badge: "new",
    colors: ["#e5e5e5", "#1a1a1a"],
    description:
      "A lightweight linen blazer with a tailored silhouette, perfect for smart casual looks.",
    sizes: ["S", "M", "L", "XL"],
  },
];
export const SavedItemsPage = () => {
  const [savedItems, setSavedItems] = useState(initialSavedItems);

  const handleRemove = (id: number | string) => {
    setSavedItems(savedItems.filter((item) => item._id !== id));
  };

  const handleClearAll = () => {
    setSavedItems([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Sarlavha */}
      <div className="flex items-center justify-between pb-6 border-b">
        <div>
          <span className="text-xs font-semibold text-red-600 uppercase">
            Your Collection
          </span>
          <h1 className="text-3xl font-serif font-bold">
            Saved Items{" "}
            <span className="text-gray-400 font-normal">
              ({savedItems.length})
            </span>
          </h1>
        </div>
        <button className="border border-black text-black text-sm px-5 py-2 rounded-full hover:bg-black hover:text-white transition">
          Continue Shopping →
        </button>
      </div>

      {/* Amallar */}
      <div className="flex items-center justify-between py-4 border-b">
        <span className="text-sm text-gray-500">
          {savedItems.length} items saved
        </span>
        <div className="flex gap-3 items-center">
          <button className="border border-black text-sm px-4 py-2 rounded-full">
            🛒 Add All to Cart
          </button>
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-500 hover:text-red-600"
          >
            🗑 Clear All
          </button>
        </div>
      </div>

      {/* Saqlangan mahsulotlar */}
      {savedItems.length > 0 ? (
        <div className="grid grid-cols-4 gap-6 py-10">
          {savedItems.map((item) => (
            <div key={item._id}>
              <ProductCard {...item} />
              <button
                onClick={() => handleRemove(item._id)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-600 pt-2"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-gray-400">
          Saqlangan mahsulotlar yo'q
        </p>
      )}

      {/* Tavsiyalar */}
      <div className="pt-10 border-t">
        <div className="flex items-center justify-between pb-4">
          <div>
            <span className="text-xs font-semibold text-red-600 uppercase">
              Recommendations
            </span>
            <h2 className="text-xl font-bold">You Might Also Like</h2>
          </div>
          <button className="text-sm text-gray-600 hover:text-black">
            See all →
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {recommendations.map((item) => (
            <ProductCard key={item._id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

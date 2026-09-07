import ProductCard from "../ProductCard/ProductCard";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Product } from "../../types/product";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectSavedItems,
  removeSavedItem,
  clearSavedItems,
} from "../../store/savedItemsSlice";
import { addItem } from "../../store/cartSlice";

export const SavedItemsPage = () => {
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();
  const savedItems = useAppSelector(selectSavedItems);

  const handleRemove = (id: Product["_id"]) => {
    dispatch(removeSavedItem(id));
  };

  const handleClearAll = () => {
    dispatch(clearSavedItems());
  };

  const handleAddAllToCart = () => {
    savedItems.forEach((item) => {
      dispatch(
        addItem({
          _id: item._id,
          title: item.title,
          brand: item.brand,
          image: item.image,
          price: item.price,
          color: item.colors?.[0] ?? "",
          quantity: 1,
        })
      );
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Sarlavha */}
      <div className="flex items-center justify-between pb-6 border-b">
        <div>
          <span className="text-xs font-semibold text-red-600 uppercase">
            {t("savedItems.collectionLabel")}
          </span>
          <h1 className="text-3xl font-serif font-bold">
            {t("savedItems.title")}{" "}
            <span className="text-gray-400 font-normal">
              ({savedItems.length})
            </span>
          </h1>
        </div>
        <button className="border border-black text-black text-sm px-5 py-2 rounded-full hover:bg-black hover:text-white transition">
          {t("savedItems.continueShopping")} →
        </button>
      </div>

      {/* Amallar */}
      <div className="flex items-center justify-between py-4 border-b">
        <span className="text-sm text-gray-500">
          {t("savedItems.itemsSavedCount", { count: savedItems.length })}
        </span>
        <div className="flex gap-3 items-center">
          <button
            onClick={handleAddAllToCart}
            disabled={savedItems.length === 0}
            className="border border-black text-sm px-4 py-2 rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
          >
            🛒 {t("savedItems.addAllToCart")}
          </button>
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-500 hover:text-red-600"
          >
            🗑 {t("savedItems.clearAll")}
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
                {t("savedItems.remove")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-gray-400">
          {t("savedItems.empty")}
        </p>
      )}
    </div>
  );
};
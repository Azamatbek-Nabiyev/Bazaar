export const formatPrice = (price: number): string => {
  return Math.round(price).toLocaleString("ru-RU").replace(/,/g, " ");
};

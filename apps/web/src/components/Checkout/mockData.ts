import type { CartItemData } from '../../types/cartItem';

export const checkoutItems: CartItemData[] = [
  {
    id: '1',
    brand: 'Stride',
    title: 'Air Runner Pro',
    color: 'Red',
    size: '42',
    price: 129,
    quantity: 1,
    image: 'https://makepedia.uz/wp-content/uploads/2018/06/samsa.jpg',
  },
  {
    id: '2',
    brand: 'Acoustic',
    title: 'Pro Wireless Headphones',
    color: 'Black',
    price: 249,
    quantity: 2,
    image: 'https://makepedia.uz/wp-content/uploads/2018/06/samsa.jpg',
  },
];

export const shippingCost = 12;
export const taxRate = 0.08;
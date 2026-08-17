export const mockUser = {
  name: 'Priya Khanna',
  firstName: 'Priya',
  lastName: 'Khanna',
  email: 'priya.khanna@example.com',
  phone: '+1 (415) 555-0192',
  dob: '1992-07-14',
  avatar: 'https://i.pinimg.com/736x/c8/7a/8e/c87a8edb409456d32da6c7e42243b3b5.jpg',
  tier: 'Gold Member',
  memberSince: 'March 2024',
  totalOrders: 12,
  totalSpent: 2840,
  savedItems: 2,
  nextTierAt: 5000,
};

export const mockOrders = [
  {
    id: 'ORD-2847',
    date: 'Aug 5, 2026',
    itemsCount: 3,
    total: 547,
    status: 'delivered',
    image: 'https://makepedia.uz/wp-content/uploads/2018/06/samsa.jpg',
  },
  {
    id: 'ORD-2631',
    date: 'Jul 18, 2026',
    itemsCount: 1,
    total: 189,
    status: 'shipped',
    image: 'https://makepedia.uz/wp-content/uploads/2018/06/samsa.jpg',
  },
  {
    id: 'ORD-2490',
    date: 'Jun 30, 2026',
    itemsCount: 2,
    total: 384,
    status: 'delivered',
    image: 'https://makepedia.uz/wp-content/uploads/2018/06/samsa.jpg',
  },
  {
    id: 'ORD-2204',
    date: 'Jun 2, 2026',
    itemsCount: 1,
    total: 299,
    status: 'delivered',
    image: 'https://makepedia.uz/wp-content/uploads/2018/06/samsa.jpg',
  },
];

export const mockAddresses = [
  {
    id: 1,
    label: 'Home',
    isDefault: true,
    name: 'Priya Khanna',
    line1: '742 Evergreen Terrace, Apt 4B',
    city: 'San Francisco, CA 94102',
    country: 'United States',
  },
  {
    id: 2,
    label: 'Office',
    isDefault: false,
    name: 'Priya Khanna',
    line1: '580 Market Street, Floor 12',
    city: 'San Francisco, CA 94104',
    country: 'United States',
  },
];

export const mockPaymentMethods = [
  {
    id: 1,
    brand: 'Visa',
    last4: '4242',
    expires: '08/28',
    isDefault: true,
  },
  {
    id: 2,
    brand: 'Mastercard',
    last4: '5555',
    expires: '12/27',
    isDefault: false,
  },
];
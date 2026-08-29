export type StoreSettings = {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  currency: string;
  address: string;
};

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: "Bazaar",
  storeEmail: "support@bazaar.com",
  storePhone: "+998 90 123 45 67",
  currency: "USD",
  address: "Tashkent, Uzbekistan",
};

export type AdminProfile = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
};

export const INITIAL_PROFILE: AdminProfile = {
  fullName: "Admin User",
  email: "admin@bazaar.com",
  phone: "+998 90 000 00 00",
  role: "Administrator",
};

export type NotificationPrefs = {
  newOrders: boolean;
  lowStock: boolean;
  customerMessages: boolean;
  weeklyReports: boolean;
};

export const INITIAL_NOTIFICATIONS: NotificationPrefs = {
  newOrders: true,
  lowStock: true,
  customerMessages: false,
  weeklyReports: true,
};
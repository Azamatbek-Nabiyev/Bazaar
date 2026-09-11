export type Review = {
  _id: string;
  product: { _id: string; title: string; image: string } | string;
  user: { _id: string; fullname: string; phone: string } | string;
  rating: number;
  comment?: string;
  createdAt: string;
};

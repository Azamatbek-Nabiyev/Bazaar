export type Review = {
  _id: string;
  product: string;
  user: { _id: string; fullname: string } | string;
  rating: number;
  comment?: string;
  createdAt: string;
};

export type ReviewsResponse = {
  status: string;
  total: number;
  page: number;
  totalPages: number;
  data: Review[];
};

export type ReviewEligibility = {
  canReview: boolean;
  alreadyReviewed: boolean;
  existingReview: Review | null;
};

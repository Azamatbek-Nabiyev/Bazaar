import { useState } from "react";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";
import {
  useGetProductReviewsQuery,
  useGetReviewEligibilityQuery,
  useSubmitReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from "../../store/api";

const StarPicker = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => onChange(n)}
        aria-label={`${n}`}
        className="p-0.5"
      >
        <Star
          size={22}
          className={n <= value ? "fill-amber-400 text-amber-400" : "text-neutral-300"}
        />
      </button>
    ))}
  </div>
);

const StarDisplay = ({ value }: { value: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={16}
        className={n <= Math.round(value) ? "fill-amber-400 text-amber-400" : "text-neutral-300"}
      />
    ))}
  </div>
);

export const ReviewSection = ({ productId }: { productId: string }) => {
  const { t } = useTranslation("product");
  const token = useAppSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(token);

  const { data: reviewsData, isLoading: reviewsLoading } = useGetProductReviewsQuery(productId);
  const { data: eligibilityData } = useGetReviewEligibilityQuery(productId, {
    skip: !isLoggedIn,
  });

  const [submitReview, { isLoading: isSubmitting }] = useSubmitReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [thanks, setThanks] = useState(false);

  const reviews = reviewsData?.data ?? [];
  const eligibility = eligibilityData?.data;

  const startEditing = () => {
    setRating(eligibility?.existingReview?.rating ?? 5);
    setComment(eligibility?.existingReview?.comment ?? "");
    setIsEditing(true);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    try {
      if (eligibility?.alreadyReviewed) {
        await updateReview({ productId, rating, comment }).unwrap();
      } else {
        await submitReview({ productId, rating, comment }).unwrap();
      }
      setIsEditing(false);
      setThanks(true);
      setTimeout(() => setThanks(false), 2000);
    } catch (err: any) {
      setFormError(err?.data?.message ?? "Xatolik yuz berdi");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(t("reviews.delete"))) return;
    try {
      await deleteReview(productId).unwrap();
    } catch {
      // review already gone or network error - silently ignore, list will refresh anyway
    }
  };

  return (
    <div className="mt-16 border-t border-neutral-200 pt-10">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t("reviews.title")}</h2>

      {/* Sharh qoldirish/tahrirlash qismi */}
      <div className="mb-8">
        {!isLoggedIn && (
          <p className="text-sm text-neutral-500">{t("reviews.loginToReview")}</p>
        )}

        {isLoggedIn && eligibility && !eligibility.canReview && !eligibility.alreadyReviewed && (
          <p className="text-sm text-neutral-500">{t("reviews.notEligible")}</p>
        )}

        {isLoggedIn && eligibility?.alreadyReviewed && !isEditing && (
          <div className="border border-neutral-200 rounded-lg p-4 max-w-md">
            <div className="flex items-center justify-between">
              <StarDisplay value={eligibility.existingReview?.rating ?? 0} />
              <div className="flex gap-3 text-xs">
                <button onClick={startEditing} className="text-neutral-600 hover:text-neutral-900">
                  {t("reviews.edit")}
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-red-600 hover:text-red-700 disabled:opacity-50"
                >
                  {t("reviews.delete")}
                </button>
              </div>
            </div>
            {eligibility.existingReview?.comment && (
              <p className="text-sm text-neutral-600 mt-2">{eligibility.existingReview.comment}</p>
            )}
          </div>
        )}

        {isLoggedIn &&
          ((eligibility?.canReview && !eligibility.alreadyReviewed) || isEditing) && (
            <form onSubmit={handleSubmit} className="max-w-md flex flex-col gap-3">
              <p className="text-sm font-semibold text-neutral-900">{t("reviews.yourRating")}</p>
              <StarPicker value={rating} onChange={setRating} />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t("reviews.commentPlaceholder")}
                rows={3}
                className="border border-neutral-300 rounded-lg px-3 py-2 text-sm"
              />
              {formError && <p className="text-sm text-red-600">{formError}</p>}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting || isUpdating}
                  className="text-white text-sm font-semibold px-5 py-2.5 rounded-lg disabled:opacity-50"
                  style={{ backgroundColor: "#d94f2b" }}
                >
                  {isSubmitting || isUpdating ? t("reviews.submitting") : t("reviews.submit")}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-sm font-medium text-neutral-600 px-5 py-2.5"
                  >
                    {t("reviews.cancel")}
                  </button>
                )}
              </div>
              {thanks && <p className="text-sm text-green-600">{t("reviews.thanks")}</p>}
            </form>
          )}
      </div>

      {/* Sharhlar ro'yxati */}
      {reviewsLoading ? (
        <p className="text-sm text-neutral-400">{t("loading")}</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-neutral-500">{t("reviews.empty")}</p>
      ) : (
        <div className="flex flex-col gap-6 max-w-2xl">
          {reviews.map((review) => (
            <div key={review._id} className="border-b border-neutral-100 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-900">
                  {typeof review.user === "object" ? review.user.fullname : ""}
                </span>
                <StarDisplay value={review.rating} />
              </div>
              {review.comment && (
                <p className="text-sm text-neutral-600 mt-1">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

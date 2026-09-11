import { useState } from "react";
import { Trash2, Star } from "lucide-react";
import { DataTable } from "../components/ui/DataTable";
import { Pagination } from "../components/ui/Pagination";
import { RowActionButton } from "../components/ui/RowActionButton";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import { useGetReviewsQuery, useDeleteReviewMutation } from "../store/api";
import type { Review } from "../types/review";
import { getImageUrl } from "../utils/getImageUrl";

const PAGE_SIZE = 10;

export default function Reviews() {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetReviewsQuery({ page, limit: PAGE_SIZE });

  const reviews = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const [deleteTarget, setDeleteTarget] = useState<Review | null>(null);
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const columns = [
    {
      header: "Product",
      accessor: (row: Review) => {
        const product = typeof row.product === "object" ? row.product : null;
        return (
          <div className="flex items-center gap-3">
            {product && (
              <img
                src={getImageUrl(product.image)}
                alt={product.title}
                className="w-9 h-9 rounded-lg object-cover object-top bg-neutral-100"
              />
            )}
            <span className="font-medium text-neutral-800">
              {product?.title ?? "-"}
            </span>
          </div>
        );
      },
    },
    {
      header: "Customer",
      accessor: (row: Review) => {
        const user = typeof row.user === "object" ? row.user : null;
        return (
          <div>
            <div className="text-neutral-800">{user?.fullname ?? "-"}</div>
            <div className="text-xs text-neutral-400">{user?.phone ?? ""}</div>
          </div>
        );
      },
    },
    {
      header: "Rating",
      accessor: (row: Review) => (
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              size={14}
              className={n <= row.rating ? "fill-amber-400 text-amber-400" : "text-neutral-300"}
            />
          ))}
        </div>
      ),
    },
    {
      header: "Comment",
      accessor: (row: Review) => (
        <span className="text-neutral-500 line-clamp-2 max-w-xs">{row.comment}</span>
      ),
    },
    {
      header: "Date",
      accessor: (row: Review) => (
        <span className="text-neutral-500 text-xs">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteError(null);
    try {
      await deleteReview(deleteTarget._id).unwrap();
      setDeleteTarget(null);
    } catch (err: any) {
      setDeleteError(err?.data?.message ?? "Failed to delete review");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-neutral-500">
        Loading reviews...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        Failed to load reviews. {(error as any)?.status ?? ""}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Reviews</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Moderate customer product reviews.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={reviews}
        getRowId={(row) => row._id}
        emptyMessage="No reviews yet."
        actions={(row) => (
          <RowActionButton
            icon={Trash2}
            onClick={() => setDeleteTarget(row)}
            variant="danger"
            title="Delete"
          />
        )}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {/* Delete confirm */}
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Review"
        message="Are you sure you want to delete this review? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => {
          setDeleteTarget(null);
          setDeleteError(null);
        }}
        isLoading={isDeleting}
        error={deleteError}
      />
    </div>
  );
}

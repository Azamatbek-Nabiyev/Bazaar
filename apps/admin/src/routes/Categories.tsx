import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { DataTable } from "../components/ui/DataTable";
import { Pagination } from "../components/ui/Pagination";
import { RowActionButton } from "../components/ui/RowActionButton";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import { Modal } from "../components/ui/Modal";
import { CategoryForm, type CategoryFormData } from "../components/categories/CategoryForm";
import { useGetCategoriesQuery, useDeleteCategoryMutation } from "../store/api";
import type { Category } from "../types/product";

const PAGE_SIZE = 10;

export default function Categories() {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetCategoriesQuery({ page, limit: PAGE_SIZE });

  const categories = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const columns = [
    {
      header: "Category",
      accessor: (row: Category) => (
        <span className="font-medium text-neutral-800">{row.title}</span>
      ),
    },
    {
      header: "Description",
      accessor: (row: Category) => (
        <span className="text-neutral-500 line-clamp-1 max-w-xs">{row.description}</span>
      ),
    },
    {
      header: "Status",
      accessor: (row: Category) => (
        <span
          className={
            row.isActive
              ? "text-green-600 font-medium"
              : "text-neutral-400 font-medium"
          }
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const handleAdd = (data: CategoryFormData) => {
    // TODO: useCreateCategoryMutation() bilan almashtiriladi
    console.log("Add category:", data);
    setIsAddOpen(false);
  };

  const handleEdit = (data: CategoryFormData) => {
    if (!editTarget) return;
    // TODO: useUpdateCategoryMutation() bilan almashtiriladi
    console.log("Edit category:", editTarget._id, data);
    setEditTarget(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteError(null);
    try {
      await deleteCategory(deleteTarget._id).unwrap();
      setDeleteTarget(null);
    } catch (err: any) {
      setDeleteError(err?.data?.message ?? "Failed to delete category");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-neutral-500">
        Loading categories...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        Failed to load categories. {(error as any)?.status ?? ""}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Categories</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage your product categories.
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      <DataTable
        columns={columns}
        data={categories}
        getRowId={(row) => row._id}
        emptyMessage="No categories yet. Add your first one."
        actions={(row) => (
          <>
            <RowActionButton icon={Pencil} onClick={() => setEditTarget(row)} title="Edit" />
            <RowActionButton
              icon={Trash2}
              onClick={() => setDeleteTarget(row)}
              variant="danger"
              title="Delete"
            />
          </>
        )}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {/* Add modal */}
      <Modal open={isAddOpen} title="Add Category" onClose={() => setIsAddOpen(false)}>
        <CategoryForm onSubmit={handleAdd} submitLabel="Add Category" />
      </Modal>

      {/* Edit modal */}
      <Modal open={!!editTarget} title="Edit Category" onClose={() => setEditTarget(null)}>
        {editTarget && (
          <CategoryForm
            onSubmit={handleEdit}
            defaultValues={{
              title: editTarget.title,
              description: editTarget.description,
              isActive: editTarget.isActive,
            }}
            submitLabel="Save Changes"
          />
        )}
      </Modal>

      {/* Delete confirm */}
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Category"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? Products in this category will not be deleted, but will become uncategorized.`}
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
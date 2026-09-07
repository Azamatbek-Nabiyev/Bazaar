import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { DataTable } from "../components/ui/DataTable";
import { Pagination } from "../components/ui/Pagination";
import { RowActionButton } from "../components/ui/RowActionButton";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import { Modal } from "../components/ui/Modal";
import { ProductForm, type ProductFormData } from "../components/products/ProductForm";
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from "../store/api";
import type { Product } from "../types/product";
import { getImageUrl } from "../utils/getImageUrl";
import { formatPrice } from "../utils/formatPrice";

const PAGE_SIZE = 10;

export default function Products() {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery({ page, limit: PAGE_SIZE });

  const products = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [addError, setAddError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const columns = [
    {
      header: "Product",
      accessor: (row: Product) => (
        <div className="flex items-center gap-3">
          <img
            src={getImageUrl(row.image)}
            alt={row.title}
            className="w-9 h-9 rounded-lg object-cover object-top bg-neutral-100"
          />
          <span className="font-medium text-neutral-800">{row.title}</span>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: (row: Product) => row.category?.title ?? "-",
    },
    {
      header: "Brand",
      accessor: (row: Product) => row.brand ?? "-",
    },
    {
      header: "Price",
      accessor: (row: Product) => `${formatPrice(row.price)} so'm`,
    },
    {
      header: "Stock",
      accessor: (row: Product) => (
        <span className={row.stock < 20 ? "text-red-600 font-medium" : ""}>
          {row.stock}
        </span>
      ),
    },
  ];

  const buildFormData = (data: ProductFormData, newImages: File[]) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("brand", data.brand ?? "");
    formData.append("price", String(data.price));
    if (data.oldPrice !== undefined && data.oldPrice !== null) {
      formData.append("oldPrice", String(data.oldPrice));
    }
    formData.append("stock", String(data.stock));
    formData.append("description", data.description);
    if (data.badge) {
      formData.append("badge", data.badge);
    }

    const colors =
      data.colors?.split(",").map((c) => c.trim()).filter(Boolean) ?? [];
    const sizes =
      data.sizes?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];

    colors.forEach((c) => formData.append("colors", c));
    sizes.forEach((s) => formData.append("sizes", s));

    newImages.forEach((file) => formData.append("images", file));

    return formData;
  };

  const handleAdd = async (
    data: ProductFormData,
    newImages: File[],
    existingImages: string[]
  ) => {
    setAddError(null);
    try {
      const formData = buildFormData(data, newImages);
      await createProduct(formData).unwrap();
      setIsAddOpen(false);
    } catch (err: any) {
      setAddError(err?.data?.message ?? "Failed to create product");
    }
  };

  const handleEdit = (
    data: ProductFormData,
    newImages: File[],
    existingImages: string[]
  ) => {
    if (!editTarget) return;
    // TODO: useUpdateProductMutation() bilan almashtiriladi
    console.log("Edit product:", editTarget._id, data, newImages, existingImages);
    setEditTarget(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteError(null);
    try {
      await deleteProduct(deleteTarget._id).unwrap();
      setDeleteTarget(null);
    } catch (err: any) {
      setDeleteError(err?.data?.message ?? "Failed to delete product");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-neutral-500">
        Loading products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        Failed to load products. {(error as any)?.status ?? ""}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Products</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage your product catalog.
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <DataTable
        columns={columns}
        data={products}
        getRowId={(row) => row._id}
        emptyMessage="No products yet. Add your first one."
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
      <Modal open={isAddOpen} title="Add Product" onClose={() => setIsAddOpen(false)}>
        <>
          {addError && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {addError}
            </div>
          )}
          <ProductForm
            onSubmit={handleAdd}
            submitLabel={isCreating ? "Adding..." : "Add Product"}
          />
        </>
      </Modal>

      {/* Edit modal */}
      <Modal open={!!editTarget} title="Edit Product" onClose={() => setEditTarget(null)}>
        {editTarget && (
          <ProductForm
            onSubmit={handleEdit}
            defaultValues={{
              title: editTarget.title,
              category: editTarget.category?._id,
              brand: editTarget.brand,
              price: editTarget.price,
              oldPrice: editTarget.oldPrice,
              stock: editTarget.stock,
              description: editTarget.description,
              colors: editTarget.colors?.join(", "),
              sizes: editTarget.sizes?.join(", "),
              badge: editTarget.badge,
            }}
            defaultImages={editTarget.images}
            submitLabel="Save Changes"
          />
        )}
      </Modal>

      {/* Delete confirm */}
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
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
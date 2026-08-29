import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { DataTable } from "../components/ui/DataTable";
import { RowActionButton } from "../components/ui/RowActionButton";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import { Modal } from "../components/ui/Modal";
import { ProductForm, type ProductFormData } from "../components/products/ProductForm";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
};

const MOCK_PRODUCTS: Product[] = [
  {
    _id: "1",
    name: "Classic Denim Jacket",
    category: "mens-clothing",
    price: 89.99,
    stock: 42,
    image: "/images/p1.jpg",
    description: "A timeless denim jacket for everyday wear.",
  },
  {
    _id: "2",
    name: "Leather Crossbody Bag",
    category: "bags-accessories",
    price: 59.99,
    stock: 18,
    image: "/images/p2.jpg",
    description: "Compact and stylish crossbody bag.",
  },
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const columns = [
    {
      header: "Product",
      accessor: (row: Product) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={row.name}
            className="w-9 h-9 rounded-lg object-cover object-top bg-neutral-100"
          />
          <span className="font-medium text-neutral-800">{row.name}</span>
        </div>
      ),
    },
    { header: "Category", accessor: "category" as const },
    {
      header: "Price",
      accessor: (row: Product) => `$${row.price.toFixed(2)}`,
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

  const handleAdd = (data: ProductFormData, images: File[]) => {
    // TODO: useCreateProductMutation() bilan almashtiriladi (rasmlarni FormData orqali yuborish kerak bo'ladi)
    const newProduct: Product = {
      _id: crypto.randomUUID(),
      ...data,
      image: images[0] ? URL.createObjectURL(images[0]) : "/images/placeholder.jpg",
    };
    setProducts((prev) => [...prev, newProduct]);
    setIsAddOpen(false);
  };

  const handleEdit = (data: ProductFormData) => {
    if (!editTarget) return;
    // TODO: useUpdateProductMutation() bilan almashtiriladi
    setProducts((prev) =>
      prev.map((p) => (p._id === editTarget._id ? { ...p, ...data } : p))
    );
    setEditTarget(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    // TODO: useDeleteProductMutation() bilan almashtiriladi
    setProducts((prev) => prev.filter((p) => p._id !== deleteTarget._id));
    setIsDeleting(false);
    setDeleteTarget(null);
  };

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

      {/* Add modal */}
      <Modal open={isAddOpen} title="Add Product" onClose={() => setIsAddOpen(false)}>
        <ProductForm onSubmit={handleAdd} submitLabel="Add Product" />
      </Modal>

      {/* Edit modal */}
      <Modal open={!!editTarget} title="Edit Product" onClose={() => setEditTarget(null)}>
        {editTarget && (
          <ProductForm
            onSubmit={handleEdit}
            defaultValues={{
              name: editTarget.name,
              category: editTarget.category,
              price: editTarget.price,
              stock: editTarget.stock,
              description: editTarget.description,
            }}
            submitLabel="Save Changes"
          />
        )}
      </Modal>

      {/* Delete confirm */}
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "../ui/FormField";
import { SelectField } from "../ui/SelectField";
import { TextareaField } from "../ui/TextareaField";
import { ImageUploadField } from "../ui/ImageUploadFeild";
import { useGetCategoriesQuery } from "../../store/api";

const productSchema = z.object({
  title: z.string().min(1, "Product name is required"),
  brand: z.string().optional(),
  price: z.coerce.number().positive("Price must be greater than 0"),
  oldPrice: z.coerce.number().optional(),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  colors: z.string().optional(),
  sizes: z.string().optional(),
  badge: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;

const BADGE_OPTIONS = [
  { value: "", label: "No badge" },
  { value: "new", label: "New" },
  { value: "bestseller", label: "Bestseller" },
  { value: "sale", label: "Sale" },
];

type ProductFormProps = {
  onSubmit: (data: ProductFormData, newImages: File[], existingImages: string[]) => void;
  defaultValues?: Partial<ProductFormData>;
  defaultImages?: string[];
  submitLabel?: string;
};

export const ProductForm = ({
  onSubmit,
  defaultValues,
  defaultImages = [],
  submitLabel = "Save Product",
}: ProductFormProps) => {
  // Mavjud (backend'dan kelgan) rasm URL'lari
  const [existingImages, setExistingImages] = useState<string[]>(defaultImages);
  // Yangi tanlangan fayllar va ularning preview URL'lari
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const { data: categoriesData } = useGetCategoriesQuery({ limit: 100 });
  const categories = categoriesData?.data ?? [];

  const CATEGORY_OPTIONS = categories.map((c) => ({
    value: c._id,
    label: c.title,
  }));

  // Ko'rsatish uchun: eski + yangi rasmlar birlashtiriladi
  const allPreviews = [...existingImages, ...newPreviews];

  const handleAddImages = (files: FileList) => {
    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);
    setNewPreviews((prev) => [...prev, ...newFiles.map((f) => URL.createObjectURL(f))]);
    setImageError(undefined);
  };

  const handleRemoveImage = (index: number) => {
    if (index < existingImages.length) {
      // Eski (mavjud) rasmni o'chirish
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Yangi qo'shilgan rasmni o'chirish
      const newIndex = index - existingImages.length;
      setImageFiles((prev) => prev.filter((_, i) => i !== newIndex));
      setNewPreviews((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  const submit = (data: ProductFormData) => {
    if (imageFiles.length === 0 && existingImages.length === 0) {
      setImageError("At least one image is required");
      return;
    }
    onSubmit(data, imageFiles, existingImages);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="bg-white border border-neutral-200 rounded-xl p-6 flex flex-col gap-4"
    >
      <FormField
        label="Product Title"
        registration={register("title")}
        error={errors.title?.message}
        full
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Brand"
          registration={register("brand")}
          error={errors.brand?.message}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <SelectField
              label="Category"
              options={CATEGORY_OPTIONS}
              value={field.value ?? ""}
              onChange={field.onChange}
              error={errors.category?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <FormField
          label="Price"
          type="number"
          registration={register("price")}
          error={errors.price?.message}
        />
        <FormField
          label="Old Price"
          type="number"
          registration={register("oldPrice")}
          error={errors.oldPrice?.message}
        />
        <FormField
          label="Stock"
          type="number"
          registration={register("stock")}
          error={errors.stock?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Colors (comma separated)"
          placeholder="blue, brown, haki"
          registration={register("colors")}
          error={errors.colors?.message}
        />
        <FormField
          label="Sizes (comma separated)"
          placeholder="M, L, XL, XXL"
          registration={register("sizes")}
          error={errors.sizes?.message}
        />
      </div>

      <Controller
        name="badge"
        control={control}
        render={({ field }) => (
          <SelectField
            label="Badge"
            options={BADGE_OPTIONS}
            value={field.value ?? ""}
            onChange={field.onChange}
            error={errors.badge?.message}
          />
        )}
      />

      <TextareaField
        label="Description"
        registration={register("description")}
        error={errors.description?.message}
        full
      />

      <ImageUploadField
        label="Product Images"
        images={allPreviews}
        onAdd={handleAddImages}
        onRemove={handleRemoveImage}
        error={imageError}
        full
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="self-start bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};
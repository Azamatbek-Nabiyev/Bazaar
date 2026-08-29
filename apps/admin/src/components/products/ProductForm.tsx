import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "../ui/FormField";
import { SelectField } from "../ui/SelectField";
import { TextareaField } from "../ui/TextareaField";
import { ImageUploadField } from "../ui/ImageUploadFeild";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;

const CATEGORY_OPTIONS = [
  { value: "mens-clothing", label: "Men's Clothing" },
  { value: "womens-clothing", label: "Women's Clothing" },
  { value: "kids-clothing", label: "Kids' Clothing" },
  { value: "shoes", label: "Shoes & Footwear" },
  { value: "bags-accessories", label: "Bags & Accessories" },
];

export const ProductForm = ({
  onSubmit,
  defaultValues,
  submitLabel = "Save Product",
}: {
  onSubmit: (data: ProductFormData, images: File[]) => void;
  defaultValues?: Partial<ProductFormData>;
  submitLabel?: string;
}) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
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

  const handleAddImages = (files: FileList) => {
    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [...prev, ...newFiles.map((f) => URL.createObjectURL(f))]);
    setImageError(undefined);
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = (data: ProductFormData) => {
    if (imageFiles.length === 0 && imagePreviews.length === 0) {
      setImageError("At least one image is required");
      return;
    }
    onSubmit(data, imageFiles);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="bg-white border border-neutral-200 rounded-xl p-6 flex flex-col gap-4"
    >
      <FormField label="Product Name" registration={register("name")} error={errors.name?.message} full />

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Price" type="number" registration={register("price")} error={errors.price?.message} />
        <FormField label="Stock" type="number" registration={register("stock")} error={errors.stock?.message} />
      </div>

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

      <TextareaField
        label="Description"
        registration={register("description")}
        error={errors.description?.message}
        full
      />

      <ImageUploadField
        label="Product Images"
        images={imagePreviews}
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
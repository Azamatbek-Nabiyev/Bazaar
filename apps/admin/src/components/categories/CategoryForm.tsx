import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "../ui/FormField";
import { TextareaField } from "../ui/TextareaField";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Description is required"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export const CategoryForm = ({
  onSubmit,
  defaultValues,
  submitLabel = "Save Category",
}: {
  onSubmit: (data: CategoryFormData) => void;
  defaultValues?: Partial<CategoryFormData>;
  submitLabel?: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-neutral-200 rounded-xl p-6 flex flex-col gap-4"
    >
      <FormField label="Category Name" registration={register("name")} error={errors.name?.message} full />

      <TextareaField
        label="Description"
        registration={register("description")}
        error={errors.description?.message}
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
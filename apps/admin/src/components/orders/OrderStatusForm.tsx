import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SelectField } from "../ui/SelectField";

const orderStatusSchema = z.object({
  status: z.enum(["pending", "preparing", "delivered", "cancelled"]),
});

export type OrderStatusFormData = z.infer<typeof orderStatusSchema>;

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "preparing", label: "Preparing" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export const OrderStatusForm = ({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: OrderStatusFormData) => void;
  defaultValues?: Partial<OrderStatusFormData>;
}) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<OrderStatusFormData>({
    resolver: zodResolver(orderStatusSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <SelectField
            label="Status"
            options={STATUS_OPTIONS}
            value={field.value ?? ""}
            onChange={field.onChange}
          />
        )}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="self-start bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Updating..." : "Update Status"}
      </button>
    </form>
  );
};
import type { UseFormRegisterReturn } from "react-hook-form";

type FormFieldProps = {
  label: string;
  type?: string;
  registration: UseFormRegisterReturn;
  error?: string;
  full?: boolean;
  placeholder?: string;
};

export const FormField = ({
  label,
  type = "text",
  registration,
  error,
  full,
  placeholder,
}: FormFieldProps) => (
  <div className={full ? "col-span-2" : ""}>
    <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      {...registration}
      className={`w-full bg-neutral-50 border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors ${
        error
          ? "border-red-400 focus:border-red-500"
          : "border-neutral-200 focus:border-neutral-400"
      }`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);
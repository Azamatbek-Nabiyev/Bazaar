import type { UseFormRegisterReturn } from "react-hook-form";

type TextareaFieldProps = {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  full?: boolean;
  rows?: number;
  placeholder?: string;
};

export const TextareaField = ({
  label,
  registration,
  error,
  full,
  rows = 4,
  placeholder,
}: TextareaFieldProps) => (
  <div className={full ? "col-span-2" : ""}>
    <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
      {label}
    </label>
    <textarea
      rows={rows}
      placeholder={placeholder}
      {...registration}
      className={`w-full bg-neutral-50 border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors resize-none ${
        error
          ? "border-red-400 focus:border-red-500"
          : "border-neutral-200 focus:border-neutral-400"
      }`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);
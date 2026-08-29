type Option = { value: string; label: string };

type SelectFieldProps = {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  full?: boolean;
  placeholder?: string;
};

export const SelectField = ({
  label,
  options,
  value,
  onChange,
  error,
  full,
  placeholder = "Select...",
}: SelectFieldProps) => (
  <div className={full ? "col-span-2" : ""}>
    <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full bg-neutral-50 border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors ${
        error
          ? "border-red-400 focus:border-red-500"
          : "border-neutral-200 focus:border-neutral-400"
      }`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);
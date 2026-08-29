type SettingsFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  full?: boolean;
};

export const SettingsField = ({
  label,
  value,
  onChange,
  type = "text",
  full,
}: SettingsFieldProps) => (
  <div className={full ? "col-span-2" : ""}>
    <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-neutral-400"
    />
  </div>
);
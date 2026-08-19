export default function AuthField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-neutral-400 mb-1">
        {label}
      </div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full border border-neutral-300 px-3 py-2.5 text-sm focus:outline-none focus:border-neutral-900 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed"
      />
    </div>
  );
}
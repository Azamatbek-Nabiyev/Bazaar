export default function AuthField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
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
        className="w-full border border-neutral-300 px-3 py-2.5 text-sm focus:outline-none focus:border-neutral-900"
      />
    </div>
  );
}
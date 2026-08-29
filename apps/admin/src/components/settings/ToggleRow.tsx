type ToggleRowProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const ToggleRow = ({ label, description, checked, onChange }: ToggleRowProps) => (
  <div className="flex items-center justify-between py-4 border-b border-neutral-100 last:border-0">
    <div>
      <p className="text-sm font-medium text-neutral-800">{label}</p>
      <p className="text-xs text-neutral-400 mt-0.5">{description}</p>
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
        checked ? "bg-orange-600" : "bg-neutral-200"
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  </div>
);
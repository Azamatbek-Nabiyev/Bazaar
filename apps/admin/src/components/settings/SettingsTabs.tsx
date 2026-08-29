type Tab = "general" | "profile" | "notifications" | "security";

const TABS: { key: Tab; label: string }[] = [
  { key: "general", label: "General" },
  { key: "profile", label: "Profile" },
  { key: "notifications", label: "Notifications" },
  { key: "security", label: "Security" },
];

export const SettingsTabs = ({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (tab: Tab) => void;
}) => (
  <div className="flex gap-1 border-b border-neutral-200 mb-6">
    {TABS.map((tab) => (
      <button
        key={tab.key}
        onClick={() => onChange(tab.key)}
        className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
          active === tab.key
            ? "border-orange-600 text-orange-600"
            : "border-transparent text-neutral-500 hover:text-neutral-800"
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export type { Tab };
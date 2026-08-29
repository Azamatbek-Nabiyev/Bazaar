import { useState } from "react";
import { ToggleRow } from "./ToggleRow";
import { INITIAL_NOTIFICATIONS } from "./mockData";

const ROWS: { key: keyof typeof INITIAL_NOTIFICATIONS; label: string; description: string }[] = [
  {
    key: "newOrders",
    label: "New Orders",
    description: "Get notified when a customer places a new order.",
  },
  {
    key: "lowStock",
    label: "Low Stock Alerts",
    description: "Get notified when a product is running low in stock.",
  },
  {
    key: "customerMessages",
    label: "Customer Messages",
    description: "Get notified when a customer sends a support message.",
  },
  {
    key: "weeklyReports",
    label: "Weekly Reports",
    description: "Receive a weekly summary of store performance.",
  },
];

export const NotificationSettings = () => {
  const [prefs, setPrefs] = useState(INITIAL_NOTIFICATIONS);

  const handleToggle = (key: keyof typeof prefs, value: boolean) => {
    setPrefs({ ...prefs, [key]: value });
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6">
      <h2 className="font-bold text-neutral-900 mb-2">Notification Preferences</h2>
      <div className="flex flex-col">
        {ROWS.map((row) => (
          <ToggleRow
            key={row.key}
            label={row.label}
            description={row.description}
            checked={prefs[row.key]}
            onChange={(v) => handleToggle(row.key, v)}
          />
        ))}
      </div>
    </div>
  );
};
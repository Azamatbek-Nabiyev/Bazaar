import { useState } from "react";
import { SettingsField } from "./SettingsField";
import { INITIAL_STORE_SETTINGS } from "./mockData";

export const GeneralSettings = () => {
  const [settings, setSettings] = useState(INITIAL_STORE_SETTINGS);

  const handleChange = (field: keyof typeof settings, value: string) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    // TODO: real API bilan ulanganda shu yerga mutation chaqiriladi
    alert("Store settings saved (mock)");
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6">
      <h2 className="font-bold text-neutral-900 mb-5">Store Information</h2>

      <div className="grid grid-cols-2 gap-4">
        <SettingsField
          label="Store Name"
          value={settings.storeName}
          onChange={(v) => handleChange("storeName", v)}
        />
        <SettingsField
          label="Currency"
          value={settings.currency}
          onChange={(v) => handleChange("currency", v)}
        />
        <SettingsField
          label="Store Email"
          value={settings.storeEmail}
          onChange={(v) => handleChange("storeEmail", v)}
          type="email"
        />
        <SettingsField
          label="Store Phone"
          value={settings.storePhone}
          onChange={(v) => handleChange("storePhone", v)}
        />
        <SettingsField
          label="Address"
          value={settings.address}
          onChange={(v) => handleChange("address", v)}
          full
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-6 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
      >
        Save Changes
      </button>
    </div>
  );
};
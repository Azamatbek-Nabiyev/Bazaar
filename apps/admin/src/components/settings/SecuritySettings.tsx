import { useState } from "react";
import { SettingsField } from "./SettingsField";

export const SecuritySettings = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // TODO: real API bilan ulanadi
    alert("Password updated (mock)");
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6">
      <h2 className="font-bold text-neutral-900 mb-5">Change Password</h2>

      <div className="grid grid-cols-2 gap-4">
        <SettingsField
          label="Current Password"
          value={form.currentPassword}
          onChange={(v) => handleChange("currentPassword", v)}
          type="password"
          full
        />
        <SettingsField
          label="New Password"
          value={form.newPassword}
          onChange={(v) => handleChange("newPassword", v)}
          type="password"
        />
        <SettingsField
          label="Confirm New Password"
          value={form.confirmPassword}
          onChange={(v) => handleChange("confirmPassword", v)}
          type="password"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
      >
        Update Password
      </button>
    </div>
  );
};
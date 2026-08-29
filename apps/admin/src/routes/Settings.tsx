import { useState } from "react";
import { SettingsTabs, type Tab } from "../components/settings/SettingsTabs";
import { GeneralSettings } from "../components/settings/GeneralSettings";
import { ProfileSettings } from "../components/settings/ProfileSettings";
import { NotificationSettings } from "../components/settings/NotificationSettings";
import { SecuritySettings } from "../components/settings/SecuritySettings";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("general");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Manage your store, profile, and account preferences.
        </p>
      </div>

      <SettingsTabs active={activeTab} onChange={setActiveTab} />

      {activeTab === "general" && <GeneralSettings />}
      {activeTab === "profile" && <ProfileSettings />}
      {activeTab === "notifications" && <NotificationSettings />}
      {activeTab === "security" && <SecuritySettings />}
    </div>
  );
}
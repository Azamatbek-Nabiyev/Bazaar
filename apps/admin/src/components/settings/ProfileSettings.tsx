import { useState } from "react";
import { SettingsField } from "./SettingsField";
import { INITIAL_PROFILE } from "./mockData";

export const ProfileSettings = () => {
  const [profile, setProfile] = useState(INITIAL_PROFILE);

  const handleChange = (field: keyof typeof profile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    // TODO: useUpdateMeMutation() bilan ulanadi
    alert("Profile saved (mock)");
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center text-xl font-semibold text-neutral-600">
          {profile.fullName[0]?.toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-neutral-900">{profile.fullName}</p>
          <p className="text-sm text-neutral-400">{profile.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SettingsField
          label="Full Name"
          value={profile.fullName}
          onChange={(v) => handleChange("fullName", v)}
          full
        />
        <SettingsField
          label="Email"
          value={profile.email}
          onChange={(v) => handleChange("email", v)}
          type="email"
        />
        <SettingsField
          label="Phone"
          value={profile.phone}
          onChange={(v) => handleChange("phone", v)}
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
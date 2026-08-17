import React, { useState } from "react";

export const Security = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const handleChange = (field: string, value: string) => {
    setPasswords({ ...passwords, [field]: value });
  };

  const handleUpdatePassword = () => {
    alert("Parol yangilandi (test)");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="border rounded-lg p-6">
        <h2 className="font-bold mb-5">Change Password</h2>
        <div className="flex flex-col gap-4 max-w-md">
          <PasswordField
            label="Current Password"
            value={passwords.current}
            onChange={(v) => handleChange("current", v)}
          />
          <div>
            <PasswordField
              label="New Password"
              placeholder="Min. 8 characters"
              value={passwords.next}
              onChange={(v) => handleChange("next", v)}
            />
            <div className="text-xs text-gray-400 mt-1">
              Use letters, numbers, and symbols
            </div>
          </div>
          <PasswordField
            label="Confirm New Password"
            placeholder="Repeat new password"
            value={passwords.confirm}
            onChange={(v) => handleChange("confirm", v)}
          />
          <button
            onClick={handleUpdatePassword}
            className="bg-black text-white text-sm px-6 py-3 rounded-lg w-fit mt-2"
          >
            Update Password
          </button>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="font-bold mb-4">Two-Factor Authentication</h2>
        <div className="border rounded-lg p-4 flex items-center justify-between max-w-md">
          <div>
            <div className="text-sm font-medium">Authenticator app</div>
            <div className="text-xs text-gray-400">Not enabled</div>
          </div>
          <button className="text-sm border rounded-lg px-4 py-2">
            Enable 2FA
          </button>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="font-bold text-orange-600 mb-2">Danger Zone</h2>
        <p className="text-sm text-gray-500 max-w-md mb-4">
          Deleting your account is permanent and cannot be undone. All your
          order history, saved items, and personal information will be removed.
        </p>
        <button className="text-sm text-orange-600 bg-orange-50 px-4 py-2.5 rounded-lg">
          Delete Account
        </button>
      </div>
    </div>
  );
};

const PasswordField = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => (
  <div>
    <div className="text-[11px] uppercase text-gray-400 mb-1">{label}</div>
    <input
      type="password"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50 border rounded-lg px-3 py-2.5 text-sm"
    />
  </div>
);

import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { mockUser } from "./mockData";

type PersonalInfoForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
};

type EditFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
};

type InfoFieldProps = {
  label: string;
  value: string;
};

export const PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState<PersonalInfoForm>({
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    email: mockUser.email,
    phone: mockUser.phone,
    dob: mockUser.dob,
  });

  const handleChange = (
    field: keyof PersonalInfoForm,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold">Personal Information</h2>

          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-sm border rounded-lg px-4 py-2"
          >
            <Pencil size={14} />
            Edit
          </button>
        </div>

        <div className="flex items-center gap-4 pb-6 border-b mb-6">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-16 h-16 rounded-full object-cover bg-gray-100"
          />

          <div>
            <div className="font-semibold">{mockUser.name}</div>

            <div className="text-sm text-gray-400">
              {mockUser.tier} · Member since {mockUser.memberSince}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <InfoField
            label="First Name"
            value={form.firstName}
          />

          <InfoField
            label="Last Name"
            value={form.lastName}
          />

          <InfoField
            label="Email"
            value={form.email}
          />

          <InfoField
            label="Phone"
            value={form.phone}
          />

          <InfoField
            label="Date of Birth"
            value={form.dob}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-6">
      <h2 className="font-bold mb-6">
        Personal Information
      </h2>

      <div className="flex items-center gap-4 pb-6 border-b mb-6">
        <div className="relative">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-16 h-16 rounded-full object-cover bg-gray-100"
          />

          <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-1.5">
            <Pencil size={11} className="text-white" />
          </div>
        </div>

        <div>
          <div className="font-semibold">
            {mockUser.name}
          </div>

          <div className="text-sm text-gray-400">
            {mockUser.tier} · Member since {mockUser.memberSince}
          </div>

          <button className="text-sm text-orange-600 mt-1">
            Change photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <EditField
          label="First Name"
          value={form.firstName}
          onChange={(value) =>
            handleChange("firstName", value)
          }
        />

        <EditField
          label="Last Name"
          value={form.lastName}
          onChange={(value) =>
            handleChange("lastName", value)
          }
        />

        <EditField
          label="Email Address"
          value={form.email}
          onChange={(value) =>
            handleChange("email", value)
          }
        />

        <EditField
          label="Phone Number"
          value={form.phone}
          onChange={(value) =>
            handleChange("phone", value)
          }
        />

        <EditField
          label="Date of Birth"
          type="date"
          value={form.dob}
          onChange={(value) =>
            handleChange("dob", value)
          }
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="bg-black text-white text-sm px-6 py-3 rounded-lg"
        >
          Save Changes
        </button>

        <button
          onClick={() => setIsEditing(false)}
          className="bg-gray-100 text-sm px-6 py-3 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const InfoField = ({
  label,
  value,
}: InfoFieldProps) => (
  <div>
    <div className="text-[11px] uppercase text-gray-400 mb-1">
      {label}
    </div>

    <div className="text-sm">{value}</div>
  </div>
);

const EditField = ({
  label,
  value,
  onChange,
  type = "text",
}: EditFieldProps) => (
  <div>
    <div className="text-[11px] uppercase text-gray-400 mb-1">
      {label}
    </div>

    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50 border rounded-lg px-3 py-2.5 text-sm"
    />
  </div>
);
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUpdateMeMutation } from "../../store/api";
import { mockUser } from "./mockData";

type PersonalInfoForm = {
  fullname: string;
  phone: string;
  createdAt: string;
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
  const { t } = useTranslation("profile");

  const [isEditing, setIsEditing] = useState(false);

  const [updateMe, { isLoading }] = useUpdateMeMutation();

  const [form, setForm] = useState<PersonalInfoForm>(() => {
    const user = JSON.parse(localStorage.getItem("user")!);

    return {
      fullname: user.fullname,
      phone: user.phone,
      createdAt: user.createdAt,
    };
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

  const handleSave = async () => {
    try {
      const response = await updateMe({
        fullname: form.fullname,
        phone: form.phone,
      }).unwrap();

      const updatedUser = response.data;

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setIsEditing(false);
    } catch (error) {
      console.error("User update error:", error);
    }
  };

  const handleCancel = () => {
    const user = JSON.parse(localStorage.getItem("user")!);

    setForm({
      fullname: user.fullname,
      phone: user.phone,
      createdAt: user.createdAt,
    });

    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold">
            {t("personalInfo.title")}
          </h2>

          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-sm border rounded-lg px-4 py-2"
          >
            <Pencil size={14} />
            {t("personalInfo.edit")}
          </button>
        </div>

        <div className="flex items-center gap-4 pb-6 border-b mb-6">
          <img
            src={mockUser.avatar}
            alt={form.fullname}
            className="w-16 h-16 rounded-full object-cover bg-gray-100"
          />

          <div>
            <div className="font-semibold">
              {form.fullname}
            </div>

            <div className="text-sm text-gray-400">
              {t("personalInfo.memberSince")}{" "}
              {new Date(form.createdAt)
                .toISOString()
                .split("T")[0]}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <InfoField
            label={t("personalInfo.firstName")}
            value={form.fullname}
          />

          <InfoField
            label={t("personalInfo.phone")}
            value={form.phone}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-6">
      <h2 className="font-bold mb-6">
        {t("personalInfo.title")}
      </h2>

      <div className="flex items-center gap-4 pb-6 border-b mb-6">
        <div className="relative">
          <img
            src={mockUser.avatar}
            alt={form.fullname}
            className="w-16 h-16 rounded-full object-cover bg-gray-100"
          />

          <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-1.5">
            <Pencil
              size={11}
              className="text-white"
            />
          </div>
        </div>

        <div>
          <div className="font-semibold">
            {form.fullname}
          </div>

          <div className="text-sm text-gray-400">
            {t("personalInfo.memberSince")}{" "}
            {new Date(form.createdAt)
              .toISOString()
              .split("T")[0]}
          </div>

          <button className="text-sm text-orange-600 mt-1">
            {t("personalInfo.changePhoto")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <EditField
          label={t("personalInfo.firstName")}
          value={form.fullname}
          onChange={(value) =>
            handleChange("fullname", value)
          }
        />

        <EditField
          label={t("personalInfo.phoneNumber")}
          value={form.phone}
          onChange={(value) =>
            handleChange("phone", value)
          }
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-black text-white text-sm px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {isLoading ? t("personalInfo.saving") : t("personalInfo.saveChanges")}
        </button>

        <button
          onClick={handleCancel}
          disabled={isLoading}
          className="bg-gray-100 text-sm px-6 py-3 rounded-lg"
        >
          {t("personalInfo.cancel")}
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
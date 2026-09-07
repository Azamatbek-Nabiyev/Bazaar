import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export const ShippingAddressForm = () => {
  const { t } = useTranslation("checkout");
  const [user] = useState(() => {
      let user = localStorage.getItem("user");
  
      return user ? JSON.parse(user) : null;
    });

  const [form, setForm] = useState({
    fullName: user.fullname,
    address: user.addresses[0]?.address,
    city: user.addresses[0]?.city,
    phone: user.phone,
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="border rounded-lg p-6">
      <h2 className="font-bold mb-5">{t("shipping.title")}</h2>

      <div className="grid grid-cols-2 gap-4">
        <Field
          label={t("shipping.fullName")}
          value={form.fullName}
          onChange={(v) => handleChange("fullName", v)}
          full
        />
        <Field
          label={t("shipping.address")}
          value={form.address}
          onChange={(v) => handleChange("address", v)}
          full
        />
        <Field
          label={t("shipping.city")}
          value={form.city}
          onChange={(v) => handleChange("city", v)}
        />
        <Field
          label={t("shipping.phone")}
          value={form.phone}
          onChange={(v) => handleChange("phone", v)}
          full
        />
      </div>
    </div>
  );
};

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  full?: boolean;
};

const Field = ({ label, value, onChange, full }: FieldProps) => (
  <div className={full ? "col-span-2" : ""}>
    <div className="text-[11px] uppercase text-gray-400 mb-1">{label}</div>

    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50 border rounded-lg px-3 py-2.5 text-sm"
    />
  </div>
);

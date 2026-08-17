import React, { useState } from "react";

export const ShippingAddressForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    phone: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="border rounded-lg p-6">
      <h2 className="font-bold mb-5">Shipping Address</h2>

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Full Name"
          value={form.fullName}
          onChange={(v) => handleChange("fullName", v)}
          full
        />
        <Field
          label="Address"
          value={form.address}
          onChange={(v) => handleChange("address", v)}
          full
        />
        <Field
          label="City"
          value={form.city}
          onChange={(v) => handleChange("city", v)}
        />
        <Field
          label="State"
          value={form.state}
          onChange={(v) => handleChange("state", v)}
        />
        <Field
          label="ZIP Code"
          value={form.zip}
          onChange={(v) => handleChange("zip", v)}
        />
        <Field
          label="Country"
          value={form.country}
          onChange={(v) => handleChange("country", v)}
        />
        <Field
          label="Phone"
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

import { useState } from 'react';
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t } = useTranslation("contact");
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-neutral-200 p-8 text-center">
        <h3 className="font-semibold text-neutral-900 mb-2">
          {t("form.success.title")}
        </h3>
        <p className="text-sm text-neutral-500">
          {t("form.success.description")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5">
        <Field
          label={t("form.fields.fullName")}
          value={form.name}
          onChange={(v) => handleChange('name', v)}
        />
        <Field
          label={t("form.fields.email")}
          type="email"
          value={form.email}
          onChange={(v) => handleChange('email', v)}
        />
      </div>

      <Field
        label={t("form.fields.subject")}
        value={form.subject}
        onChange={(v) => handleChange('subject', v)}
      />

      <div>
        <div className="text-[11px] uppercase text-neutral-400 mb-1">
          {t("form.fields.message")}
        </div>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className="w-full border border-neutral-300 px-3 py-2.5 text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        className="bg-neutral-900 text-white text-sm font-semibold px-8 py-3 hover:bg-neutral-800 transition-colors w-fit"
      >
        {t("form.submit")}
      </button>
    </form>
  );
}

const Field = ({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) => (
  <div>
    <div className="text-[11px] uppercase text-neutral-400 mb-1">{label}</div>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-neutral-300 px-3 py-2.5 text-sm"
    />
  </div>
);

import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { contactInfo } from './mockData';

const iconMap = {
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  clock: Clock,
};

export default function ContactInfo() {
  const { t } = useTranslation("contact");

  return (
    <div className="flex flex-col gap-6">
      {contactInfo.map((item) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];
        const value = item.valueKey ? t(item.valueKey) : item.value;
        return (
          <div key={item.labelKey} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
              <Icon size={17} className="text-neutral-900" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-neutral-400 mb-0.5">
                {t(item.labelKey)}
              </div>
              <div className="text-sm text-neutral-800">{value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

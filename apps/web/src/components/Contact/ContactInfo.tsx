import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { contactInfo } from './mockData';

const iconMap = {
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  clock: Clock,
};

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      {contactInfo.map((item) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];
        return (
          <div key={item.label} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
              <Icon size={17} className="text-neutral-900" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-neutral-400 mb-0.5">
                {item.label}
              </div>
              <div className="text-sm text-neutral-800">{item.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
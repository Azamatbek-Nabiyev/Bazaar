import {
  TrendingUp,
  Package,
  User,
  MapPin,
  LogOut,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { SidebarNavItem } from "./SidebarNavItem";
import { useNavigate } from "react-router-dom";

const navItems: {key: string, labelKey: string, icon: any}[] = [
  { key: "overview", labelKey: "sidebar.overview", icon: <TrendingUp size={16} /> },
  { key: "orders", labelKey: "sidebar.orders", icon: <Package size={16} /> },
  { key: "personal", labelKey: "sidebar.personal", icon: <User size={16} /> },
  { key: "addresses", labelKey: "sidebar.addresses", icon: <MapPin size={16} /> },
];

export const ProfileSidebar = ({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (value: string) => void;
}) => {
  const { t } = useTranslation("profile");

    const navigate = useNavigate();


  return (
    <div className="w-64 bg-gray-50 border-r">
      <div className="py-2">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.key}
            icon={item.icon}
            label={t(item.labelKey)}
            active={activeTab === item.key}
            onClick={() => onTabChange(item.key)}
          />
        ))}
      </div>

      <div className="border-t mt-2 pt-2">
        <SidebarNavItem
          icon={<LogOut size={16} />}
          label={t("sidebar.signOut")}
          danger
          onClick={() => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')

            navigate('/login')
            
          }}
        />
      </div>
    </div>
  );
};

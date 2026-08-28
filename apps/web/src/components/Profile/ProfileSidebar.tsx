import {
  TrendingUp,
  Package,
  User,
  MapPin,
  LogOut,
} from "lucide-react";
import { SidebarNavItem } from "./SidebarNavItem";
import { useNavigate } from "react-router-dom";

const navItems: {key: string, label: string, icon: any}[] = [
  { key: "overview", label: "Overview", icon: <TrendingUp size={16} /> },
  { key: "orders", label: "My Orders", icon: <Package size={16} /> },
  { key: "personal", label: "Personal Info", icon: <User size={16} /> },
  { key: "addresses", label: "Addresses", icon: <MapPin size={16} /> },
];

export const ProfileSidebar = ({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (value: string) => void;
}) => {

    const navigate = useNavigate();
  

  return (
    <div className="w-64 bg-gray-50 border-r">
      <div className="py-2">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            active={activeTab === item.key}
            onClick={() => onTabChange(item.key)}
          />
        ))}
      </div>

      <div className="border-t mt-2 pt-2">
        <SidebarNavItem
          icon={<LogOut size={16} />}
          label="Sign Out"
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

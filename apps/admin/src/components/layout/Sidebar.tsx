import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tags,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/products", label: "Products", icon: Package },
  { to: "/orders", label: "Orders", icon: ShoppingCart },
  { to: "/users", label: "Users", icon: Users },
  { to: "/categories", label: "Categories", icon: Tags },
  { to: "/settings", label: "Settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-neutral-900 text-neutral-300 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-800">
        <span className="text-xl font-bold text-white tracking-tight">
          Bazaar
        </span>
        <span className="ml-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-orange-600 text-white"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-neutral-800">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
};
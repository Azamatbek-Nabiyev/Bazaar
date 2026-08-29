import { Bell, Search, ChevronDown } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [user] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-10">
      {/* Search */}
      <div className="relative w-80">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-neutral-400"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        <button className="relative text-neutral-500 hover:text-neutral-800 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-600 rounded-full" />
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-semibold text-neutral-600">
            {user?.fullname?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-neutral-800 leading-tight">
              {user?.fullname || "Admin"}
            </p>
            <p className="text-xs text-neutral-400 leading-tight">
              {user?.role || "Administrator"}
            </p>
          </div>
          <ChevronDown size={16} className="text-neutral-400" />
        </div>
      </div>
    </header>
  );
};
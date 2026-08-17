import React from 'react';
import { TrendingUp, Package, User, MapPin, CreditCard, Shield, Heart, LogOut } from 'lucide-react';
import { SidebarNavItem } from './SidebarNavItem';

const navItems = [
  { key: 'overview', label: 'Overview', icon: <TrendingUp size={16} /> },
  { key: 'orders', label: 'My Orders', icon: <Package size={16} /> },
  { key: 'personal', label: 'Personal Info', icon: <User size={16} /> },
  { key: 'addresses', label: 'Addresses', icon: <MapPin size={16} /> },
  { key: 'payment', label: 'Payment Methods', icon: <CreditCard size={16} /> },
  { key: 'security', label: 'Security', icon: <Shield size={16} /> },
];

export const ProfileSidebar = ({ activeTab, onTabChange }) => {
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
          icon={<Heart size={16} />}
          label="Saved Items"
          active={activeTab === 'saved'}
          onClick={() => onTabChange('saved')}
        />
        <SidebarNavItem
          icon={<LogOut size={16} />}
          label="Sign Out"
          danger
          onClick={() => alert('Sign out — hozircha test rejim')}
        />
      </div>
    </div>
  );
};
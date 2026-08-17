import React, { useState } from "react";
import { ProfileSidebar } from "./ProfileSidebar";
import { Overview } from "./Overview";
import { OrderHistory } from "./OrderHistory";
import { PersonalInfo } from "./PersonalInfo";
import { Addresses } from "./Addresses";
import { PaymentMethods } from "./PaymentMethods";
import { Security } from "./Security";
import { mockUser } from "./mockData";

const tabComponents = {
  overview: Overview,
  orders: OrderHistory,
  personal: PersonalInfo,
  addresses: Addresses,
  payment: PaymentMethods,
  security: Security,
};

type Tab = keyof typeof tabComponents;

export const ProfileLayout = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="max-w-7xl mx-auto bg-white">
      <div className="flex items-center gap-4 px-8 py-6 border-b bg-white">
        <img
          src={mockUser.avatar}
          alt={mockUser.name}
          className="w-14 h-14 rounded object-cover bg-gray-100"
        />
        <div>
          <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
            {mockUser.tier.toUpperCase()}
          </div>
          <h1 className="text-2xl font-serif font-bold">{mockUser.name}</h1>
        </div>
      </div>

      <div className="flex bg-gray-50">
        <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg p-6">
            {ActiveComponent ? <ActiveComponent /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

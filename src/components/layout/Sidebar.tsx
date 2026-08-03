'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  FileText,
  CreditCard,
  Settings,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Zap,
  CheckCircle2,
  Lock,
  ChevronDown
} from 'lucide-react';
import { GroloWordmark } from '../brand/GroloLogo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);

  const mainNav = [
    {
      id: 'reach-agent',
      label: 'Reach Agent',
      icon: Sparkles,
      active: true,
      badge: 'Active',
      badgeColor: 'bg-blue-50 text-[#2563EB] border border-blue-200',
    },
    {
      id: 'score-agent',
      label: 'Score Agent',
      icon: TrendingUp,
      disabled: true,
      badge: 'Soon',
      badgeColor: 'bg-gray-100 text-gray-400 border border-gray-200',
    },
    {
      id: 'stick-agent',
      label: 'Stick Agent',
      icon: Zap,
      disabled: true,
      badge: 'Soon',
      badgeColor: 'bg-gray-100 text-gray-400 border border-gray-200',
    },
  ];

  const secondaryNav = [
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-[280px] min-w-[280px] h-screen sticky top-0 bg-white border-r border-[#E5E7EB] flex flex-col justify-between z-30 select-none font-sans">
      {/* Top Header & Branding */}
      <div className="p-5 flex flex-col gap-6">
        {/* Logo — Custom SVG Wordmark */}
        <div className="px-1">
          <GroloWordmark showBadge={true} />
        </div>

        {/* Organization Switcher Selector */}
        <div className="relative">
          <button
            onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
            className="w-full flex items-center justify-between p-2.5 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] hover:bg-gray-100/80 transition-colors text-left text-xs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded bg-[#111827] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                AP
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-[#111827] truncate">Apex Plumbing & HVAC</p>
                <p className="text-[11px] text-[#6B7280] truncate">Seattle, WA • Enterprise</p>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
          </button>

          {orgDropdownOpen && (
            <div className="absolute top-full left-0 w-full mt-1.5 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1.5 z-50 text-xs">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">
                Switch Organization
              </div>
              <button
                onClick={() => setOrgDropdownOpen(false)}
                className="w-full flex items-center justify-between px-3 py-2 bg-blue-50/60 text-[#2563EB] font-medium"
              >
                <span className="truncate">Apex Plumbing & HVAC</span>
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              </button>
              <button
                onClick={() => setOrgDropdownOpen(false)}
                className="w-full text-left px-3 py-2 text-[#111827] hover:bg-gray-50 font-medium truncate"
              >
                Metro Dental Care Center
              </button>
              <button
                onClick={() => setOrgDropdownOpen(false)}
                className="w-full text-left px-3 py-2 text-[#111827] hover:bg-gray-50 font-medium truncate"
              >
                Urban Fitness Club
              </button>
            </div>
          )}
        </div>

        {/* Navigation Groups */}
        <nav className="flex flex-col gap-6">
          {/* AI Agents Group */}
          <div className="flex flex-col gap-1">
            <span className="px-2 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              AI Autonomous Agents
            </span>

            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              if (item.disabled) {
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-gray-400 cursor-not-allowed opacity-60 bg-transparent"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-gray-300" />
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50/80 text-[#2563EB] border border-blue-100 shadow-xs'
                      : 'text-[#111827] hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#2563EB]' : 'text-[#6B7280]'}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Platform Nav Group */}
          <div className="flex flex-col gap-1">
            <span className="px-2 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
              Management
            </span>
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-100 text-[#111827] font-semibold'
                      : 'text-[#6B7280] hover:text-[#111827] hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Bottom User Profile Section */}
      <div className="p-4 border-t border-[#E5E7EB] bg-[#F8FAFC]">
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#111827] text-white flex items-center justify-center text-xs font-semibold">
                AM
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#16A34A] border-2 border-white rounded-full"></span>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-[#111827]">Alex Morgan</span>
                <ShieldCheck className="w-3 h-3 text-[#2563EB]" />
              </div>
              <span className="text-[11px] text-[#6B7280]">alex@apexplumbing.com</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6B7280]" />
        </div>
      </div>
    </aside>
  );
};

'use client';

import React, { useState } from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  Command,
  Sparkles,
  CheckCircle,
  ExternalLink,
  BookOpen,
  MessageSquare,
  ChevronDown,
  User,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const notifications = [
    {
      id: '1',
      title: 'LocalBusiness Schema Deployed',
      time: '10m ago',
      unread: true,
    },
    {
      id: '2',
      title: 'Rankings updated for Seattle Emergency',
      time: '1h ago',
      unread: true,
    },
    {
      id: '3',
      title: 'Monthly GBP performance report ready',
      time: '4h ago',
      unread: false,
    },
  ];

  return (
    <header className="h-[72px] min-h-[72px] sticky top-0 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] z-20 px-8 flex items-center justify-between font-sans">
      {/* Left: Global Search Input */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] text-[#6B7280] hover:border-gray-300 hover:bg-gray-100/60 transition-all text-xs group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-[#6B7280] group-hover:text-[#111827] transition-colors" />
            <span className="font-normal text-[#6B7280]">Search Business, Keywords, Reports...</span>
          </div>
          <div className="flex items-center gap-1 bg-white border border-[#E5E7EB] px-1.5 py-0.5 rounded text-[10px] font-medium text-[#6B7280] shadow-2xs">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Action Icons & User Dropdown */}
      <div className="flex items-center gap-3">
        {/* System Status Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
          <span>AI Engine Connected</span>
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setUserMenuOpen(false);
              setHelpOpen(false);
            }}
            className="relative p-2 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 transition-colors border border-transparent hover:border-[#E5E7EB]"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC2626] border border-white" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E5E7EB] rounded-xl shadow-xl py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-[#E5E7EB] flex items-center justify-between">
                <span className="font-bold text-[#111827]">Notifications</span>
                <span className="text-[10px] text-[#2563EB] font-semibold cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>
              <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 hover:bg-gray-50 transition-colors flex items-start gap-2.5 ${
                      n.unread ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                    <div>
                      <p className="font-medium text-[#111827] leading-snug">{n.title}</p>
                      <p className="text-[11px] text-[#6B7280] mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help Center Button */}
        <div className="relative">
          <button
            onClick={() => {
              setHelpOpen(!helpOpen);
              setNotificationsOpen(false);
              setUserMenuOpen(false);
            }}
            className="p-2 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 transition-colors border border-transparent hover:border-[#E5E7EB]"
            title="Help & Documentation"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {helpOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E5E7EB] rounded-xl shadow-xl py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-[#E5E7EB] font-bold text-[#111827]">
                Grolo Support & Docs
              </div>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-2.5 px-4 py-2.5 text-[#111827] hover:bg-gray-50 transition-colors font-medium"
              >
                <BookOpen className="w-4 h-4 text-[#2563EB]" />
                <span>Reach Agent Documentation</span>
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-2.5 px-4 py-2.5 text-[#111827] hover:bg-gray-50 transition-colors font-medium"
              >
                <MessageSquare className="w-4 h-4 text-[#16A34A]" />
                <span>Contact Enterprise Support</span>
              </a>
            </div>
          )}
        </div>

        <div className="h-4 w-px bg-[#E5E7EB] mx-1" />

        {/* User Avatar Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setUserMenuOpen(!userMenuOpen);
              setNotificationsOpen(false);
              setHelpOpen(false);
            }}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#111827] text-white flex items-center justify-center text-xs font-semibold">
              AM
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E7EB] rounded-xl shadow-xl py-1.5 z-50 text-xs">
              <div className="px-4 py-2.5 border-b border-[#E5E7EB]">
                <p className="font-bold text-[#111827]">Alex Morgan</p>
                <p className="text-[11px] text-[#6B7280]">Alex@apexplumbing.com</p>
              </div>
              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-[#111827] hover:bg-gray-50 font-medium">
                <User className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>Account Preferences</span>
              </button>
              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-[#111827] hover:bg-gray-50 font-medium">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>API Keys & Integrations</span>
              </button>
              <div className="border-t border-[#E5E7EB] my-1" />
              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-[#DC2626] hover:bg-red-50 font-medium">
                <LogOut className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

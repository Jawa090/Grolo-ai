'use client';

import React from 'react';
import { Star, PhoneCall, Navigation, Globe, Eye, MessageSquare, TrendingUp, CheckCircle2 } from 'lucide-react';
import { mockGBPData } from '../../data/mockData';

export const GoogleBusinessProfile: React.FC = () => {
  const stats = [
    {
      id: 'calls',
      label: 'Calls Direct',
      value: mockGBPData.calls.toLocaleString(),
      trend: mockGBPData.callsTrend,
      icon: PhoneCall,
      iconBg: 'bg-blue-50 text-[#2563EB]',
    },
    {
      id: 'directions',
      label: 'Direction Requests',
      value: mockGBPData.directionRequests.toLocaleString(),
      trend: mockGBPData.directionTrend,
      icon: Navigation,
      iconBg: 'bg-[#16A34A]/10 text-[#16A34A]',
    },
    {
      id: 'clicks',
      label: 'Website Clicks',
      value: mockGBPData.websiteClicks.toLocaleString(),
      trend: mockGBPData.clicksTrend,
      icon: Globe,
      iconBg: 'bg-purple-50 text-purple-600',
    },
    {
      id: 'views',
      label: 'Photo Views',
      value: mockGBPData.photoViews.toLocaleString(),
      trend: mockGBPData.photoViewsTrend,
      icon: Eye,
      iconBg: 'bg-amber-50 text-[#F59E0B]',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs overflow-hidden font-sans">
      {/* Header */}
      <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#111827] tracking-tight">Google Business Profile</h3>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" /> Live Sync
            </span>
          </div>
          <p className="text-xs text-[#6B7280]">
            Direct Google Maps customer engagement metrics over past 30 days.
          </p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="p-5 border-b border-[#E5E7EB] bg-[#F8FAFC]/50">
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#E5E7EB] mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 font-bold text-lg">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#111827] tracking-tight">
                  {mockGBPData.overallRating}
                </span>
                <div className="flex text-amber-400 text-xs">
                  {'â˜…'.repeat(5)}
                </div>
              </div>
              <span className="text-xs text-[#6B7280]">Overall Google Rating</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xl font-bold text-[#111827] tracking-tight">
              {mockGBPData.reviewCount} Reviews
            </div>
            <span className="text-xs text-[#16A34A] font-semibold">+18 new this month</span>
          </div>
        </div>

        {/* 4 Performance Tiles */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className="p-3.5 bg-white rounded-xl border border-[#E5E7EB] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#6B7280]">{s.label}</span>
                  <div className={`p-1.5 rounded-md ${s.iconBg}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-bold text-[#111827] tracking-tight">{s.value}</span>
                  <span className="text-xs font-bold text-[#16A34A]">{s.trend}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


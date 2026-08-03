'use client';

import React from 'react';
import { Target, Eye, TrendingUp, Search, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const TopKPICards: React.FC = () => {
  const kpis = [
    {
      id: 'reach-score',
      title: 'Reach Score',
      value: '82/100',
      icon: Target,
      iconBg: 'bg-blue-50 text-[#2563EB]',
      trend: '+4 pts vs last month',
      trendType: 'positive',
      subtext: 'Optimized local authority',
    },
    {
      id: 'google-visibility',
      title: 'Google Visibility',
      value: 'Good',
      icon: Eye,
      iconBg: 'bg-emerald-50 text-[#16A34A]',
      trend: 'Top 3 in 14 zip codes',
      trendType: 'positive',
      subtext: 'Google Maps & Local SERP',
    },
    {
      id: 'organic-traffic',
      title: 'Organic Traffic',
      value: '+23%',
      icon: TrendingUp,
      iconBg: 'bg-[#2563EB]/10 text-[#2563EB]',
      trend: '12,450 visits / month',
      trendType: 'positive',
      subtext: '+2,310 visits from organic search',
    },
    {
      id: 'keyword-rankings',
      title: 'Keyword Rankings',
      value: '48 tracked',
      icon: Search,
      iconBg: 'bg-purple-50 text-purple-600',
      trend: '+7 top 3 positions',
      trendType: 'positive',
      subtext: '28 keywords in Top 10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-2xs hover:shadow-xs hover:border-gray-300 transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              {/* Header: Title & Icon */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                  {kpi.title}
                </span>
                <div className={`p-2 rounded-lg ${kpi.iconBg} transition-transform group-hover:scale-105`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Large Number */}
              <div className="text-2xl lg:text-3xl font-bold text-[#111827] tracking-tight mb-2">
                {kpi.value}
              </div>
            </div>

            {/* Bottom Trend Indicator */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs mt-1">
              <div className="flex items-center gap-1 text-[#16A34A] font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                <span>{kpi.trend}</span>
              </div>
              <span className="text-[11px] text-[#6B7280] truncate max-w-[120px]" title={kpi.subtext}>
                {kpi.subtext}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};


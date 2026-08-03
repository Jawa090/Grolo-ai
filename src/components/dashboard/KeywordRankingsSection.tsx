'use client';

import React, { useState } from 'react';
import {
  Search,
  ArrowUp,
  ArrowDown,
  Minus,
  TrendingUp,
  Filter,
  Layers,
  ChevronDown,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { KeywordItem } from '../../types';
import { mockKeywordTrendData } from '../../data/mockData';

interface KeywordRankingsSectionProps {
  keywords: KeywordItem[];
}

export const KeywordRankingsSection: React.FC<KeywordRankingsSectionProps> = ({ keywords }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [timeframe, setTimeframe] = useState<string>('30D');

  const filteredKeywords = keywords.filter((item) => {
    const matchesSearch = item.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === 'All') return matchesSearch;
    return matchesSearch && item.status === statusFilter;
  });

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs overflow-hidden font-sans">
      {/* Header Bar */}
      <div className="p-5 border-b border-[#E5E7EB] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#111827] tracking-tight">Keyword Rankings</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#2563EB] border border-blue-100">
              12 Tracked
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Real-time local search positions and organic search traffic estimates for Seattle, WA.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Filter keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] text-xs text-[#111827] focus:bg-white focus:outline-none focus:border-[#2563EB] transition-colors w-40 sm:w-48"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center bg-[#F8FAFC] p-1 rounded-lg border border-[#E5E7EB] text-xs font-medium">
            {['All', 'Top 3', 'Top 10', 'Opportunity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  statusFilter === tab
                    ? 'bg-white text-[#111827] font-bold shadow-2xs border border-gray-200'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Professional Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#6B7280] font-semibold tracking-wider">
              <th className="py-3 px-4">Keyword</th>
              <th className="py-3 px-3 text-center">Position</th>
              <th className="py-3 px-3 text-center">Previous</th>
              <th className="py-3 px-3 text-center">Trend</th>
              <th className="py-3 px-4 text-right">Est. Traffic</th>
              <th className="py-3 px-4">Difficulty</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {filteredKeywords.map((kw) => {
              const isUp = kw.trend === 'up';
              const isDown = kw.trend === 'down';
              return (
                <tr
                  key={kw.id}
                  className="hover:bg-blue-50/20 transition-colors group"
                >
                  {/* Keyword */}
                  <td className="py-3.5 px-4 font-semibold text-[#111827]">
                    <div className="flex items-center gap-2">
                      <span className="group-hover:text-[#2563EB] transition-colors">
                        {kw.keyword}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-gray-100 text-[#6B7280] font-normal">
                        {kw.searchIntent}
                      </span>
                    </div>
                  </td>

                  {/* Current Position */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-gray-900 text-white font-bold text-xs">
                      #{kw.currentPosition}
                    </span>
                  </td>

                  {/* Previous Position */}
                  <td className="py-3.5 px-3 text-center text-[#6B7280] font-medium">
                    #{kw.previousPosition}
                  </td>

                  {/* Trend Indicator */}
                  <td className="py-3.5 px-3 text-center">
                    {isUp && (
                      <span className="inline-flex items-center gap-0.5 text-[#16A34A] font-bold">
                        <ArrowUp className="w-3.5 h-3.5" />+{kw.trendValue}
                      </span>
                    )}
                    {isDown && (
                      <span className="inline-flex items-center gap-0.5 text-[#DC2626] font-bold">
                        <ArrowDown className="w-3.5 h-3.5" />-{kw.trendValue}
                      </span>
                    )}
                    {!isUp && !isDown && (
                      <span className="inline-flex items-center gap-0.5 text-[#6B7280] font-medium">
                        <Minus className="w-3.5 h-3.5" />0
                      </span>
                    )}
                  </td>

                  {/* Monthly Traffic */}
                  <td className="py-3.5 px-4 text-right font-medium text-[#111827]">
                    {kw.monthlyTraffic.toLocaleString()} / mo
                  </td>

                  {/* Difficulty */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2 w-28">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            kw.difficulty === 'High'
                              ? 'bg-[#DC2626]'
                              : kw.difficulty === 'Medium'
                              ? 'bg-[#F59E0B]'
                              : 'bg-[#16A34A]'
                          }`}
                          style={{ width: `${kw.difficultyScore}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-[#6B7280] font-medium shrink-0">
                        {kw.difficultyScore}
                      </span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        kw.status === 'Top 3'
                          ? 'bg-emerald-50 text-[#16A34A] border border-emerald-200'
                          : kw.status === 'Top 10'
                          ? 'bg-blue-50 text-[#2563EB] border border-blue-200'
                          : kw.status === 'Opportunity'
                          ? 'bg-amber-50 text-[#F59E0B] border border-amber-200'
                          : 'bg-red-50 text-[#DC2626] border border-red-200'
                      }`}
                    >
                      {kw.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Interactive Line Chart Section */}
      <div className="p-5 border-t border-[#E5E7EB] bg-[#F8FAFC]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Keyword Ranking & Visibility Trend
            </h4>
            <p className="text-[11px] text-[#6B7280]">
              Historical position growth across Top 3 and Top 10 SERP slots.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {['7D', '30D', '90D', '1Y'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  timeframe === tf
                    ? 'bg-[#111827] text-white'
                    : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:text-[#111827]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Recharts Area / Line Chart */}
        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockKeywordTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisibility" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTop3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} stroke="#E5E7EB" />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} stroke="#E5E7EB" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="totalVisibility"
                name="Visibility Index"
                stroke="#2563EB"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorVisibility)"
              />
              <Area
                type="monotone"
                dataKey="top3"
                name="Top 3 Rankings"
                stroke="#16A34A"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTop3)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};


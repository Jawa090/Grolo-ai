'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Wrench,
  ChevronRight,
  Code2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { SEOHealthItem } from '../../types';

interface SEOHealthChecklistProps {
  items: SEOHealthItem[];
  onFixItem: (item: SEOHealthItem) => void;
}

export const SEOHealthChecklist: React.FC<SEOHealthChecklistProps> = ({ items, onFixItem }) => {
  const [filter, setFilter] = useState<'all' | 'issues' | 'passed'>('all');

  const filteredItems = items.filter((item) => {
    if (filter === 'issues') return item.status === 'warning' || item.status === 'failed';
    if (filter === 'passed') return item.status === 'passed';
    return true;
  });

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs overflow-hidden font-sans">
      {/* Header */}
      <div className="p-5 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#111827] tracking-tight">SEO Health Checklist</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#16A34A] border border-emerald-200">
              Score: 84/100
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Automated technical SEO audit covering structural tags, speed, and schema integrity.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center bg-[#F8FAFC] p-1 rounded-lg border border-[#E5E7EB] text-xs font-medium">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md transition-all ${
              filter === 'all'
                ? 'bg-white text-[#111827] font-bold shadow-2xs border border-gray-200'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            All ({items.length})
          </button>
          <button
            onClick={() => setFilter('issues')}
            className={`px-3 py-1 rounded-md transition-all ${
              filter === 'issues'
                ? 'bg-white text-[#111827] font-bold shadow-2xs border border-gray-200'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Action Needed (2)
          </button>
          <button
            onClick={() => setFilter('passed')}
            className={`px-3 py-1 rounded-md transition-all ${
              filter === 'passed'
                ? 'bg-white text-[#111827] font-bold shadow-2xs border border-gray-200'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Passed (6)
          </button>
        </div>
      </div>

      {/* Checklist Rows */}
      <div className="divide-y divide-[#E5E7EB]">
        {filteredItems.map((item) => {
          const isPassed = item.status === 'passed';
          const isWarning = item.status === 'warning';
          const isFailed = item.status === 'failed';

          return (
            <div
              key={item.id}
              className="p-4 sm:px-5 hover:bg-gray-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              {/* Status & Title */}
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className="mt-0.5 shrink-0">
                  {isPassed && <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />}
                  {isWarning && <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />}
                  {isFailed && <XCircle className="w-5 h-5 text-[#DC2626]" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-[#111827] group-hover:text-[#2563EB] transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-gray-100 text-[#6B7280] font-medium">
                      {item.category}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isPassed
                          ? 'bg-emerald-50 text-[#16A34A]'
                          : isWarning
                          ? 'bg-amber-50 text-[#F59E0B]'
                          : 'bg-red-50 text-[#DC2626]'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Fix Button / Actions */}
              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <span className="text-xs font-semibold text-[#111827] bg-gray-100 px-2.5 py-1 rounded-md">
                  {item.score}
                </span>

                {!isPassed ? (
                  <button
                    onClick={() => onFixItem(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2563EB] text-white hover:bg-blue-700 text-xs font-semibold transition-all shadow-xs active:scale-98"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Fix with AI</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onFixItem(item)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:text-[#111827] hover:bg-gray-50 text-xs font-medium transition-colors"
                  >
                    <span>View Audit</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


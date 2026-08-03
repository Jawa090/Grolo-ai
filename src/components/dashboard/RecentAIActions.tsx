'use client';

import React from 'react';
import { Sparkles, FileCode, CheckCircle2, Search, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { AIActionItem } from '../../types';

interface RecentAIActionsProps {
  actions: AIActionItem[];
}

export const RecentAIActions: React.FC<RecentAIActionsProps> = ({ actions }) => {
  const getActionIcon = (type: string) => {
    switch (type) {
      case 'Meta Generated':
        return <FileCode className="w-4 h-4 text-[#2563EB]" />;
      case 'Schema Added':
        return <Sparkles className="w-4 h-4 text-purple-600" />;
      case 'GBP Optimized':
        return <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />;
      case 'Keyword Opportunity Found':
        return <Search className="w-4 h-4 text-[#F59E0B]" />;
      case 'Review Campaign Suggested':
        return <Mail className="w-4 h-4 text-[#2563EB]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#2563EB]" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs overflow-hidden font-sans">
      {/* Header */}
      <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#111827] tracking-tight">Recent AI Actions</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#16A34A] border border-emerald-200">
              Autonomous Log
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Real-time audit log of tasks performed continuously by Reach Agent.
          </p>
        </div>
      </div>

      {/* Timeline List */}
      <div className="p-5">
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
          {actions.map((act) => (
            <div key={act.id} className="relative flex items-start justify-between gap-4 group">
              {/* Dot Icon */}
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-white border-2 border-[#2563EB] flex items-center justify-center shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-xs text-[#111827] group-hover:text-[#2563EB] transition-colors">
                    {act.title}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-[#6B7280] font-medium">
                    {act.actionType}
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                  {act.details}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-[#6B7280] shrink-0 font-medium">
                <Clock className="w-3 h-3 text-[#6B7280]" />
                <span>{act.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


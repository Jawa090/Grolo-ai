'use client';

import React from 'react';
import { CheckCircle2, Clock, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface AIAnalysisStatusProps {
  isScanning: boolean;
}

export const AIAnalysisStatus: React.FC<AIAnalysisStatusProps> = ({ isScanning }) => {
  const scanSteps = [
    {
      id: 'website-crawled',
      label: 'Website Crawled',
      description: '24 URLs parsed & asset DOM inspected',
      status: 'Finished',
      time: '12m ago',
    },
    {
      id: 'seo-audited',
      label: 'SEO Audited',
      description: 'Core Web Vitals & meta schema evaluated',
      status: 'Finished',
      time: '12m ago',
    },
    {
      id: 'gbp-checked',
      label: 'Google Profile Checked',
      description: 'Review velocity & NAP accuracy synced',
      status: 'Finished',
      time: '10m ago',
    },
    {
      id: 'competitor-scan',
      label: 'Competitor Scan',
      description: 'Top 5 local competitors benchmarked',
      status: 'Finished',
      time: '8m ago',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-2xs font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
          <h3 className="text-sm font-bold text-[#111827] tracking-tight">Latest AI Scan</h3>
          <span className="text-xs text-[#6B7280] font-normal">
            (Autonomous Agent Audit #1,402)
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Clock className="w-3.5 h-3.5 text-[#6B7280]" />
          <span>Scan Completed: <strong className="text-[#111827] font-semibold">12 minutes ago</strong></span>
        </div>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {scanSteps.map((step, idx) => (
          <div
            key={step.id}
            className={`p-3.5 rounded-lg border transition-all ${
              isScanning
                ? 'bg-blue-50/50 border-blue-200 animate-pulse-subtle'
                : 'bg-[#F8FAFC] border-[#E5E7EB] hover:bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#111827]">{step.label}</span>
              <div className="flex items-center gap-1 text-[#16A34A] text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span className="text-[11px]">{isScanning ? 'Scanning...' : step.status}</span>
              </div>
            </div>
            <p className="text-[11px] text-[#6B7280] leading-snug">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


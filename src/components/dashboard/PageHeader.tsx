'use client';

import React from 'react';
import { Sparkles, Download, Share2, RefreshCw, Layers } from 'lucide-react';

interface PageHeaderProps {
  onRunScan: () => void;
  isScanning: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ onRunScan, isScanning }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Reach Agent</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-semibold">
            <Sparkles className="w-3 h-3" /> Autonomous Active
          </span>
        </div>
        <p className="text-sm text-[#6B7280] mt-1 font-normal">
          Improve local visibility, Google Business performance and SEO rankings.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => alert('Exporting PDF executive report...')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] hover:bg-gray-50 text-xs font-medium transition-colors shadow-2xs"
        >
          <Download className="w-3.5 h-3.5 text-[#6B7280]" />
          <span>Export Report</span>
        </button>

        <button
          onClick={() => alert('Sharing read-only client dashboard link copied!')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] hover:bg-gray-50 text-xs font-medium transition-colors shadow-2xs"
        >
          <Share2 className="w-3.5 h-3.5 text-[#6B7280]" />
          <span>Share</span>
        </button>

        <button
          onClick={onRunScan}
          disabled={isScanning}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2563EB] text-white hover:bg-blue-700 text-xs font-medium transition-all shadow-sm active:scale-98 ${
            isScanning ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning Website...' : 'Run Full AI Scan'}</span>
        </button>
      </div>
    </div>
  );
};


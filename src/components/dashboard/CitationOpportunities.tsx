'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  PlusCircle,
  RefreshCw,
  Globe,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { CitationItem } from '../../types';

interface CitationOpportunitiesProps {
  citations: CitationItem[];
}

export const CitationOpportunities: React.FC<CitationOpportunitiesProps> = ({ citations }) => {
  const [syncedMap, setSyncedMap] = useState<Record<string, boolean>>({});

  const handleSync = (id: string) => {
    setSyncedMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs overflow-hidden font-sans">
      {/* Header */}
      <div className="p-5 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#111827] tracking-tight">Citation Opportunities</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200">
              5/6 Sync Active
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-0.5">
            NAP (Name, Address, Phone) directory consistency across major local business aggregators.
          </p>
        </div>

        <button
          onClick={() => alert('Syncing all 6 business directories across Apple, Bing, and Yelp...')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] hover:bg-gray-50 text-xs font-semibold transition-colors shadow-2xs self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#6B7280]" />
          <span>Sync All Directories</span>
        </button>
      </div>

      {/* Directories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {citations.map((item) => {
          const isConnected = item.status === 'Connected' || syncedMap[item.id];
          const isPending = item.status === 'Pending' && !syncedMap[item.id];
          const isMissing = item.status === 'Missing' && !syncedMap[item.id];

          return (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-[#E5E7EB] bg-white hover:bg-gray-50/50 hover:border-gray-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-xs text-[#111827]">
                      {item.logo}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#111827]">{item.directoryName}</h4>
                      <p className="text-[11px] text-[#6B7280]">{item.lastSynced}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isConnected
                        ? 'bg-emerald-50 text-[#16A34A] border border-emerald-200'
                        : isPending
                        ? 'bg-amber-50 text-[#F59E0B] border border-amber-200'
                        : 'bg-red-50 text-[#DC2626] border border-red-200'
                    }`}
                  >
                    {isConnected ? 'Connected' : isPending ? 'Pending' : 'Missing'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs mt-2">
                <span className="text-[#6B7280] text-[11px]">
                  Match Accuracy: <strong className="text-[#111827] font-semibold">{isConnected ? '100%' : '84%'}</strong>
                </span>

                {!isConnected ? (
                  <button
                    onClick={() => handleSync(item.id)}
                    className="inline-flex items-center gap-1 text-[#2563EB] hover:underline font-semibold text-xs"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Connect Directory</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-[#16A34A] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


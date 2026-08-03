'use client';

import React, { useState } from 'react';
import { Building2, MapPin, CheckCircle2, Globe, RefreshCw, Link2, Search, AlertCircle } from 'lucide-react';
import { BusinessProfile } from '../../types';

interface BusinessSelectorProps {
  currentBusiness: BusinessProfile;
  onAnalyzeAgain: (url?: string) => void;
  isScanning: boolean;
}

export const BusinessSelector: React.FC<BusinessSelectorProps> = ({
  currentBusiness,
  onAnalyzeAgain,
  isScanning,
}) => {
  const [websiteUrl, setWebsiteUrl] = useState('https://apexplumbingseattle.com');
  const [urlError, setUrlError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isValidUrl = (url: string) => {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleAnalyze = () => {
    const trimmed = websiteUrl.trim();
    if (!trimmed) {
      setUrlError('Please enter a website URL to analyze.');
      return;
    }
    const normalized = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
    if (!isValidUrl(normalized)) {
      setUrlError('Please enter a valid URL (e.g. https://yourbusiness.com)');
      return;
    }
    setUrlError('');
    onAnalyzeAgain(normalized);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAnalyze();
  };

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xs mb-6 font-sans overflow-hidden">
      {/* Top Row: Business Info */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 border-b border-[#E5E7EB]">
        {/* Left: Business Identity */}
        <div className="flex items-start md:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold shadow-sm shrink-0">
            <Building2 className="w-5 h-5 text-white" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-bold text-[#111827] tracking-tight">
                {currentBusiness.name}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-[#111827] border border-gray-200">
                {currentBusiness.industry}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3 h-3" />
                {currentBusiness.location}
              </span>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span>
                Last scan: <strong className="text-[#111827] font-medium">{currentBusiness.lastScanned}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Connection Status Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-[#16A34A] border border-emerald-200 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Google Business</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-[#16A34A] border border-emerald-200 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5" />
            <span>Website Connected</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Website URL Input + Analyze Button */}
      <div className="p-4 bg-[#F8FAFC] flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Label */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] shrink-0">
          <Link2 className="w-3.5 h-3.5" />
          <span>Website to Analyze</span>
        </div>

        {/* URL Input Field */}
        <div className="flex-1 w-full sm:w-auto flex flex-col gap-1">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border bg-white text-sm transition-all ${
              urlError
                ? 'border-[#DC2626] ring-1 ring-red-200'
                : isFocused
                ? 'border-[#2563EB] ring-1 ring-blue-200'
                : 'border-[#E5E7EB] hover:border-gray-300'
            }`}
          >
            <Globe className="w-4 h-4 text-[#6B7280] shrink-0" />
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => {
                setWebsiteUrl(e.target.value);
                if (urlError) setUrlError('');
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="https://yourbusiness.com"
              className="flex-1 text-[#111827] bg-transparent focus:outline-none text-xs font-medium placeholder-[#6B7280] min-w-0 w-full sm:w-72 md:w-96"
              disabled={isScanning}
            />
            {websiteUrl && !isScanning && (
              <button
                onClick={() => { setWebsiteUrl(''); setUrlError(''); }}
                className="text-[#6B7280] hover:text-[#111827] text-xs shrink-0"
                title="Clear URL"
              >
                ✕
              </button>
            )}
          </div>

          {urlError && (
            <p className="text-[11px] text-[#DC2626] font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {urlError}
            </p>
          )}
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={isScanning}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2563EB] text-white hover:bg-blue-700 text-xs font-semibold transition-all shadow-xs active:scale-98 disabled:opacity-60 shrink-0 whitespace-nowrap"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Analyzing...' : 'Analyze Website'}</span>
        </button>
      </div>
    </div>
  );
};

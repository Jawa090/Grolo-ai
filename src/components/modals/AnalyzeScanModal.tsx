'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Loader2, RefreshCw, X, ShieldCheck } from 'lucide-react';

interface AnalyzeScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  websiteUrl?: string;
}

export const AnalyzeScanModal: React.FC<AnalyzeScanModalProps> = ({ isOpen, onClose, websiteUrl = 'https://yourbusiness.com' }) => {
  const domain = (() => { try { return new URL(websiteUrl).hostname; } catch { return websiteUrl; } })();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Crawling Apex Plumbing Website', detail: 'Parsing HTML DOM, sitemaps & Core Web Vitals LCP...' },
    { title: 'Auditing On-Page SEO & Metadata', detail: 'Checking Meta Titles, H1 tags, & JSON-LD schemas...' },
    { title: 'Scanning Google Business Profile', detail: 'Verifying NAP accuracy, rating velocity & geo grid...' },
    { title: 'Benchmarking Top 5 Competitors', detail: 'Calculating keyword gap analysis in Seattle...' },
    { title: 'Finalizing Reach Score & Recommendations', detail: 'Generating real-time action items...' },
  ];

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isComplete = currentStep === steps.length - 1;
  const progressPercent = Math.round(((currentStep + 1) / steps.length) * 100);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 font-sans animate-fadeIn">
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#111827]">Autonomous Reach Agent Scan</h3>
              <p className="text-xs text-[#6B7280]">Live analysis in progress for Apex Plumbing & HVAC</p>
            </div>
          </div>
          {isComplete && (
            <button onClick={onClose} className="p-1 text-[#6B7280] hover:text-[#111827] rounded-md">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#111827] mb-2">
              <span>Overall Scan Progress</span>
              <span className="text-[#2563EB]">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#2563EB] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Steps checklist */}
          <div className="space-y-3.5 divide-y divide-gray-100">
            {steps.map((step, idx) => {
              const isFinished = idx < currentStep || isComplete;
              const isCurrent = idx === currentStep && !isComplete;

              return (
                <div key={idx} className="pt-3 first:pt-0 flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isFinished ? (
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-[#2563EB] animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                    )}
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${isFinished || isCurrent ? 'text-[#111827]' : 'text-gray-400'}`}>
                      {step.title}
                    </p>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">{step.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8FAFC] border-t border-[#E5E7EB] flex items-center justify-between">
          <span className="text-xs text-[#6B7280]">
            {isComplete ? 'Scan finished successfully!' : 'Please wait while AI gathers data...'}
          </span>

          <button
            onClick={onClose}
            disabled={!isComplete}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              isComplete
                ? 'bg-[#2563EB] text-white hover:bg-blue-700 shadow-xs'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isComplete ? 'View Updated Dashboard' : 'Processing...'}
          </button>
        </div>
      </div>
    </div>
  );
};


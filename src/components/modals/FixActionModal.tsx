'use client';

import React, { useState } from 'react';
import { Sparkles, Code2, CheckCircle2, X, Wrench, ArrowRight, Zap, Copy, Check } from 'lucide-react';
import { SEOHealthItem } from '../../types';

interface FixActionModalProps {
  item: SEOHealthItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmFix: (item: SEOHealthItem) => void;
}

export const FixActionModal: React.FC<FixActionModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirmFix,
}) => {
  const [copied, setCopied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  if (!isOpen || !item) return null;

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setIsApplied(true);
      onConfirmFix(item);
    }, 1000);
  };

  const handleCopyCode = () => {
    if (item.codeSnippet) {
      navigator.clipboard.writeText(item.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 font-sans animate-fadeIn">
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl w-full max-w-xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#111827]">{item.title} â€” AI Auto-Fix</h3>
              <p className="text-xs text-[#6B7280]">Technical SEO Resolution Assistant</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-[#6B7280] hover:text-[#111827] rounded-md">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-4">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-xs font-semibold text-[#111827] block mb-1">Audit Findings:</span>
            <p className="text-xs text-[#6B7280] leading-relaxed">{item.description}</p>
          </div>

          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
            <span className="text-xs font-semibold text-[#2563EB] block mb-1">Recommended Solution:</span>
            <p className="text-xs text-[#111827] leading-relaxed">{item.recommendation}</p>
          </div>

          {item.codeSnippet && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#111827] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[#2563EB]" /> Generated Code Snippet / Tag
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] text-[#2563EB] hover:underline font-medium"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-lg bg-[#111827] text-emerald-400 font-mono text-[11px] overflow-x-auto border border-gray-800 leading-normal">
                {item.codeSnippet}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8FAFC] border-t border-[#E5E7EB] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] hover:bg-gray-50 text-xs font-medium"
          >
            Close
          </button>

          {isApplied ? (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-100 text-[#16A34A] text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" /> Applied to Website
            </span>
          ) : (
            <button
              onClick={handleApply}
              disabled={isApplying}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2563EB] text-white hover:bg-blue-700 text-xs font-semibold shadow-xs disabled:opacity-75"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{isApplying ? 'Deploying Changes...' : 'Deploy Fix Automatically'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


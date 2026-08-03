'use client';

import React, { useEffect, useState } from 'react';
import { Search, Sparkles, X, ArrowRight, Building2, FileText, Settings, Key, Command } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { label: 'Reach Agent â€” Overview', cat: 'Navigation', icon: Sparkles },
    { label: 'Keyword Rankings â€” Emergency Plumber', cat: 'Keywords', icon: Search },
    { label: 'SEO Health â€” Schema Audit', cat: 'Audit', icon: FileText },
    { label: 'Apex Plumbing & HVAC', cat: 'Organization', icon: Building2 },
    { label: 'API Keys & Webhooks', cat: 'Settings', icon: Key },
  ];

  const filteredLinks = quickLinks.filter((l) =>
    l.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-start justify-center pt-24 px-4 font-sans animate-fadeIn">
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xl w-full max-w-xl overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b border-[#E5E7EB] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#6B7280]" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm text-[#111827] placeholder-[#6B7280] focus:outline-none bg-transparent"
          />
          <button onClick={onClose} className="p-1 text-[#6B7280] hover:text-[#111827] rounded-md">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-2 max-h-80 overflow-y-auto divide-y divide-gray-100">
          <div className="px-3 py-1 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">
            Quick Actions & Suggestions
          </div>
          {filteredLinks.length > 0 ? (
            filteredLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100/80 cursor-pointer transition-colors text-xs"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#2563EB]" />
                    <span className="font-medium text-[#111827]">{item.label}</span>
                  </div>
                  <span className="text-[10px] text-[#6B7280] bg-gray-100 px-2 py-0.5 rounded font-semibold">
                    {item.cat}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs text-[#6B7280]">
              No matching commands found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F8FAFC] border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#6B7280]">
          <div className="flex items-center gap-3">
            <span>
              Press <kbd className="bg-white border border-[#E5E7EB] px-1.5 py-0.5 rounded text-[#111827]">ESC</kbd> to exit
            </span>
          </div>
          <span className="font-semibold text-[#2563EB]">Grolo Command palette v2.4</span>
        </div>
      </div>
    </div>
  );
};


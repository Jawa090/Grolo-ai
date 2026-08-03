'use client';

import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { PageHeader } from '../components/dashboard/PageHeader';
import { TopKPICards } from '../components/dashboard/TopKPICards';
import { BusinessSelector } from '../components/dashboard/BusinessSelector';
import { AIAnalysisStatus } from '../components/dashboard/AIAnalysisStatus';
import { KeywordRankingsSection } from '../components/dashboard/KeywordRankingsSection';
import { SEOHealthChecklist } from '../components/dashboard/SEOHealthChecklist';
import { AIRecommendations } from '../components/dashboard/AIRecommendations';
import { GoogleBusinessProfile } from '../components/dashboard/GoogleBusinessProfile';
import { LocalVisibilityHeatmap } from '../components/dashboard/LocalVisibilityHeatmap';
import { CitationOpportunities } from '../components/dashboard/CitationOpportunities';
import { RecentAIActions } from '../components/dashboard/RecentAIActions';

import { SearchModal } from '../components/modals/SearchModal';
import { AnalyzeScanModal } from '../components/modals/AnalyzeScanModal';
import { FixActionModal } from '../components/modals/FixActionModal';

import {
  mockBusinessProfiles,
  mockKeywords,
  mockSEOHealthItems,
  mockAIRecommendations,
  mockCitations,
  mockAIActions,
} from '../data/mockData';
import { SEOHealthItem, AIRecommendationItem } from '../types';

export default function GroloDashboard() {
  const [activeTab, setActiveTab] = useState('reach-agent');
  const [currentBusiness, setCurrentBusiness] = useState(mockBusinessProfiles[0]);

  // Modals state
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [fixModalOpen, setFixModalOpen] = useState(false);
  const [selectedHealthItem, setSelectedHealthItem] = useState<SEOHealthItem | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [analyzeUrl, setAnalyzeUrl] = useState('https://apexplumbingseattle.com');
  const [healthItems, setHealthItems] = useState(mockSEOHealthItems);
  const [recommendations, setRecommendations] = useState(mockAIRecommendations);
  const [actionsLog, setActionsLog] = useState(mockAIActions);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRunScan = (url?: any) => {
    if (typeof url === 'string') {
      setAnalyzeUrl(url);
    }
    setIsScanning(true);
    setScanModalOpen(true);
  };

  const handleFixHealthItem = (item: SEOHealthItem) => {
    setSelectedHealthItem(item);
    setFixModalOpen(true);
  };

  const handleConfirmFixHealth = (item: SEOHealthItem) => {
    setHealthItems((prev) =>
      prev.map((h) =>
        h.id === item.id ? { ...h, status: 'passed', score: '100/100' } : h
      )
    );
    showToast(`Success: ${item.title} auto-fix deployed to website.`);
  };

  const handleFixRecommendation = (rec: AIRecommendationItem) => {
    const newAction = {
      id: `act-${Date.now()}`,
      title: `${rec.title} Fixed`,
      actionType: 'Meta Generated' as const,
      timestamp: 'Just now',
      details: rec.recommendedSolution,
      status: 'Completed' as const,
    };
    setActionsLog((prev) => [newAction, ...prev]);
    showToast(`Applied Fix: ${rec.title} deployed automatically.`);
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-[#111827] font-sans antialiased">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#111827] text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-2.5 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Sidebar (280px) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header (72px) */}
        <Header onOpenSearch={() => setSearchModalOpen(true)} />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto">
          {/* Page Title & Subtitle */}
          <PageHeader onRunScan={handleRunScan} isScanning={isScanning} />

          {/* Top 4 KPI Cards */}
          <TopKPICards />

          {/* Business Selector Card */}
          <BusinessSelector
            currentBusiness={currentBusiness}
            onAnalyzeAgain={handleRunScan}
            isScanning={isScanning}
          />

          {/* AI Analysis Status Card */}
          <AIAnalysisStatus isScanning={isScanning} />

          {/* Main Two Column Grid (Left 65%, Right 35%) — content flows naturally, no empty gaps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (Col Span 7 / 65%) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Section 1: Keyword Rankings Table + Recharts Line Chart */}
              <KeywordRankingsSection keywords={mockKeywords} />

              {/* Section 2: SEO Health Checklist */}
              <SEOHealthChecklist
                items={healthItems}
                onFixItem={handleFixHealthItem}
              />

              {/* Section 3: Citation Opportunities (flows directly below checklist) */}
              <CitationOpportunities citations={mockCitations} />
            </div>

            {/* Right Column (Col Span 5 / 35%) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Section 1: AI Recommendations List */}
              <AIRecommendations
                recommendations={recommendations}
                onFixRecommendation={handleFixRecommendation}
              />

              {/* Section 2: Google Business Profile */}
              <GoogleBusinessProfile />

              {/* Section 3: Local Visibility Heat Map */}
              <LocalVisibilityHeatmap />

              {/* Section 4: Recent AI Actions Timeline */}
              <RecentAIActions actions={actionsLog} />
            </div>
          </div>
        </main>
      </div>

      {/* Interactive Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      <AnalyzeScanModal
        isOpen={scanModalOpen}
        websiteUrl={analyzeUrl}
        onClose={() => {
          setScanModalOpen(false);
          setIsScanning(false);
          showToast('Full AI scan complete: Dashboard updated!');
        }}
      />

      <FixActionModal
        item={selectedHealthItem}
        isOpen={fixModalOpen}
        onClose={() => {
          setFixModalOpen(false);
          setSelectedHealthItem(null);
        }}
        onConfirmFix={handleConfirmFixHealth}
      />
    </div>
  );
}

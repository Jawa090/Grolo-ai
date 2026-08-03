export interface KeywordItem {
  id: string;
  keyword: string;
  currentPosition: number;
  previousPosition: number;
  trend: 'up' | 'down' | 'neutral';
  trendValue: number;
  monthlyTraffic: number;
  difficulty: 'Low' | 'Medium' | 'High';
  difficultyScore: number;
  status: 'Top 3' | 'Top 10' | 'Opportunity' | 'Declining';
  searchIntent: 'Commercial' | 'Transactional' | 'Informational';
}

export interface SEOHealthItem {
  id: string;
  title: string;
  category: string;
  status: 'passed' | 'warning' | 'failed';
  score: string;
  description: string;
  recommendation: string;
  codeSnippet?: string;
}

export interface AIRecommendationItem {
  id: string;
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  problem: string;
  whyItMatters: string;
  recommendedSolution: string;
  estimatedImpact: string;
  category: 'Technical SEO' | 'Reputation' | 'Performance' | 'Content';
  fixed?: boolean;
}

export interface CitationItem {
  id: string;
  directoryName: string;
  logo: string;
  status: 'Connected' | 'Pending' | 'Missing';
  matchScore: number;
  lastSynced: string;
}

export interface AIActionItem {
  id: string;
  title: string;
  actionType: 'Meta Generated' | 'Schema Added' | 'GBP Optimized' | 'Keyword Opportunity Found' | 'Review Campaign Suggested';
  timestamp: string;
  details: string;
  status: 'Completed' | 'In Progress';
}

export interface LocalAreaVisibility {
  id: string;
  name: string;
  rank: number;
  status: 'High Visibility' | 'Good Visibility' | 'Medium Visibility' | 'Needs Boost' | 'Opportunity Area';
  score: number;
  gridCoordinate: string;
  colorHex: string;
}

export interface BusinessProfile {
  id: string;
  name: string;
  industry: string;
  location: string;
  address: string;
  gbpConnected: boolean;
  websiteConnected: boolean;
  lastScanned: string;
  gbpRating: number;
  reviewCount: number;
}

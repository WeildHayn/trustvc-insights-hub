// Mock data for TrustVC Ecosystem Dashboard

export type FilterType = 'all' | 'verifiable-docs' | 'etr';
export type TimeRange = '1M' | '3M' | '6M' | '1Y' | '5Y' | 'ALL';
export type MapTimeRange = '1D' | '5D' | '1M' | '6M' | '1Y';

// Activity Overview - Issuance vs Verification
export const getActivityData = (filter: FilterType, timeRange: TimeRange) => {
  const multiplier = filter === 'verifiable-docs' ? 0.7 : filter === 'etr' ? 0.3 : 1;

  // For 1M, show daily granularity (last 30 days)
  if (timeRange === '1M') {
    const dailyData = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      dailyData.push({
        month: `${d.getMonth() + 1}/${d.getDate()}`,
        issuance: Math.round((120 + Math.random() * 180) * multiplier),
        verification: Math.round((80 + Math.random() * 220) * multiplier),
      });
    }
    return dailyData;
  }

  const baseData = [
    { month: 'Jan', issuance: 4000, verification: 2400 },
    { month: 'Feb', issuance: 3000, verification: 1398 },
    { month: 'Mar', issuance: 2000, verification: 9800 },
    { month: 'Apr', issuance: 2780, verification: 3908 },
    { month: 'May', issuance: 1890, verification: 4800 },
    { month: 'Jun', issuance: 2390, verification: 3800 },
    { month: 'Jul', issuance: 3490, verification: 4300 },
    { month: 'Aug', issuance: 4200, verification: 5100 },
    { month: 'Sep', issuance: 3800, verification: 4700 },
    { month: 'Oct', issuance: 4100, verification: 5200 },
    { month: 'Nov', issuance: 4500, verification: 5800 },
    { month: 'Dec', issuance: 5000, verification: 6200 },
  ];

  const rangeMap: Record<TimeRange, number> = {
    '1M': 1,
    '3M': 3,
    '6M': 6,
    '1Y': 12,
    '5Y': 12,
    'ALL': 12,
  };

  return baseData.slice(-rangeMap[timeRange]).map(d => ({
    ...d,
    issuance: Math.round(d.issuance * multiplier),
    verification: Math.round(d.verification * multiplier),
  }));
};

// Active Integrations MoM
export const getIntegrationsData = (filter: FilterType, timeRange: TimeRange) => {
  const multiplier = filter === 'verifiable-docs' ? 0.6 : filter === 'etr' ? 0.4 : 1;

  // For 1M, show daily granularity
  if (timeRange === '1M') {
    const dailyData = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      dailyData.push({
        month: `${d.getMonth() + 1}/${d.getDate()}`,
        integrations: Math.round((40 + Math.random() * 30) * multiplier),
        growth: Math.round((Math.random() - 0.3) * 20),
      });
    }
    return dailyData;
  }

  const baseData = [
    { month: 'Jan', integrations: 45, growth: 12 },
    { month: 'Feb', integrations: 52, growth: 15 },
    { month: 'Mar', integrations: 48, growth: -8 },
    { month: 'Apr', integrations: 61, growth: 27 },
    { month: 'May', integrations: 55, growth: -10 },
    { month: 'Jun', integrations: 67, growth: 22 },
    { month: 'Jul', integrations: 72, growth: 7 },
    { month: 'Aug', integrations: 78, growth: 8 },
    { month: 'Sep', integrations: 85, growth: 9 },
    { month: 'Oct', integrations: 92, growth: 8 },
    { month: 'Nov', integrations: 98, growth: 7 },
    { month: 'Dec', integrations: 105, growth: 7 },
  ];

  const rangeMap: Record<TimeRange, number> = {
    '1M': 1,
    '3M': 3,
    '6M': 6,
    '1Y': 12,
    '5Y': 12,
    'ALL': 12,
  };

  return baseData.slice(-rangeMap[timeRange]).map(d => ({
    ...d,
    integrations: Math.round(d.integrations * multiplier),
  }));
};

// Cryptosuite Distribution
export const getCryptosuiteData = (filter: FilterType) => {
  if (filter === 'verifiable-docs') {
    return {
      issuance: [
        { name: 'Ed25519', value: 45, color: 'hsl(var(--chart-1))' },
        { name: 'ES256K', value: 30, color: 'hsl(var(--chart-2))' },
        { name: 'RSA', value: 25, color: 'hsl(var(--chart-3))' },
      ],
      verification: [
        { name: 'Ed25519', value: 50, color: 'hsl(var(--chart-1))' },
        { name: 'ES256K', value: 35, color: 'hsl(var(--chart-2))' },
        { name: 'RSA', value: 15, color: 'hsl(var(--chart-3))' },
      ],
    };
  }
  if (filter === 'etr') {
    return {
      issuance: [
        { name: 'Ed25519', value: 60, color: 'hsl(var(--chart-1))' },
        { name: 'ES256K', value: 25, color: 'hsl(var(--chart-2))' },
        { name: 'RSA', value: 15, color: 'hsl(var(--chart-3))' },
      ],
      verification: [
        { name: 'Ed25519', value: 55, color: 'hsl(var(--chart-1))' },
        { name: 'ES256K', value: 30, color: 'hsl(var(--chart-2))' },
        { name: 'RSA', value: 15, color: 'hsl(var(--chart-3))' },
      ],
    };
  }
  return {
    issuance: [
      { name: 'Ed25519', value: 40, color: 'hsl(var(--chart-1))' },
      { name: 'ES256K', value: 35, color: 'hsl(var(--chart-2))' },
      { name: 'RSA', value: 25, color: 'hsl(var(--chart-3))' },
    ],
    verification: [
      { name: 'Ed25519', value: 45, color: 'hsl(var(--chart-1))' },
      { name: 'ES256K', value: 40, color: 'hsl(var(--chart-2))' },
      { name: 'RSA', value: 15, color: 'hsl(var(--chart-3))' },
    ],
  };
};

// DID Method Distribution
export const getDidMethodData = (filter: FilterType) => {
  if (filter === 'verifiable-docs') {
    return {
      issuance: [
        { name: 'did:web', value: 50, color: 'hsl(var(--chart-4))' },
        { name: 'did:key', value: 30, color: 'hsl(var(--chart-5))' },
        { name: 'did:ethr', value: 20, color: 'hsl(var(--chart-1))' },
      ],
      verification: [
        { name: 'did:web', value: 45, color: 'hsl(var(--chart-4))' },
        { name: 'did:key', value: 35, color: 'hsl(var(--chart-5))' },
        { name: 'did:ethr', value: 20, color: 'hsl(var(--chart-1))' },
      ],
    };
  }
  if (filter === 'etr') {
    return {
      issuance: [
        { name: 'did:web', value: 35, color: 'hsl(var(--chart-4))' },
        { name: 'did:key', value: 40, color: 'hsl(var(--chart-5))' },
        { name: 'did:ethr', value: 25, color: 'hsl(var(--chart-1))' },
      ],
      verification: [
        { name: 'did:web', value: 30, color: 'hsl(var(--chart-4))' },
        { name: 'did:key', value: 45, color: 'hsl(var(--chart-5))' },
        { name: 'did:ethr', value: 25, color: 'hsl(var(--chart-1))' },
      ],
    };
  }
  return {
    issuance: [
      { name: 'did:web', value: 40, color: 'hsl(var(--chart-4))' },
      { name: 'did:key', value: 35, color: 'hsl(var(--chart-5))' },
      { name: 'did:ethr', value: 25, color: 'hsl(var(--chart-1))' },
    ],
    verification: [
      { name: 'did:web', value: 38, color: 'hsl(var(--chart-4))' },
      { name: 'did:key', value: 42, color: 'hsl(var(--chart-5))' },
      { name: 'did:ethr', value: 20, color: 'hsl(var(--chart-1))' },
    ],
  };
};

// World Map Activity Data
export const getMapActivityData = (filter: FilterType, timeRange: MapTimeRange) => {
  const baseData = [
    { country: 'USA', coordinates: [-95.7129, 37.0902] as [number, number], issuance: 1200, verification: 800 },
    { country: 'UK', coordinates: [-3.4360, 55.3781] as [number, number], issuance: 800, verification: 600 },
    { country: 'Germany', coordinates: [10.4515, 51.1657] as [number, number], issuance: 600, verification: 450 },
    { country: 'Singapore', coordinates: [103.8198, 1.3521] as [number, number], issuance: 500, verification: 400 },
    { country: 'Japan', coordinates: [138.2529, 36.2048] as [number, number], issuance: 450, verification: 350 },
    { country: 'Australia', coordinates: [133.7751, -25.2744] as [number, number], issuance: 300, verification: 250 },
    { country: 'Brazil', coordinates: [-51.9253, -14.2350] as [number, number], issuance: 250, verification: 180 },
    { country: 'India', coordinates: [78.9629, 20.5937] as [number, number], issuance: 400, verification: 300 },
    { country: 'France', coordinates: [2.2137, 46.2276] as [number, number], issuance: 350, verification: 280 },
    { country: 'Canada', coordinates: [-106.3468, 56.1304] as [number, number], issuance: 280, verification: 220 },
  ];

  const multiplier = filter === 'verifiable-docs' ? 0.7 : filter === 'etr' ? 0.3 : 1;
  const timeMultiplier: Record<MapTimeRange, number> = {
    '1D': 0.1,
    '5D': 0.3,
    '1M': 0.5,
    '6M': 0.8,
    '1Y': 1,
  };

  return baseData.map(d => ({
    ...d,
    issuance: Math.round(d.issuance * multiplier * timeMultiplier[timeRange]),
    verification: Math.round(d.verification * multiplier * timeMultiplier[timeRange]),
  }));
};

// Version Distribution Data
export const getVersionData = (filter: FilterType, dateRange?: { from: Date; to: Date }) => {
  const baseData = [
    { version: 'v2.4.1', instances: 1250, releaseDate: '2025-12-01', status: 'current' },
    { version: 'v2.4.0', instances: 890, releaseDate: '2025-10-15', status: 'stable' },
    { version: 'v2.3.2', instances: 650, releaseDate: '2025-08-20', status: 'stable' },
    { version: 'v2.3.1', instances: 420, releaseDate: '2025-06-10', status: 'deprecated' },
    { version: 'v2.3.0', instances: 280, releaseDate: '2025-04-05', status: 'deprecated' },
    { version: 'v2.2.0', instances: 150, releaseDate: '2025-01-20', status: 'legacy' },
    { version: 'v2.1.0', instances: 85, releaseDate: '2024-10-01', status: 'legacy' },
    { version: 'v2.0.0', instances: 45, releaseDate: '2024-06-15', status: 'legacy' },
  ];

  const multiplier = filter === 'verifiable-docs' ? 0.6 : filter === 'etr' ? 0.4 : 1;

  let filteredData = baseData;
  if (dateRange) {
    filteredData = baseData.filter(d => {
      const releaseDate = new Date(d.releaseDate);
      return releaseDate >= dateRange.from && releaseDate <= dateRange.to;
    });
  }

  return filteredData.map(d => ({
    ...d,
    instances: Math.round(d.instances * multiplier),
  }));
};

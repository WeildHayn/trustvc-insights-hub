import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { ActivityOverview } from "@/components/dashboard/ActivityOverview";
import { MarketIntelligence } from "@/components/dashboard/MarketIntelligence";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { VersionDistribution } from "@/components/dashboard/VersionDistribution";
import { Separator } from "@/components/ui/separator";
import { type FilterType } from "@/lib/mockData";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back to TrustVC Ecosystem Dashboard
              </h1>
              <p className="mt-2 text-muted-foreground">
                Monitor ecosystem activity, usage distribution, and live system pulse
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Sticky Global Filters */}
      <GlobalFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Section 1: Activity Overview */}
        <ActivityOverview filter={activeFilter} />
        
        <Separator />
        
        {/* Section 2: Market Intelligence */}
        <MarketIntelligence filter={activeFilter} />
        
        <Separator />
        
        {/* Section 3: Activity Heatmap */}
        <ActivityHeatmap filter={activeFilter} />
        
        <Separator />
        
        {/* Section 4: Version Distribution */}
        <VersionDistribution filter={activeFilter} />
      </main>
    </div>
  );
};

export default Dashboard;

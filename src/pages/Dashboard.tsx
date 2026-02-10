import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowUp, ArrowDown } from "lucide-react";
import { GlobalFilters } from "@/components/dashboard/GlobalFilters";
import { ActivityOverview } from "@/components/dashboard/ActivityOverview";
import { MarketIntelligence } from "@/components/dashboard/MarketIntelligence";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { VersionDistribution } from "@/components/dashboard/VersionDistribution";
import { Separator } from "@/components/ui/separator";
import { type FilterType } from "@/lib/mockData";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showVersionBtn, setShowVersionBtn] = useState(false);
  const versionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      if (versionRef.current) {
        const rect = versionRef.current.getBoundingClientRect();
        setShowVersionBtn(rect.top > window.innerHeight);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToVersions = () => versionRef.current?.scrollIntoView({ behavior: 'smooth' });

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
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Global Filters */}
      <GlobalFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        <ActivityOverview filter={activeFilter} />
        <Separator />
        <MarketIntelligence filter={activeFilter} />
        <Separator />
        <ActivityHeatmap filter={activeFilter} />
        <Separator />
        <VersionDistribution ref={versionRef} filter={activeFilter} />
      </main>

      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
        {showVersionBtn && (
          <Button
            size="sm"
            variant="outline"
            className="shadow-lg bg-background"
            onClick={scrollToVersions}
          >
            <ArrowDown className="h-3 w-3 mr-1" />
            Versions
          </Button>
        )}
        {showScrollTop && (
          <Button
            size="icon"
            variant="outline"
            className="shadow-lg bg-background"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

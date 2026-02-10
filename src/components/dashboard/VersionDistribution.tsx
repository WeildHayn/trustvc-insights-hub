import { useState, forwardRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronDown, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { getVersionData, type FilterType } from "@/lib/mockData";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface VersionDistributionProps {
  filter: FilterType;
}

export const VersionDistribution = forwardRef<HTMLElement, VersionDistributionProps>(
  function VersionDistribution({ filter }, ref) {
    const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
      from: undefined,
      to: undefined,
    });
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ v2: true, v1: true });

    const versionData = getVersionData(
      filter,
      dateRange.from && dateRange.to ? { from: dateRange.from, to: dateRange.to } : undefined
    );

    // Group versions by major version
    const grouped = versionData.reduce<Record<string, typeof versionData>>((acc, v) => {
      const major = v.version.match(/^v(\d+)/)?.[0] || 'unknown';
      if (!acc[major]) acc[major] = [];
      acc[major].push(v);
      return acc;
    }, {});

    const latestVersion = versionData[0]?.version;

    const toggleGroup = (key: string) => {
      setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <section ref={ref} className="space-y-4">
        <h2 className="text-xl font-semibold">Version Distribution</h2>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Active Instances by Version
            </CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs">
                  <CalendarIcon className="mr-2 h-3 w-3" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM d, yyyy")
                    )
                  ) : (
                    "All Time"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(grouped)
                .sort(([a], [b]) => b.localeCompare(a))
                .map(([major, versions]) => (
                  <Collapsible
                    key={major}
                    open={openGroups[major] ?? true}
                    onOpenChange={() => toggleGroup(major)}
                  >
                    <CollapsibleTrigger className="flex items-center gap-2 w-full py-2 px-3 rounded-md hover:bg-muted transition-colors text-sm font-semibold">
                      {openGroups[major] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      {major}
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="ml-6 space-y-1">
                        {versions.map((v) => (
                          <div
                            key={v.version}
                            className="flex items-center justify-between py-1.5 px-3 rounded text-sm hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono">{v.version}</span>
                              {v.version === latestVersion && (
                                <Badge variant="default" className="text-[10px] px-1.5 py-0">
                                  Latest
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-muted-foreground">
                              <span>{v.instances.toLocaleString()} instances</span>
                              <span className="text-xs">{format(new Date(v.releaseDate), "MMM d, yyyy")}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }
);

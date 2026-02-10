import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { TimeRangeSelector } from "./TimeRangeSelector";
import { getMapActivityData, type FilterType, type MapTimeRange } from "@/lib/mockData";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ActivityHeatmapProps {
  filter: FilterType;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const mapTimeRanges: MapTimeRange[] = ['1D', '5D', '1M', '6M', '1Y'];

export function ActivityHeatmap({ filter }: ActivityHeatmapProps) {
  const [timeRange, setTimeRange] = useState<MapTimeRange>('1M');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  const activityData = getMapActivityData(filter, timeRange);

  const getMarkerSize = (issuance: number, verification: number) => {
    const total = issuance + verification;
    return Math.min(Math.max(total / 50, 5), 20);
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Activity Heatmap / Ticker</h2>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">
            Global Activity Distribution
          </CardTitle>
          <div className="flex items-center gap-4">
            <TimeRangeSelector
              ranges={mapTimeRanges}
              activeRange={timeRange}
              onRangeChange={setTimeRange}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs">
                  <CalendarIcon className="mr-2 h-3 w-3" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM d, yyyy")
                    )
                  ) : (
                    "Custom Range"
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 overflow-hidden" style={{ maxHeight: 400 }}>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 120,
                  center: [0, 30],
                }}
                width={800}
                height={400}
                style={{ width: '100%', height: '100%' }}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="hsl(var(--muted))"
                        stroke="hsl(var(--border))"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "hsl(var(--muted-foreground)/0.3)", outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {activityData.map((location, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Marker coordinates={location.coordinates}>
                        <circle
                          r={getMarkerSize(location.issuance, location.verification)}
                          fill="hsl(var(--chart-1))"
                          fillOpacity={0.6}
                          stroke="hsl(var(--chart-1))"
                          strokeWidth={1}
                          style={{ cursor: 'pointer' }}
                        />
                        <circle
                          r={getMarkerSize(location.issuance, location.verification) * 0.6}
                          fill="hsl(var(--chart-2))"
                          fillOpacity={0.8}
                          style={{ cursor: 'pointer' }}
                        />
                      </Marker>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <p className="font-medium">{location.country}</p>
                        <p>Issuance: {location.issuance.toLocaleString()}</p>
                        <p>Verification: {location.verification.toLocaleString()}</p>
                        <p className="text-muted-foreground text-xs mt-1">Range: {timeRange}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </ComposableMap>
            </div>
            
            {/* Legend */}
            <div className="flex flex-col gap-2 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[hsl(var(--chart-1))] opacity-60" />
                <span className="text-sm text-muted-foreground">Issuance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[hsl(var(--chart-2))]" />
                <span className="text-sm text-muted-foreground">Verification</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

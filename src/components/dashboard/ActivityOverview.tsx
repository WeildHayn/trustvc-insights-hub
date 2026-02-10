import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TimeRangeSelector } from "./TimeRangeSelector";
import { getActivityData, getIntegrationsData, type FilterType, type TimeRange } from "@/lib/mockData";

interface ActivityOverviewProps {
  filter: FilterType;
}

const timeRanges: TimeRange[] = ['1M', '3M', '6M', '1Y', '5Y', 'ALL'];

export function ActivityOverview({ filter }: ActivityOverviewProps) {
  const [activityTimeRange, setActivityTimeRange] = useState<TimeRange>('1M');
  const [integrationsTimeRange, setIntegrationsTimeRange] = useState<TimeRange>('1M');

  const activityData = getActivityData(filter, activityTimeRange);
  const integrationsData = getIntegrationsData(filter, integrationsTimeRange);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Activity Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Issuance vs Verification Over Time */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Issuance vs Verification Over Time
            </CardTitle>
            <TimeRangeSelector
              ranges={timeRanges}
              activeRange={activityTimeRange}
              onRangeChange={setActivityTimeRange}
            />
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                    formatter={(value: number, name: string) => [value.toLocaleString(), name.charAt(0).toUpperCase() + name.slice(1)]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="issuance"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--chart-1))' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="verification"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--chart-2))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Active Integrations MoM */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Active Integrations MoM
            </CardTitle>
            <TimeRangeSelector
              ranges={timeRanges}
              activeRange={integrationsTimeRange}
              onRangeChange={setIntegrationsTimeRange}
            />
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={integrationsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                    formatter={(value: number, name: string) => [value.toLocaleString(), name.charAt(0).toUpperCase() + name.slice(1)]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  <Bar
                    dataKey="integrations"
                    fill="hsl(var(--chart-3))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

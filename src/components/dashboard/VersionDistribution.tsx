import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { getVersionData, type FilterType } from "@/lib/mockData";

interface VersionDistributionProps {
  filter: FilterType;
}

export function VersionDistribution({ filter }: VersionDistributionProps) {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  const versionData = getVersionData(
    filter,
    dateRange.from && dateRange.to ? { from: dateRange.from, to: dateRange.to } : undefined
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'current':
        return 'default';
      case 'stable':
        return 'secondary';
      case 'deprecated':
        return 'outline';
      case 'legacy':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <section className="space-y-4">
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Version</TableHead>
                <TableHead>Active Instances</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {versionData.map((version) => (
                <TableRow key={version.version}>
                  <TableCell className="font-mono">{version.version}</TableCell>
                  <TableCell>{version.instances.toLocaleString()}</TableCell>
                  <TableCell>{format(new Date(version.releaseDate), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(version.status)}>
                      {version.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}

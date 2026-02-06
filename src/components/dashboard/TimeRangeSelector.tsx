import { Button } from "@/components/ui/button";
import { type TimeRange, type MapTimeRange } from "@/lib/mockData";

type TimeRangeSelectorProps = {
  ranges: readonly TimeRange[];
  activeRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
} | {
  ranges: readonly MapTimeRange[];
  activeRange: MapTimeRange;
  onRangeChange: (range: MapTimeRange) => void;
};

export function TimeRangeSelector({
  ranges,
  activeRange,
  onRangeChange,
}: TimeRangeSelectorProps) {
  return (
    <div className="flex gap-1">
      {ranges.map((range) => (
        <Button
          key={range}
          variant={activeRange === range ? "default" : "ghost"}
          size="sm"
          onClick={() => onRangeChange(range as any)}
          className="text-xs px-2"
        >
          {range}
        </Button>
      ))}
    </div>
  );
}

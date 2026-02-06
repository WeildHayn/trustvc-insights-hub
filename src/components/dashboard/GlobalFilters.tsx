import { Badge } from "@/components/ui/badge";
import { type FilterType } from "@/lib/mockData";

interface GlobalFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function GlobalFilters({ activeFilter, onFilterChange }: GlobalFiltersProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'verifiable-docs', label: 'Verifiable Docs' },
    { value: 'etr', label: 'ETR' },
  ];

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b py-3">
      <div className="container mx-auto px-4">
        <div className="flex gap-2">
          {filters.map((filter) => (
            <Badge
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm transition-colors hover:bg-primary/80"
              onClick={() => onFilterChange(filter.value)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

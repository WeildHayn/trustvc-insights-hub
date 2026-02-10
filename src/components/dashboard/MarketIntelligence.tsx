import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { getCryptosuiteData, getDidMethodData, type FilterType } from "@/lib/mockData";

interface MarketIntelligenceProps {
  filter: FilterType;
}

export function MarketIntelligence({ filter }: MarketIntelligenceProps) {
  const cryptosuiteData = getCryptosuiteData(filter);
  const didMethodData = getDidMethodData(filter);

  const renderPieChart = (data: { name: string; value: number; color: string }[]) => (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={70}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--popover))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            color: 'hsl(var(--popover-foreground))',
          }}
          itemStyle={{
            color: 'hsl(var(--popover-foreground))',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Market Intelligence (Distribution)</h2>
      
      <Card>
        <CardContent className="pt-6">
          {/* Column Headers */}
          <div className="grid grid-cols-[120px_1fr_1fr] gap-4 mb-6">
            <div></div>
            <div className="text-center font-medium">Issuance</div>
            <div className="text-center font-medium">Verification</div>
          </div>

          {/* Row 1 - Cryptosuite */}
          <div className="grid grid-cols-[120px_1fr_1fr] gap-4 mb-8">
            <div className="flex items-center font-medium text-muted-foreground">
              Cryptosuite
            </div>
            <div>{renderPieChart(cryptosuiteData.issuance)}</div>
            <div>{renderPieChart(cryptosuiteData.verification)}</div>
          </div>

          {/* Row 2 - DID Method */}
          <div className="grid grid-cols-[120px_1fr_1fr] gap-4">
            <div className="flex items-center font-medium text-muted-foreground">
              DID Method
            </div>
            <div>{renderPieChart(didMethodData.issuance)}</div>
            <div>{renderPieChart(didMethodData.verification)}</div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

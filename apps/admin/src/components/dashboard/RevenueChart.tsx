import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
type RevenueChartPoint = { day: string; revenue: number };

export const RevenueChart = ({ data }: { data: RevenueChartPoint[] }) => (
  <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-xl p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-bold text-neutral-900">Weekly Revenue</h2>
      <span className="text-xs text-neutral-400">Last 7 days</span>
    </div>
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="day" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#a3a3a3"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `$${v / 1000}k`}
        />
        <Tooltip
          formatter={(value: any) => [`$${value}`, "Revenue"]}
          contentStyle={{ borderRadius: 8, border: "1px solid #e5e5e5" }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#ea580c"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#ea580c" }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
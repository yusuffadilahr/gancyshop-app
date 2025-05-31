import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb", // Tailwind blue-600
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa", // Tailwind blue-400
  },
} satisfies ChartConfig

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

export function ChartDashboard() {
  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%">
        <BarChart data={chartData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="desktop" fill={chartConfig.desktop.color} name={chartConfig.desktop.label} />
          <Bar dataKey="mobile" fill={chartConfig.mobile.color} name={chartConfig.mobile.label} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

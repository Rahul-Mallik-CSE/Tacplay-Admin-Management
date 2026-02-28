/** @format */
"use client";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const weeklyData = [
  { day: "Mon", thisWeek: 1100, lastWeek: 1200 },
  { day: "Tue", thisWeek: 900, lastWeek: 1500 },
  { day: "Wed", thisWeek: 800, lastWeek: 2200 },
  { day: "Thu", thisWeek: 950, lastWeek: 3400 },
  { day: "Fri", thisWeek: 1050, lastWeek: 2800 },
  { day: "Sat", thisWeek: 1200, lastWeek: 3200 },
  { day: "Sun", thisWeek: 1400, lastWeek: 2600 },
  { day: "Mon", thisWeek: 1800, lastWeek: 1800 },
  { day: "Tue", thisWeek: 1600, lastWeek: 1600 },
  { day: "Wed", thisWeek: 1300, lastWeek: 1300 },
];

const monthlyData = [
  { day: "Week 1", thisWeek: 4200, lastWeek: 3800 },
  { day: "Week 2", thisWeek: 5600, lastWeek: 4200 },
  { day: "Week 3", thisWeek: 4800, lastWeek: 5100 },
  { day: "Week 4", thisWeek: 6200, lastWeek: 4700 },
];

interface TooltipPayloadItem {
  color: string;
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-white/10 rounded-lg px-3 py-2 shadow-lg text-xs">
        <p className="text-muted-foreground mb-1 font-medium">{label}</p>
        {payload.map((entry: TooltipPayloadItem, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  const [period, setPeriod] = useState("This Week");
  const data = period === "This Week" ? weeklyData : monthlyData;

  return (
    <div className="bg-card rounded-xl p-4 sm:p-6 border border-white/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-primary text-base font-semibold">Revenue</h3>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>+0.74%</span>
            </div>
          </div>
          <p className="text-primary text-2xl sm:text-3xl font-bold">
            $1864.18
          </p>
        </div>
        <div className="flex items-center gap-4 self-start sm:self-auto">
          {/* Legend */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 rounded-full bg-orange-400 inline-block" />
              This week
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 rounded-full bg-secondary inline-block" />
              Last week
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8 bg-muted border-white/10 text-primary gap-1"
              >
                {period}
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-card border-white/10"
            >
              <DropdownMenuItem
                onClick={() => setPeriod("This Week")}
                className="text-xs cursor-pointer"
              >
                This Week
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setPeriod("This Month")}
                className="text-xs cursor-pointer"
              >
                This Month
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-52 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="thisWeekGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C00069" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#980009" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="lastWeekGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#525273" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#525273" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "#525273", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#525273", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v >= 1000 ? v / 1000 + "k" : v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="lastWeek"
              stroke="#525273"
              strokeWidth={2}
              fill="url(#lastWeekGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#525273" }}
              name="Last week"
            />
            <Area
              type="monotone"
              dataKey="thisWeek"
              stroke="#f97316"
              strokeWidth={2}
              fill="url(#thisWeekGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#f97316" }}
              name="This week"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;

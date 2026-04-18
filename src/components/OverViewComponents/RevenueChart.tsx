/** @format */
"use client";
import React from "react";
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

type RevenueChartPoint = {
  label: string;
  thisPeriodAmount: number;
  lastPeriodAmount: number;
};

type RevenueChartProps = {
  totalRevenue: number;
  changePercentage: number;
  seriesLabel: string;
  comparisonSeriesLabel: string;
  data: RevenueChartPoint[];
};

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

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const RevenueChart = ({
  totalRevenue,
  changePercentage,
  seriesLabel,
  comparisonSeriesLabel,
  data,
}: RevenueChartProps) => {
  const isUp = changePercentage >= 0;

  return (
    <div className="bg-card rounded-xl p-4 sm:p-6 border border-white/5">
      {/* Header */}
      <div className="flex justify-between gap-3 mb-2 md:mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-primary text-base md:text-2xl font-semibold">
              Revenue
            </h3>
            <div
              className={`flex items-center gap-1 text-xs font-medium ${
                isUp ? "text-emerald-400" : "text-red-400"
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              <span>{`${isUp ? "+" : ""}${changePercentage.toFixed(2)}%`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-3 mb-4 md:mb-8">
        <p className="text-primary text-2xl md:text-3xl font-bold">
          {currencyFormatter.format(totalRevenue)}
        </p>
        {/* Legend */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-orange-400 inline-block" />
            {seriesLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-secondary inline-block" />
            {comparisonSeriesLabel}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-52 sm:h-80 md:h-96">
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
              dataKey="label"
              tick={{ fill: "#525273", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#525273", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${compactCurrencyFormatter.format(v)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="lastPeriodAmount"
              stroke="#525273"
              strokeWidth={2}
              fill="url(#lastWeekGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#525273" }}
              name={comparisonSeriesLabel}
            />
            <Area
              type="monotone"
              dataKey="thisPeriodAmount"
              stroke="#f97316"
              strokeWidth={2}
              fill="url(#thisWeekGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#f97316" }}
              name={seriesLabel}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;

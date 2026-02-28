/** @format */
import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  iconBg?: string;
}

const StatCard = ({ title, value, change, icon, iconBg }: StatCardProps) => {
  const isUp = change >= 0;

  return (
    <div className="bg-card rounded-xl p-4 flex items-start justify-between gap-3 border border-white/5">
      <div className="flex flex-col gap-1.5">
        <p className="text-muted-foreground text-xs font-medium">{title}</p>
        <p className="text-primary text-xl sm:text-2xl font-bold">{value}</p>
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            isUp ? "text-emerald-400" : "text-red-400",
          )}
        >
          {isUp ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>
            {Math.abs(change)}% {isUp ? "Up" : "Down"} from past week
          </span>
        </div>
      </div>
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
          iconBg ?? "bg-muted",
        )}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;

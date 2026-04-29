/** @format */

"use client";

import StatCard from "@/components/OverViewComponents/StatCard";
import RevenueChart from "@/components/OverViewComponents/RevenueChart";
import OverviewSkeleton from "@/components/OverViewComponents/OverviewSkeleton";
import { Button } from "@/components/ui/button";
import { DollarSign, User, Users, Crown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setOverviewPeriod } from "@/redux/features/dashboard/dashboardSlice";
import { useGetAdminOverviewQuery } from "@/redux/features/dashboard/dashboardAPI";
import type { DashboardPeriod } from "@/types/DashboardTypes";
import { useTranslation } from "react-i18next";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const toNumber = (value: string | number | undefined) => {
  if (typeof value === "number") {
    return value;
  }

  const parsed = Number.parseFloat(value ?? "0");
  return Number.isNaN(parsed) ? 0 : parsed;
};

export default function Home() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const selectedPeriod = useAppSelector(
    (state) => state.dashboard.selectedPeriod,
  );
  const { data, isLoading, isFetching, isError } =
    useGetAdminOverviewQuery(selectedPeriod);

  if (isLoading && !data) {
    return <OverviewSkeleton />;
  }

  const overview = data?.data;
  const filterOptions = overview?.filter.options ?? [
    { label: t("overview.week"), value: "week" as const },
    { label: t("overview.month"), value: "month" as const },
  ];

  const selectedLabel =
    filterOptions.find((option) => option.value === selectedPeriod)?.label ||
    t("overview.month");

  const chartData =
    overview?.revenue_chart.items.map((item) => ({
      label: item.label,
      thisPeriodAmount: toNumber(item.this_period_amount),
      lastPeriodAmount: toNumber(item.last_period_amount),
    })) ?? [];

  const cards = overview?.cards;

  return (
    <div className="w-full p-3 md:p-4  space-y-6">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8 bg-muted border-white/10 text-primary gap-1"
                disabled={isLoading || isFetching}
              >
                {selectedLabel}
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-card border-white/10"
            >
              {filterOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() =>
                    dispatch(setOverviewPeriod(option.value as DashboardPeriod))
                  }
                  className="text-xs cursor-pointer"
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isError ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {t("overview.failedLoad")}
          </div>
        ) : null}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title={t("overview.totalRevenue")}
            value={
              cards
                ? currencyFormatter.format(toNumber(cards.total_revenue.value))
                : "$0.00"
            }
            change={cards?.total_revenue.change_percentage ?? 0}
            iconBg="bg-chart-1/20"
            icon={<DollarSign className="w-5 h-5 text-chart-1" />}
          />
          <StatCard
            title={t("overview.fieldOwner")}
            value={cards ? String(cards.field_owner.value) : "0"}
            change={cards?.field_owner.change_percentage ?? 0}
            iconBg="bg-[#6E3FF3]/20"
            icon={<User className="w-5 h-5 text-[#6E3FF3]" />}
          />
          <StatCard
            title={t("overview.player")}
            value={cards ? String(cards.player.value) : "0"}
            change={cards?.player.change_percentage ?? 0}
            iconBg="bg-chart-4/20"
            icon={<Users className="w-5 h-5 text-chart-4" />}
          />
          <StatCard
            title={t("overview.premiumUser")}
            value={cards ? String(cards.premium_user.value) : "0"}
            change={cards?.premium_user.change_percentage ?? 0}
            iconBg="bg-chart-5/20"
            icon={<Crown className="w-5 h-5 text-chart-5" />}
          />
        </div>

        {/* Revenue Chart */}
        <RevenueChart
          totalRevenue={toNumber(cards?.total_revenue.value)}
          changePercentage={cards?.total_revenue.change_percentage ?? 0}
          seriesLabel={
            overview?.revenue_chart.series_label ?? t("overview.thisPeriod")
          }
          comparisonSeriesLabel={
            overview?.revenue_chart.comparison_series_label ??
            t("overview.lastPeriod")
          }
          data={chartData}
        />
      </div>
    </div>
  );
}

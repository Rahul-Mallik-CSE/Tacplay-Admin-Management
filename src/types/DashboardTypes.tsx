/** @format */

export type DashboardPeriod = "week" | "month";

export type DashboardFilterOption = {
  label: string;
  value: DashboardPeriod;
};

export type DashboardOverviewCard = {
  value: string | number;
  change_percentage: number;
};

export type DashboardOverviewCards = {
  total_revenue: DashboardOverviewCard;
  field_owner: DashboardOverviewCard;
  player: DashboardOverviewCard;
  premium_user: DashboardOverviewCard;
};

export type DashboardRevenueChartItem = {
  label: string;
  this_period_amount: string;
  last_period_amount: string;
};

export type DashboardOverviewData = {
  filter: {
    selected: DashboardPeriod;
    options: DashboardFilterOption[];
  };
  cards: DashboardOverviewCards;
  revenue_chart: {
    series_label: string;
    comparison_series_label: string;
    items: DashboardRevenueChartItem[];
  };
  recent_summary: {
    sessions: number;
    active_sessions: number;
    pending_field_owners: number;
    disabled_players: number;
  };
};

export type DashboardOverviewResponse = {
  success: boolean;
  message: string;
  meta?: Record<string, unknown>;
  data: DashboardOverviewData;
  requestId?: string;
};

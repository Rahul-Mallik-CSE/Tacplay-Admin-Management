/** @format */

export type EarningsSortOrder = "asc" | "desc";

export type EarningsListQueryParams = {
  search?: string;
  page: number;
  limit: number;
};

export type EarningItem = {
  transaction_id: number;
  display_transaction_id: string;
  payment_reference: string;
  user_name: string;
  user_id: number;
  display_user_id: string;
  plan: string;
  amount: string;
  amount_display: string;
  currency: string;
  date: string;
  date_display: string;
  session_name: string;
  payment_method: string;
};

export type EarningsListResponse = {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    filters: {
      search: string;
      plan: string;
      payment_method: string;
      currency: string;
      date_from: string;
      date_to: string;
      amount_min: string;
      amount_max: string;
    };
    sorting: {
      sort_by: string;
      order: EarningsSortOrder;
    };
    summary: {
      total_revenue: string;
      total_revenue_display: string;
      paid_transactions: number;
    };
  };
  data: EarningItem[];
  requestId?: string;
};

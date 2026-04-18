/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  DashboardOverviewResponse,
  DashboardPeriod,
} from "@/types/DashboardTypes";

const dashboardAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOverview: builder.query<DashboardOverviewResponse, DashboardPeriod>(
      {
        query: (period) => ({
          url: "/api/admin/overview/",
          params: { period },
        }),
        providesTags: ["Dashboard"],
      },
    ),
  }),
});

export const { useGetAdminOverviewQuery } = dashboardAPI;

export default dashboardAPI;

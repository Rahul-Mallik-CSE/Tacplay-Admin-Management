/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  EarningsListQueryParams,
  EarningsListResponse,
} from "@/types/EarningsTypes";

const earningsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAdminEarnings: builder.query<
      EarningsListResponse,
      EarningsListQueryParams
    >({
      query: ({ search = "", page, limit }) => ({
        url: "/api/admin/earnings/",
        params: {
          search,
          page,
          limit,
        },
      }),
      providesTags: ["Earnings"],
    }),
  }),
});

export const { useGetAdminEarningsQuery } = earningsAPI;

export default earningsAPI;

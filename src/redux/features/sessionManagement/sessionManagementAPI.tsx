/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  SessionEnableDisableResponse,
  SessionManagementDetailResponse,
  SessionManagementInfoResponse,
  SessionManagementListQueryParams,
  SessionManagementListResponse,
  SessionScoreMutationPayload,
  SessionScoreResponse,
} from "@/types/SessionManagementTypes";

const sessionManagementAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSessionManagementList: builder.query<
      SessionManagementListResponse,
      SessionManagementListQueryParams
    >({
      query: ({ search = "", page, limit, status, match_type }) => ({
        url: "/api/admin/session-management/",
        params: {
          search,
          page,
          limit,
          status,
          match_type,
        },
      }),
      providesTags: ["SessionManagement"],
    }),
    getSessionManagementDetail: builder.query<
      SessionManagementDetailResponse,
      { id: string | number }
    >({
      query: ({ id }) => ({
        url: `/api/admin/session-management/${id}/`,
      }),
      providesTags: ["SessionManagement"],
    }),
    getSessionManagementInfo: builder.query<
      SessionManagementInfoResponse,
      { id: string | number }
    >({
      query: ({ id }) => ({
        url: `/api/admin/session-management/${id}/info/`,
      }),
      providesTags: ["SessionManagement"],
    }),
    submitSessionScore: builder.mutation<
      SessionScoreResponse,
      { id: string | number; payload: SessionScoreMutationPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/api/admin/session-management/${id}/score/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["SessionManagement"],
    }),
    enableMatch: builder.mutation<
      SessionEnableDisableResponse,
      { id: string | number }
    >({
      query: ({ id }) => ({
        url: `/api/admin/session-management/${id}/enable-match/`,
        method: "PATCH",
      }),
      invalidatesTags: ["SessionManagement"],
    }),
    disableMatch: builder.mutation<
      SessionEnableDisableResponse,
      { id: string | number }
    >({
      query: ({ id }) => ({
        url: `/api/admin/session-management/${id}/disable-match/`,
        method: "PATCH",
      }),
      invalidatesTags: ["SessionManagement"],
    }),
  }),
});

export const {
  useGetSessionManagementListQuery,
  useGetSessionManagementDetailQuery,
  useGetSessionManagementInfoQuery,
  useSubmitSessionScoreMutation,
  useEnableMatchMutation,
  useDisableMatchMutation,
} = sessionManagementAPI;

export default sessionManagementAPI;

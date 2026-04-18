/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  FieldOwnerDetailQueryParams,
  FieldOwnerDetailResponse,
  FieldOwnerListQueryParams,
  FieldOwnerListResponse,
} from "@/types/FieldOwner";

const fieldOwnerAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getFieldOwners: builder.query<
      FieldOwnerListResponse,
      FieldOwnerListQueryParams
    >({
      query: ({ search = "", status = "approve", page, limit }) => ({
        url: "/api/admin/field-owners/",
        params: {
          search,
          status,
          page,
          limit,
        },
      }),
      providesTags: ["FieldOwner"],
    }),
    getFieldOwnerDetail: builder.query<
      FieldOwnerDetailResponse,
      { id: string | number } & FieldOwnerDetailQueryParams
    >({
      query: ({ id, search = "", page, limit }) => ({
        url: `/api/admin/field-owners/${id}/`,
        params: {
          search,
          page,
          limit,
        },
      }),
      providesTags: ["FieldOwner"],
    }),
  }),
});

export const { useGetFieldOwnersQuery, useGetFieldOwnerDetailQuery } =
  fieldOwnerAPI;

export default fieldOwnerAPI;

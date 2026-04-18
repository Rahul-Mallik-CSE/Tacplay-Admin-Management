/** @format */

import baseAPI from "@/redux/api/baseAPI";
import type {
  PlayerDetailQueryParams,
  PlayerDetailResponse,
  PlayerListQueryParams,
  PlayerListResponse,
} from "@/types/PlayerTypes";

const playerAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPlayers: builder.query<PlayerListResponse, PlayerListQueryParams>({
      query: ({ search = "", page, limit }) => ({
        url: "/api/admin/players/",
        params: {
          search,
          page,
          limit,
        },
      }),
      providesTags: ["Player"],
    }),
    getPlayerDetail: builder.query<
      PlayerDetailResponse,
      { id: string | number } & PlayerDetailQueryParams
    >({
      query: ({ id, search = "", page, limit }) => ({
        url: `/api/admin/players/${id}/`,
        params: {
          search,
          page,
          limit,
        },
      }),
      providesTags: ["Player"],
    }),
  }),
});

export const { useGetPlayersQuery, useGetPlayerDetailQuery } = playerAPI;

export default playerAPI;

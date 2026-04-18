/** @format */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import CommonPageSkeleton from "@/components/CommonComponents/CommonPageSkeleton";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setPlayerListLimit,
  setPlayerListPage,
  setPlayerListSearch,
} from "@/redux/features/player/playerSlice";
import { useGetPlayersQuery } from "@/redux/features/player/playerAPI";
import type { PlayerListItem } from "@/types/PlayerTypes";

const PlayerList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { search, page, limit } = useAppSelector((state) => state.player.list);
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmed = searchInput.trim();
      if (trimmed !== search) {
        dispatch(setPlayerListSearch(trimmed));
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [dispatch, search, searchInput]);

  const { data, isLoading, isFetching, isError } = useGetPlayersQuery({
    search,
    page,
    limit,
  });

  const meta = data?.meta;

  const tableData = useMemo(
    () =>
      (data?.data ?? []).map((item: PlayerListItem) => ({
        userId: item.user_id,
        displayId: item.display_id,
        fullName: item.full_name,
        email: item.email,
        country: item.country,
        sessionPlayed: item.session_played,
        matchesPlayed: item.matches_played,
        totalSpent: item.total_spent,
        status: item.status,
        canView: item.can_view,
        subscriptionPlan: item.subscription_plan,
      })),
    [data?.data],
  );

  const columns = [
    {
      header: "User ID",
      accessor: (row: (typeof tableData)[number]) => (
        <span className="text-primary/80">{row.displayId}</span>
      ),
    },
    { header: "Full Name", accessor: "fullName" as const },
    { header: "Email", accessor: "email" as const },
    { header: "Country", accessor: "country" as const },
    { header: "Session Played", accessor: "sessionPlayed" as const },
    { header: "Matches Played", accessor: "matchesPlayed" as const },
    { header: "Total Spent", accessor: "totalSpent" as const },
    { header: "Status", accessor: "status" as const },
  ];

  const showSkeleton = isLoading && !data;

  if (showSkeleton) {
    return <CommonPageSkeleton titleWidthClass="w-36" columns={6} rows={12} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-primary text-xl sm:text-2xl font-bold">
          Player Lists
        </h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9 bg-muted border-white/10 text-primary text-sm h-9 w-full sm:w-60"
            />
          </div>
        </div>
      </div>

      {isError ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          Failed to load players.
        </div>
      ) : null}

      {isFetching && !isLoading ? (
        <p className="text-xs text-muted-foreground">Refreshing data...</p>
      ) : null}

      <CustomTable
        data={tableData}
        columns={columns}
        itemsPerPage={meta?.limit ?? limit}
        currentPage={meta?.page ?? page}
        totalPages={meta?.totalPage ?? 1}
        totalItems={meta?.total ?? tableData.length}
        onPageChange={(nextPage) => dispatch(setPlayerListPage(nextPage))}
        onItemsPerPageChange={(nextLimit) =>
          dispatch(setPlayerListLimit(nextLimit))
        }
        onAction={(row) => {
          if (row.canView) {
            router.push(`/player/${row.userId}`);
          }
        }}
      />
    </div>
  );
};

export default PlayerList;

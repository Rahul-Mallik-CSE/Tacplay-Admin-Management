/** @format */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/CommonComponents/CustomTable";
import CommonPageSkeleton from "@/components/CommonComponents/CommonPageSkeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSessionManagementLimit,
  setSessionManagementMatchType,
  setSessionManagementPage,
  setSessionManagementSearch,
  setSessionManagementStatus,
} from "@/redux/features/sessionManagement/sessionManagementSlice";
import { useGetSessionManagementListQuery } from "@/redux/features/sessionManagement/sessionManagementAPI";
import type { SessionManagementListItem } from "@/types/SessionManagementTypes";

const extractSessionNumericId = (sessionId: string) => {
  const matched = sessionId.match(/\d+/g);
  if (!matched?.length) {
    return null;
  }

  return Number(matched[matched.length - 1]);
};

const SessionList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { search, page, limit, status, matchType } = useAppSelector(
    (state) => state.sessionManagement.list,
  );
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmed = searchInput.trim();
      if (trimmed !== search) {
        dispatch(setSessionManagementSearch(trimmed));
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [dispatch, search, searchInput]);

  const { data, isLoading, isFetching, isError } =
    useGetSessionManagementListQuery({
      search,
      page,
      limit,
      status: status === "all" ? undefined : status,
      match_type: matchType === "all" ? undefined : matchType,
    });

  const meta = data?.meta;

  const tableData = useMemo(
    () =>
      (data?.data ?? []).map((item: SessionManagementListItem) => ({
        internalId: extractSessionNumericId(item.session_id),
        sessionId: item.session_id,
        sessionName: item.session_name,
        fieldId: item.field_id,
        player: item.player,
        amount: item.amount,
        status: item.status_display,
      })),
    [data?.data],
  );

  const columns = [
    {
      header: "Session ID",
      accessor: (row: (typeof tableData)[number]) => (
        <div className="flex items-center gap-2">
          <span className="text-primary/80">{row.sessionId}</span>
        </div>
      ),
    },
    { header: "Session Name", accessor: "sessionName" as const },
    { header: "Field ID", accessor: "fieldId" as const },
    { header: "Player", accessor: "player" as const },
    { header: "Amount", accessor: "amount" as const },
    { header: "Status", accessor: "status" as const },
  ];

  const showSkeleton = isLoading && !data;

  if (showSkeleton) {
    return <CommonPageSkeleton titleWidthClass="w-64" columns={6} rows={12} />;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-primary text-xl sm:text-2xl font-bold">
          Session Management List
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
          <select
            className="bg-muted border border-white/10 text-primary text-xs rounded-md px-2 py-1.5 outline-none h-9"
            value={status}
            onChange={(e) =>
              dispatch(setSessionManagementStatus(e.target.value))
            }
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="full">Full</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            className="bg-muted border border-white/10 text-primary text-xs rounded-md px-2 py-1.5 outline-none h-9"
            value={matchType}
            onChange={(e) =>
              dispatch(setSessionManagementMatchType(e.target.value))
            }
          >
            <option value="all">All Match Types</option>
            <option value="ranked">Ranked</option>
            <option value="social">Social</option>
          </select>
        </div>
      </div>

      {isError ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          Failed to load sessions.
        </div>
      ) : null}

      {isFetching && !isLoading ? (
        <p className="text-xs text-muted-foreground">Refreshing data...</p>
      ) : null}

      {/* Table */}
      <CustomTable
        data={tableData}
        columns={columns}
        itemsPerPage={meta?.limit ?? limit}
        currentPage={meta?.page ?? page}
        totalPages={meta?.totalPage ?? 1}
        totalItems={meta?.total ?? tableData.length}
        onPageChange={(nextPage) =>
          dispatch(setSessionManagementPage(nextPage))
        }
        onItemsPerPageChange={(nextLimit) =>
          dispatch(setSessionManagementLimit(nextLimit))
        }
        onAction={(row) => {
          if (row.internalId) {
            router.push(`/session-management/${row.internalId}`);
          }
        }}
      />
    </div>
  );
};

export default SessionList;

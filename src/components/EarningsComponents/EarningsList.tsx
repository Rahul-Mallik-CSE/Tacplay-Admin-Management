/** @format */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setEarningsLimit,
  setEarningsPage,
  setEarningsSearch,
} from "@/redux/features/earnings/earningsSlice";
import { useGetAdminEarningsQuery } from "@/redux/features/earnings/earningsAPI";
import CommonPageSkeleton from "@/components/CommonComponents/CommonPageSkeleton";

const EarningsList = () => {
  const dispatch = useAppDispatch();
  const { search, page, limit } = useAppSelector((state) => state.earnings);

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmed = searchInput.trim();
      if (trimmed !== search) {
        dispatch(setEarningsSearch(trimmed));
      }
    }, 450);

    return () => clearTimeout(timeoutId);
  }, [dispatch, search, searchInput]);

  const { data, isLoading, isFetching, isError } = useGetAdminEarningsQuery({
    search,
    page,
    limit,
  });

  const meta = data?.meta;

  const tableData = useMemo(() => {
    const earnings = data?.data ?? [];

    return earnings.map((item) => ({
      id: item.display_transaction_id,
      userName: item.user_name,
      userId: item.display_user_id,
      plan: item.plan,
      amount: item.amount_display,
      date: item.date_display,
    }));
  }, [data?.data]);

  const columns = [
    {
      header: "Transaction ID",
      accessor: (row: (typeof tableData)[number]) => (
        <div className="flex items-center gap-2">
          <span className="text-primary/80">{row.id}</span>
        </div>
      ),
    },
    { header: "User Name", accessor: "userName" as const },
    { header: "User ID", accessor: "userId" as const },
    { header: "Plan", accessor: "plan" as const },
    { header: "Amount", accessor: "amount" as const },
    { header: "Date", accessor: "date" as const },
  ];

  const showSkeleton = isLoading && !data;

  if (showSkeleton) {
    return <CommonPageSkeleton titleWidthClass="w-40" columns={6} rows={12} />;
  }

  return (
    <div className=" space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-primary text-xl sm:text-2xl font-bold">
          Earning Lists
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
          Failed to load earnings list.
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
        onPageChange={(nextPage) => dispatch(setEarningsPage(nextPage))}
        onItemsPerPageChange={(nextLimit) =>
          dispatch(setEarningsLimit(nextLimit))
        }
      />
    </div>
  );
};

export default EarningsList;

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
  setFieldOwnerListLimit,
  setFieldOwnerListPage,
  setFieldOwnerListSearch,
} from "@/redux/features/fieldOwner/fieldOwnerSlice";
import { useGetFieldOwnersQuery } from "@/redux/features/fieldOwner/fieldOwnerAPI";
import type { FieldOwnerListItem } from "@/types/FieldOwner";

const FieldOwnerList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { search, page, limit } = useAppSelector(
    (state) => state.fieldOwner.list,
  );
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmed = searchInput.trim();
      if (trimmed !== search) {
        dispatch(setFieldOwnerListSearch(trimmed));
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [dispatch, search, searchInput]);

  const { data, isLoading, isFetching, isError } = useGetFieldOwnersQuery({
    search,
    status: "approve",
    page,
    limit,
  });

  const meta = data?.meta;

  const tableData = useMemo(
    () =>
      (data?.data ?? []).map((item: FieldOwnerListItem) => ({
        userId: item.user_id,
        displayId: item.display_id,
        ownerName: item.owner_name,
        fieldName: item.field_name,
        email: item.email,
        country: item.country,
        applyDate: new Date(item.apply_date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: item.status,
        canView: item.can_view,
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
    { header: "Owner Name", accessor: "ownerName" as const },
    { header: "Field Name", accessor: "fieldName" as const },
    { header: "Email", accessor: "email" as const },
    { header: "Country", accessor: "country" as const },
    { header: "Apply Date", accessor: "applyDate" as const },

    // ✅ NEW COLUMN (Premium / Normal)
    // {
    //   header: "User Type",
    //   accessor: (row: FieldOwner) => (
    //     <div className="flex items-center gap-2">
    //       <span
    //         className={`text-xs px-2 py-1 rounded ${
    //           row.userType === "Premium"
    //             ? "bg-yellow-500/20 text-yellow-400"
    //             : "bg-gray-500/20 text-gray-300"
    //         }`}
    //       >
    //         {row.userType}
    //       </span>

    //       <Button
    //         size="sm"
    //         variant="outline"
    //         className="text-xs h-7"
    //         onClick={() => toggleUserType(row.id)}
    //       >
    //         Switch
    //       </Button>
    //     </div>
    //   ),
    // },

    { header: "Status", accessor: "status" as const },
  ];

  const showSkeleton = isLoading && !data;

  if (showSkeleton) {
    return <CommonPageSkeleton titleWidthClass="w-36" columns={6} rows={7} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-primary text-xl sm:text-2xl font-bold">
          Field Owner List
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
          Failed to load field owners.
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
        onPageChange={(nextPage) => dispatch(setFieldOwnerListPage(nextPage))}
        onItemsPerPageChange={(nextLimit) =>
          dispatch(setFieldOwnerListLimit(nextLimit))
        }
        onAction={(row) => {
          if (row.canView) {
            router.push(`/field-owner/${row.userId}`);
          }
        }}
      />
    </div>
  );
};

export default FieldOwnerList;

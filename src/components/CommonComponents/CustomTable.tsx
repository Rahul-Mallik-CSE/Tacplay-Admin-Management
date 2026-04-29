/** @format */
"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface CustomTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
  }[];
  onAction?: (row: T) => void;
  itemsPerPage?: number;
  title?: string;
  additionalCount?: number;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (limit: number) => void;
}

const CustomTable = <T extends Record<string, unknown>>({
  data,
  columns,
  onAction,
  itemsPerPage = 10,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}: CustomTableProps<T>) => {
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const { t } = useTranslation();

  const isServerPagination =
    typeof currentPage === "number" &&
    typeof totalPages === "number" &&
    typeof totalItems === "number";

  const activeCurrentPage = isServerPagination
    ? currentPage
    : internalCurrentPage;
  const activeTotalPages =
    isServerPagination && totalPages > 0
      ? totalPages
      : Math.max(1, Math.ceil(data.length / itemsPerPage));
  const activeTotalItems = isServerPagination ? totalItems : data.length;

  const startIndex = (activeCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = isServerPagination
    ? data
    : data.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      case "paid":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      case "ongoing":
        return "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30";
      case "complete":
      case "completed":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "cancelled":
        return "bg-custom-red/20 text-red-400 border border-custom-red/30";
      case "pending":
        return "bg-custom-yellow/20 text-yellow-400 border border-custom-yellow/30";
      default:
        return "bg-secondary/20 text-secondary border border-secondary/30";
    }
  };

  const renderCell = (row: T, column: (typeof columns)[0]) => {
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }

    const value = row[column.accessor as keyof T];

    if (column.header === "Status" && typeof value === "string") {
      return (
        <div
          className={cn(
            "w-24 px-2 py-1 flex justify-center items-center rounded-md text-xs font-medium",
            getStatusColor(value),
          )}
        >
          {value}
        </div>
      );
    }

    return value as React.ReactNode;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= activeTotalPages) {
      if (isServerPagination) {
        onPageChange?.(page);
      } else {
        setInternalCurrentPage(page);
      }
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (activeTotalPages <= maxVisible) {
      for (let i = 1; i <= activeTotalPages; i++) {
        pages.push(i);
      }
    } else {
      if (activeCurrentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(activeTotalPages);
      } else if (activeCurrentPage >= activeTotalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = activeTotalPages - 3; i <= activeTotalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(activeCurrentPage - 1);
        pages.push(activeCurrentPage);
        pages.push(activeCurrentPage + 1);
        pages.push("...");
        pages.push(activeTotalPages);
      }
    }

    return pages;
  };

  return (
    <div className="w-full space-y-3 sm:space-y-4 overflow-x-auto">
      {/* Table Container */}
      <div className="rounded-xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <Table className="border-none min-w-full">
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b border-white/5">
                {columns.map((column, index) => (
                  <TableHead
                    key={index}
                    className={cn(
                      "font-medium text-secondary text-xs sm:text-sm py-3 sm:py-4 whitespace-nowrap",
                      column.className,
                    )}
                  >
                    {column.header}
                  </TableHead>
                ))}
                {onAction && (
                  <TableHead className="font-medium text-secondary text-xs sm:text-sm text-right py-3 sm:py-4 whitespace-nowrap">
                    Action
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="border-b border-white/5 hover:bg-muted/30 transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={cn(
                        "text-primary/80 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap",
                        column.className,
                      )}
                    >
                      {renderCell(row, column)}
                    </TableCell>
                  ))}
                  {onAction && (
                    <TableCell className="text-right py-3 sm:py-4">
                      <button
                        onClick={() => onAction(row)}
                        className="cursor-pointer p-1.5 sm:p-2 hover:bg-white/5 rounded-full transition-colors inline-flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-custom-yellow" />
                      </button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-secondary">
          {activeTotalItems > 0
            ? `Showing ${startIndex + 1} to ${Math.min(endIndex, activeTotalItems)} of ${activeTotalItems} entries`
            : t("common.noEntries")}
        </p>
        <div className="flex items-center gap-2">
          <Pagination>
            <PaginationContent className="flex-wrap gap-1">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(activeCurrentPage - 1)}
                  className={cn(
                    "text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4 text-secondary hover:text-primary",
                    activeCurrentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer",
                  )}
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index} className="hidden sm:inline-flex">
                  {page === "..." ? (
                    <PaginationEllipsis className="h-8 sm:h-10 text-secondary" />
                  ) : (
                    <PaginationLink
                      onClick={() => handlePageChange(page as number)}
                      isActive={activeCurrentPage === page}
                      className={cn(
                        "cursor-pointer text-xs sm:text-sm h-8 sm:h-10 w-8 sm:w-10 text-secondary hover:text-primary",
                        activeCurrentPage === page &&
                          "bg-custom-red text-white hover:bg-custom-red/80 hover:text-white border-custom-red",
                      )}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem className="sm:hidden">
                <PaginationLink
                  isActive={true}
                  className="cursor-default bg-custom-red text-white h-8 w-8 text-xs border-custom-red"
                >
                  {activeCurrentPage}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(activeCurrentPage + 1)}
                  className={cn(
                    "text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4 text-secondary hover:text-primary",
                    activeCurrentPage === activeTotalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer",
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <select
            className="bg-muted border border-white/10 text-primary text-xs rounded-md px-2 py-1.5 outline-none"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))}
          >
            <option value={10}>Show 10</option>
            <option value={25}>Show 25</option>
            <option value={50}>Show 50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;

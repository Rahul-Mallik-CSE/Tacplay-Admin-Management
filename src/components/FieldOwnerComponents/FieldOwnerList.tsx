/** @format */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type FieldOwner = {
  id: string;
  ownerName: string;
  fieldName: string;
  email: string;
  country: string;
  applyDate: string;
  userType: "Premium" | "Normal"; // ✅ added
  status: string;
};

const initialFieldOwners: FieldOwner[] = Array.from({ length: 50 }, (_, i) => ({
  id: `#CH ${565 + i}`,
  ownerName: "Rahim Hossain",
  fieldName: "Toggl Fun Club",
  email: "kamrul@gmail.com",
  country: "United Kingdom",
  applyDate: "25 Jan, 2025",
  userType: i % 2 === 0 ? "Premium" : "Normal", // ✅ added
  status:
    i % 5 === 0
      ? "Pending"
      : i % 5 === 1
        ? "Approved"
        : i % 5 === 2
          ? "Suspended"
          : i % 5 === 3
            ? "Flagged"
            : "Approved",
}));

const FieldOwnerList = () => {
  const router = useRouter();

  const [fieldOwners, setFieldOwners] =
    useState<FieldOwner[]>(initialFieldOwners);
  const [search, setSearch] = useState("");

  // ✅ Filter
  const filtered = fieldOwners.filter(
    (r) =>
      r.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.fieldName.toLowerCase().includes(search.toLowerCase()),
  );

  // ✅ Toggle function
  const toggleUserType = (id: string) => {
    setFieldOwners((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              userType: p.userType === "Premium" ? "Normal" : "Premium",
            }
          : p,
      ),
    );
  };

  // ✅ Columns
  const columns = [
    {
      header: "User ID",
      accessor: (row: FieldOwner) => (
        <span className="text-primary/80">{row.id}</span>
      ),
    },
    { header: "Owner Name", accessor: "ownerName" as const },
    { header: "Field Name", accessor: "fieldName" as const },
    { header: "Email", accessor: "email" as const },
    { header: "Country", accessor: "country" as const },
    { header: "Apply Date", accessor: "applyDate" as const },

    // ✅ NEW COLUMN (Premium / Normal)
    {
      header: "User Type",
      accessor: (row: FieldOwner) => (
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-1 rounded ${
              row.userType === "Premium"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-gray-500/20 text-gray-300"
            }`}
          >
            {row.userType}
          </span>

          <Button
            size="sm"
            variant="outline"
            className="text-xs h-7"
            onClick={() => toggleUserType(row.id)}
          >
            Switch
          </Button>
        </div>
      ),
    },

    { header: "Status", accessor: "status" as const },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-primary text-xl sm:text-2xl font-bold">
          User List
        </h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-muted border-white/10 text-primary text-sm h-9 w-full sm:w-60"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <CustomTable
        data={filtered}
        columns={columns}
        onAction={(row: FieldOwner) =>
          router.push(
            `/field-owner/${row.id.replace("#", "").replace(" ", "-")}`,
          )
        }
        itemsPerPage={10}
      />
    </div>
  );
};

export default FieldOwnerList;

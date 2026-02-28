/** @format */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const mockSessions = Array.from({ length: 50 }, (_, i) => ({
  id: `#CH ${565 + i}`,
  sessionName: "Red Seafood Resort",
  fieldId: "#CH 565",
  player: "8 / 8",
  amount: "€69",
  status:
    i % 6 === 0
      ? "Open"
      : i % 6 === 1
        ? "Full"
        : i % 6 === 2
          ? "Ongoing"
          : i % 6 === 3
            ? "Complete"
            : i % 6 === 4
              ? "Cancelled"
              : "Open",
}));

const SessionList = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = mockSessions.filter(
    (r) =>
      r.sessionName.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const columns = [
    {
      header: "Session ID",
      accessor: (row: (typeof mockSessions)[0]) => (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selected.includes(row.id)}
            onCheckedChange={() => toggleSelect(row.id)}
            className="border-white/20"
          />
          <span className="text-primary/80">{row.id}</span>
        </div>
      ),
    },
    { header: "Session Name", accessor: "sessionName" as const },
    { header: "Field ID", accessor: "fieldId" as const },
    { header: "Player", accessor: "player" as const },
    { header: "Amount", accessor: "amount" as const },
    { header: "Status", accessor: "status" as const },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-primary text-xl sm:text-2xl font-bold">
          Restaurant Menu Lists
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 bg-muted text-primary gap-1.5 text-xs"
            >
              <Filter className="w-3.5 h-3.5" />
              Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 bg-muted text-primary gap-1.5 text-xs"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sort by
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <CustomTable
        data={filtered}
        columns={columns}
        onAction={(row) =>
          router.push(
            `/session-management/${row.id.replace("#", "").replace(" ", "-")}`,
          )
        }
        itemsPerPage={10}
      />
    </div>
  );
};

export default SessionList;

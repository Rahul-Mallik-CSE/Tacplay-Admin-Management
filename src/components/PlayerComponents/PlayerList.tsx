/** @format */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Player = {
  id: string;
  userName: string;
  email: string;
  country: string;
  sessionPoint: string;
  matchesPlayed: number;
  userType: "Premium" | "Normal";
  status: string;
};

const initialPlayers: Player[] = Array.from({ length: 50 }, (_, i) => ({
  id: `#CH ${565 + i}`,
  userName: "Red Seafood Resort",
  email: "name@gmail.com",
  country: "United Kingdom",
  sessionPoint: "$256.26",
  matchesPlayed: 25,
  userType: i % 2 === 0 ? "Premium" : "Normal", // ✅ added
  status:
    i % 4 === 0
      ? "Pending"
      : i % 4 === 1
      ? "Active"
      : i % 4 === 2
      ? "Suspended"
      : "Approved",
}));

const PlayerList = () => {
  const router = useRouter();

  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [search, setSearch] = useState("");

  // ✅ Filter logic
  const filtered = players.filter(
    (r) =>
      r.userName.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Toggle Premium / Normal
  const toggleUserType = (id: string) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              userType: p.userType === "Premium" ? "Normal" : "Premium",
            }
          : p
      )
    );
  };

  // ✅ Table Columns
  const columns = [
    {
      header: "User ID",
      accessor: (row: Player) => (
        <span className="text-primary/80">{row.id}</span>
      ),
    },
    { header: "User Name", accessor: "userName" as const },
    { header: "Email", accessor: "email" as const },
    { header: "Country", accessor: "country" as const },
    { header: "Session Point", accessor: "sessionPoint" as const },
    { header: "Matches Played", accessor: "matchesPlayed" as const },

    // ✅ NEW COLUMN (Premium / Normal + Button)
    {
      header: "User Type",
      accessor: (row: Player) => (
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
          Player Lists
        </h1>

        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search */}
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
        onAction={(row: Player) =>
          router.push(
            `/player/${row.id.replace("#", "").replace(" ", "-")}`
          )
        }
        itemsPerPage={10}
      />
    </div>
  );
};

export default PlayerList;
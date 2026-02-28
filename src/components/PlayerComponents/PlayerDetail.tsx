/** @format */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { cn } from "@/lib/utils";

const orderHistory = Array.from({ length: 20 }, () => ({
  orderId: "#PCH 565",
  restaurantName: "Red Seafood Resort",
  restaurantId: "#CH 565",
  date: "26 Jan 2026",
  orderItem: 25,
  orderAmount: "$253.25",
}));

const statCards = [
  { label: "Total Revenue", value: 125, iconBg: "bg-chart-1/20", icon: "💰" },
  { label: "Total Scan", value: 125, iconBg: "bg-secondary/20", icon: "📷" },
  { label: "AI Use", value: 125, iconBg: "bg-emerald-500/20", icon: "🤖" },
  { label: "Total Order", value: 125, iconBg: "bg-chart-4/20", icon: "🛒" },
  { label: "Menu Item", value: 125, iconBg: "bg-chart-5/20", icon: "🍽️" },
  { label: "Total Scan", value: 125, iconBg: "bg-secondary/20", icon: "📷" },
  { label: "AI Use", value: 125, iconBg: "bg-emerald-500/20", icon: "🤖" },
  { label: "Total Table", value: 125, iconBg: "bg-chart-1/20", icon: "📋" },
];

const PlayerDetail = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = orderHistory.filter(
    (r) =>
      r.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
      r.orderId.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const columns = [
    {
      header: "Order ID",
      accessor: (row: (typeof orderHistory)[0]) => (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selected.includes(row.orderId)}
            onCheckedChange={() => toggleSelect(row.orderId)}
            className="border-white/20"
          />
          <span>{row.orderId}</span>
        </div>
      ),
    },
    { header: "Restaurant Name", accessor: "restaurantName" as const },
    { header: "Restaurant ID", accessor: "restaurantId" as const },
    { header: "Date", accessor: "date" as const },
    { header: "Order Item", accessor: "orderItem" as const },
    { header: "Order Amount", accessor: "orderAmount" as const },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Back + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <h1 className="text-primary text-xl sm:text-2xl font-bold">
          User Details
        </h1>
      </div>

      {/* Profile Header */}
      <div className="bg-card rounded-xl p-4 sm:p-6 border border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-muted shrink-0">
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-chart-1 to-secondary text-2xl font-bold text-white">
                MA
              </div>
            </div>
            <div>
              <h2 className="text-primary text-lg sm:text-xl font-bold">
                Malik Ahmed
              </h2>
              <p className="text-muted-foreground text-sm">User ID: #CN 256</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-custom-red text-custom-red hover:bg-custom-red/10 gap-1.5 text-xs self-start sm:self-auto"
          >
            🚫 Disable Account
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="bg-card rounded-xl p-3 sm:p-4 border border-white/5"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className={cn(
                  "w-7 h-7 rounded-md flex items-center justify-center text-sm",
                  card.iconBg,
                )}
              >
                {card.icon}
              </div>
              <p className="text-muted-foreground text-xs font-medium">
                {card.label}
              </p>
            </div>
            <p className="text-primary text-xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Order History */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-primary text-lg font-semibold">Order History</h2>
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
        <CustomTable data={filtered} columns={columns} itemsPerPage={5} />
      </div>
    </div>
  );
};

export default PlayerDetail;

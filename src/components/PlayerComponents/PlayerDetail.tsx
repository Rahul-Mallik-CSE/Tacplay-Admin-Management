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
import { MdEmail } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { FaCrown, FaTrophy } from "react-icons/fa";

const orderHistory = Array.from({ length: 20 }, () => ({
  orderId: "#PCH 565",
  restaurantName: "Red Seafood Resort",
  restaurantId: "#CH 565",
  date: "26 Jan 2026",
  orderItem: 25,
  orderAmount: "$253.25",
}));

const statCards = [
  {
    label: "Email",
    value: "name0202@gmail.com",
    iconBg: "bg-[#6E3FF3]/20",
    iconclr: "text-[#6E3FF3]",
    icon: MdEmail,
  },
  {
    label: "Contact Number",
    value: "name0202@gmail.com",
    iconBg: "bg-[#35B9E9]/20",
    iconclr: "text-[#35B9E9]",
    icon: BiSolidContact,
  },
  {
    label: "Subscription Plan",
    value: "name0202@gmail.com",
    iconBg: "bg-[#F17B2C]/20",
    iconclr: "text-[#F17B2C]",
    icon: FaCrown,
  },
  {
    label: "Total Matches Played",
    value: "128",
    iconBg: "bg-[#35B9E9]/20",
    iconclr: "text-[#35B9E9]",
    icon: FaTrophy,
  },
];
const PlayerDetail = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = orderHistory.filter(
    (r) =>
      r.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
      r.orderId.toLowerCase().includes(search.toLowerCase()),
  );

  const columns = [
    {
      header: "Order ID",
      accessor: (row: (typeof orderHistory)[0]) => (
        <div className="flex items-center gap-2">
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
    <div className="space-y-6">
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
          <Button size="sm" className="">
            🚫 Disable Account
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="bg-card rounded-xl p-3 sm:p-4 border border-white/5 space-y-2"
          >
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-10 h-10 rounded-md flex items-center justify-center text-base",
                  card.iconBg,
                  card.iconclr,
                )}
              >
                {React.createElement(card.icon)}
              </div>
              <p className="text-secondary text-lg md:text-xl font-medium">
                {card.label}
              </p>
            </div>
            <p className="text-primary text-xs sm:text-sm truncate">
              {card.value}
            </p>
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

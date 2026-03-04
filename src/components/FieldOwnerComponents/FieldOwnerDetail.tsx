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
import { IoIosMan } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaCrown, FaTrophy } from "react-icons/fa";

const orderHistory = Array.from({ length: 20 }, () => ({
  sessionId: "#CH 565",
  sessionName: "Red Seafood Resort",
  restaurantId: "#CH 565",
  date: "26 Jan 2026",
  orderItem: 25,
  orderAmount: "$255.25",
}));

const infoCards = [
  {
    label: "Field Name",
    value: "Toggie Fun Club",
    iconBg: "bg-[#F2AE40]/20",
    iconclr: "text-[#F2AE40]",
    icon: IoIosMan,
  },
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
    label: "Country",
    value: "name0202@gmail.com",
    iconBg: "bg-[#38C793]/20",
    iconclr: "text-[#38C793]",
    icon: IoDocumentTextOutline,
  },
  {
    label: "Subscription Plan",
    value: "name0202@gmail.com",
    iconBg: "bg-[#F17B2C]/20",
    iconclr: "text-[#F17B2C]",
    icon: FaCrown,
  },
  {
    label: "Total Session",
    value: "128",
    iconBg: "bg-[#35B9E9]/20",
    iconclr: "text-[#35B9E9]",
    icon: FaTrophy,
  },
  {
    label: "Ranked Match",
    value: "128",
    iconBg: "bg-[#980009]/20",
    iconclr: "text-[#980009]",
    icon: FaCrown,
  },
  {
    label: "Social Match",
    value: "128",
    iconBg: "bg-[#E1BD25]/20",
    iconclr: "text-[#E1BD25]",
    icon: FaCrown,
  },
];

const FieldOwnerDetail = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = orderHistory.filter(
    (r) =>
      r.sessionName.toLowerCase().includes(search.toLowerCase()) ||
      r.sessionId.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const columns = [
    {
      header: "Session ID",
      accessor: (row: (typeof orderHistory)[0]) => (
        <div className="flex items-center gap-2">
          <span>{row.sessionId}</span>
        </div>
      ),
    },
    { header: "Session Name", accessor: "sessionName" as const },
    { header: "Restaurant ID", accessor: "restaurantId" as const },
    { header: "Date", accessor: "date" as const },
    { header: "Order Item", accessor: "orderItem" as const },
    { header: "Order Amount", accessor: "orderAmount" as const },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-2 md:space-y-4">
      {/* Back + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <h1 className="text-primary text-xl sm:text-2xl font-bold">
          Field Details
        </h1>
      </div>

      {/* Profile Header */}
      <div className="bg-card rounded-xl p-4 sm:p-6 border border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-muted shrink-0">
              <div
                className="w-full h-full flex items-center justify-center bg-linear-to-br from-chart-1 to-secondary text-2xl font-bold text-white"
                style={{
                  background:
                    "linear-gradient(to bottom right, var(--chart-1), var(--secondary))",
                }}
              >
                MA
              </div>
            </div>
            <div>
              <h2 className="text-primary text-xl md:text-3xl font-bold">
                Malik Ahmed
              </h2>
              <p className="text-secondary text-sm md:text-lg">
                User ID: #CN 256
              </p>
            </div>
          </div>
          <div className="flex gap-2 self-start sm:self-auto">
            <Button size="sm" className="">
              🚫 Suspended
            </Button>
            <Button
              size="sm"
              className="border-emerald-500 bg-[#38C793] text-primary hover:bg-[#38C793]/90 text-xs"
            >
              Approved
            </Button>
          </div>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {infoCards.map((card, i) => (
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

export default FieldOwnerDetail;

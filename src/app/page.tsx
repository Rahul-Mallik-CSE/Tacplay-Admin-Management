/** @format */
import StatCard from "@/components/OverViewComponents/StatCard";
import RevenueChart from "@/components/OverViewComponents/RevenueChart";
import { DollarSign, User, Users, Crown } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full p-4 sm:p-6 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value="$1864.18"
          change={1.3}
          iconBg="bg-chart-1/20"
          icon={<DollarSign className="w-5 h-5 text-chart-1" />}
        />
        <StatCard
          title="Field Owner"
          value="293"
          change={-4.3}
          iconBg="bg-secondary/20"
          icon={<User className="w-5 h-5 text-secondary" />}
        />
        <StatCard
          title="Player"
          value="10293"
          change={-4.3}
          iconBg="bg-chart-4/20"
          icon={<Users className="w-5 h-5 text-chart-4" />}
        />
        <StatCard
          title="Premium User"
          value="10293"
          change={1.3}
          iconBg="bg-chart-5/20"
          icon={<Crown className="w-5 h-5 text-chart-5" />}
        />
      </div>

      {/* Revenue Chart */}
      <RevenueChart />
    </div>
  );
}

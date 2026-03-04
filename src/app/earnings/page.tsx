/** @format */
import React from "react";
import EarningsList from "@/components/EarningsComponents/EarningsList";

const EarningsPage = () => {
  return (
    <div className="w-full py-2 md:py-3 space-y-6">
      <div className="max-w-625 mx-auto">
        <EarningsList />
      </div>
    </div>
  );
};

export default EarningsPage;

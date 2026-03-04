/** @format */
import React from "react";
import EarningsList from "@/components/EarningsComponents/EarningsList";

const EarningsPage = () => {
  return (
    <div className="w-full p-4 sm:p-6 space-y-6">
      <div className="max-w-625 mx-auto">
        <EarningsList />
      </div>
    </div>
  );
};

export default EarningsPage;

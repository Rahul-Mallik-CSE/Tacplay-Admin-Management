/** @format */
import React from "react";
import SessionDetail from "@/components/SessionManagementComponents/SessionDetail";

const SessionDetailPage = () => {
  return (
    <div className="w-full p-3 md:p-4 space-y-6">
      <div className="max-w-625 mx-auto">
        <SessionDetail />
      </div>
    </div>
  );
};

export default SessionDetailPage;

/** @format */
import React from "react";
import SessionList from "@/components/SessionManagementComponents/SessionList";

const SessionManagementPage = () => {
  return (
    <div className="w-full p-4 sm:p-6 space-y-6">
      <div className="max-w-625 mx-auto">
        {" "}
        <SessionList />
      </div>
    </div>
  );
};

export default SessionManagementPage;

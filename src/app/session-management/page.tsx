/** @format */
import React from "react";
import SessionList from "@/components/SessionManagementComponents/SessionList";

const SessionManagementPage = () => {
  return (
    <div className="w-full py-2 md:py-3  space-y-6">
      <div className="max-w-625 mx-auto">
        {" "}
        <SessionList />
      </div>
    </div>
  );
};

export default SessionManagementPage;

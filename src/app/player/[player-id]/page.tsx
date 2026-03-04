/** @format */
import React from "react";
import PlayerDetail from "@/components/PlayerComponents/PlayerDetail";

const PlayerDetailPage = () => {
  return (
    <div className="w-full p-4 sm:p-6 space-y-6">
      <div className="max-w-625 mx-auto">
        <PlayerDetail />
      </div>
    </div>
  );
};

export default PlayerDetailPage;

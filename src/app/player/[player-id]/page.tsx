/** @format */
import React from "react";
import PlayerDetail from "@/components/PlayerComponents/PlayerDetail";

const PlayerDetailPage = () => {
  return (
    <div className="w-full py-2 md:py-3  space-y-6">
      <div className="max-w-625 mx-auto">
        <PlayerDetail />
      </div>
    </div>
  );
};

export default PlayerDetailPage;

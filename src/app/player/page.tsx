/** @format */
import React from "react";
import PlayerList from "@/components/PlayerComponents/PlayerList";

const PlayerPage = () => {
  return (
    <div className="w-full p-4 sm:p-6 space-y-6">
      <div className="max-w-625 mx-auto">
        <PlayerList />
      </div>
    </div>
  );
};

export default PlayerPage;

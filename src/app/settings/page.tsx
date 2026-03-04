/** @format */
import React from "react";
import SettingsForm from "@/components/SettingsComponents/SettingsForm";

const SettingsPage = () => {
  return (
    <div className="w-full py-2 md:py-3  space-y-6">
      <div className="max-w-625 mx-auto">
        <SettingsForm />
      </div>
    </div>
  );
};

export default SettingsPage;

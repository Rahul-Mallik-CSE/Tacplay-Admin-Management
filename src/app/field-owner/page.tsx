/** @format */
import React from "react";
import FieldOwnerList from "@/components/FieldOwnerComponents/FieldOwnerList";

const FieldOwnerPage = () => {
  return (
    <div className="w-full py-2 md:py-3  space-y-6">
      <div className="max-w-625 mx-auto">
        <FieldOwnerList />
      </div>
    </div>
  );
};

export default FieldOwnerPage;

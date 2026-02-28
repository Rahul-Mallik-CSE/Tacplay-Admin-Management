/** @format */
"use client";
import React, { useState } from "react";
import { ChevronRight, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SettingsModals, SettingsStep } from "./SettingsModals";

const SettingsForm = () => {
  const [modalStep, setModalStep] = useState<SettingsStep>(null);

  const handleEditSave = () => {
    // After saving edit, go to verify step
    setModalStep("verify");
  };

  const handleVerifySubmit = () => {
    // After verifying code, go to set new password
    setModalStep("password");
  };

  const handlePasswordChange = () => {
    setModalStep(null);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-primary text-xl sm:text-2xl font-bold">
            Settings
          </h1>
          <Button
            size="sm"
            className="bg-custom-red hover:bg-custom-red/90 text-white gap-1.5 text-xs"
            onClick={() => setModalStep("edit")}
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </Button>
        </div>

        {/* Profile Section */}
        <div className="bg-card rounded-xl border border-white/5 p-5 sm:p-6 space-y-5">
          {/* Avatar + Fields */}
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-chart-1 to-secondary flex items-center justify-center text-white text-xl font-bold">
                SP
              </div>
              <p className="text-muted-foreground text-xs">Sidney</p>
            </div>

            {/* Fields */}
            <div className="flex-1 space-y-3">
              <div>
                <Input
                  defaultValue="Sidney Paul"
                  readOnly
                  className="bg-input border-white/10 text-primary cursor-default"
                />
              </div>
              <div>
                <Input
                  defaultValue="comet@gmail.com"
                  readOnly
                  type="email"
                  className="bg-input border-white/10 text-primary cursor-default"
                />
              </div>
            </div>
          </div>

          {/* Change Password Row */}
          <button
            onClick={() => setModalStep("verify")}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <span className="text-primary text-sm font-medium">
              Change password
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <SettingsModals
        step={modalStep}
        onClose={() => setModalStep(null)}
        onEditSave={handleEditSave}
        onVerifySubmit={handleVerifySubmit}
        onPasswordChange={handlePasswordChange}
      />
    </div>
  );
};

export default SettingsForm;

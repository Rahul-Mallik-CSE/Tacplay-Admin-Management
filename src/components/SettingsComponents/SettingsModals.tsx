/** @format */
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";

type SettingsStep = "edit" | "verify" | "password" | null;

interface SettingsModalsProps {
  step: SettingsStep;
  onClose: () => void;
  onEditSave: () => void;
  onVerifySubmit: () => void;
  onPasswordChange: () => void;
}

/* ── Edit Account Info Modal ── */
const EditModal = ({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}) => {
  const [name, setName] = useState("Sidney Paul");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-white/10 max-w-sm w-full rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-primary text-lg font-bold text-center">
            Edit Account Info
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs text-center">
            Make changes to your profile info. Click save when done.
          </DialogDescription>
        </DialogHeader>

        {/* Avatar */}
        <div className="flex justify-center my-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-chart-1 to-secondary flex items-center justify-center text-white text-xl font-bold">
              SP
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-custom-red flex items-center justify-center">
              <Camera className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs">Full name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-input border-white/10 text-primary"
              placeholder="Full name"
            />
          </div>
        </div>

        <Button
          className="w-full bg-custom-red hover:bg-custom-red/90 text-white"
          onClick={onSave}
        >
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
};

/* ── Verify OTP Modal ── */
const VerifyModal = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  const [code, setCode] = useState(["4", "7", "0", "9"]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[index] = val;
    setCode(next);
    if (val && index < 3) {
      const el = document.getElementById(`otp-${index + 1}`);
      el?.focus();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-white/10 max-w-sm w-full rounded-2xl p-6">
        {/* Red circle icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-custom-red/20 border-4 border-custom-red/40 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-custom-red" />
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="text-primary text-lg font-bold text-center">
            Enter Verification Code
          </DialogTitle>
        </DialogHeader>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 my-5">
          {code.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              className="w-12 h-12 text-center text-primary text-xl font-bold bg-input border border-white/10 rounded-lg outline-none focus:border-custom-red transition-colors"
            />
          ))}
        </div>

        <Button
          className="w-full bg-custom-red hover:bg-custom-red/90 text-white mb-3"
          onClick={onSubmit}
        >
          Submit Code
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Didn&apos;t receive the code?{" "}
          <button className="text-custom-red hover:underline">
            Resend code
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
};

/* ── New Password Modal ── */
const NewPasswordModal = ({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (password !== confirm) {
      setError(true);
      return;
    }
    setError(false);
    onSave();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-white/10 max-w-sm w-full rounded-2xl p-6">
        {/* Red circle icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-custom-red/20 border-4 border-custom-red/40 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-custom-red" />
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="text-primary text-lg font-bold text-center">
            Set a new password
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 my-4">
          <Input
            type="password"
            placeholder="Password 1"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            className="bg-input border-white/10 text-primary"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              setError(false);
            }}
            className={`bg-input text-primary ${error ? "border-custom-red" : "border-white/10"}`}
          />
          {error && (
            <p className="text-custom-red text-xs">
              ✕ Confirm Password does not match the same as New Password
            </p>
          )}
        </div>

        <Button
          className="w-full bg-custom-red hover:bg-custom-red/90 text-white"
          onClick={handleSubmit}
        >
          Change Password
        </Button>
      </DialogContent>
    </Dialog>
  );
};

/* ── Settings Modals Orchestrator ── */
const SettingsModals = ({
  step,
  onClose,
  onEditSave,
  onVerifySubmit,
  onPasswordChange,
}: SettingsModalsProps) => {
  return (
    <>
      <EditModal open={step === "edit"} onClose={onClose} onSave={onEditSave} />
      <VerifyModal
        open={step === "verify"}
        onClose={onClose}
        onSubmit={onVerifySubmit}
      />
      <NewPasswordModal
        open={step === "password"}
        onClose={onClose}
        onSave={onPasswordChange}
      />
    </>
  );
};

export { SettingsModals };
export type { SettingsStep };

/** @format */
"use client";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MatchResultModalProps {
  open: boolean;
  onClose: () => void;
}

const MatchResultModal = ({ open, onClose }: MatchResultModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-white/10 max-w-sm w-full p-0 overflow-hidden rounded-2xl">
        {/* Confetti-style gradient header */}
        <div className="relative bg-linear-to-b from-muted to-card p-6 pb-4 text-center">
          {/* Confetti dots */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full opacity-70"
                style={{
                  left: `${5 + i * 4.7}%`,
                  top: `${10 + (i % 5) * 12}%`,
                  backgroundColor: [
                    "#C00069",
                    "#b4971e",
                    "#525273",
                    "#f97316",
                    "#10b981",
                  ][i % 5],
                }}
              />
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-muted-foreground hover:text-primary z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Logo area */}
          <div className="w-14 h-14 bg-custom-red rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-black text-xs tracking-tight">
              TACPLAY
            </span>
          </div>

          <h2 className="text-primary font-bold text-base mb-4">
            Cracknel Supreme Match
          </h2>

          {/* Vs Section */}
          <div className="flex items-center justify-between gap-2 mb-4">
            {/* Team A */}
            <div className="flex-1 text-right space-y-1">
              <p className="text-emerald-400 text-xs font-medium">Victory</p>
              <div className="flex items-center justify-end gap-2">
                <div className="text-right">
                  <p className="text-primary font-bold text-sm">
                    Snake Green Squad
                  </p>
                  <p className="text-emerald-400 text-2xl font-black">+52</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-lg">🐍</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 text-muted-foreground font-bold text-sm">
              VS
            </div>

            {/* Team B */}
            <div className="flex-1 text-left space-y-1">
              <p className="text-red-400 text-xs font-medium text-right">
                Victory
              </p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-lg">🐂</span>
                </div>
                <div>
                  <p className="text-primary font-bold text-sm">
                    Red Bull Squad
                  </p>
                  <p className="text-red-400 text-2xl font-black">-12</p>
                </div>
              </div>
            </div>
          </div>

          {/* Match Info */}
          <div className="text-chart-4 text-xs space-y-0.5">
            <p>25 Nov. 2022</p>
            <p>12:00 pm - 01:00 pm</p>
            <p>Toggle Fun Club</p>
          </div>
        </div>

        {/* Cancel button */}
        <div className="p-4">
          <Button
            variant="outline"
            className="w-full border-white/10 text-primary hover:bg-muted text-sm"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchResultModal;

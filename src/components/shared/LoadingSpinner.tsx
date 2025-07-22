import React from "react";
import { cn } from "@/lib/utils";

export const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("loader scale-60", className)} />
);


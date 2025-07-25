import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const MoldovaPhoneInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <Input ref={ref} className={cn("pl-18", className)} {...props} />
      <div className="text-text-gray absolute left-5 top-1/2 -translate-y-1/2">
        +373 |
      </div>
    </div>
  ),
);
MoldovaPhoneInput.displayName = "MoldovaPhoneInput";

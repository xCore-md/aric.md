"use client";
import React from "react";
import { useRouter } from "@/i18n/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AuthForm } from "@/components/shared/AuthForm";

export default function Page() {
  const { back } = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={() => back()}>
      <DialogContent className="h-[90vh] max-h-[calc(100dvh)] w-[calc(100dvw)] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>

        <div className="lg:p-20">
          <AuthForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}

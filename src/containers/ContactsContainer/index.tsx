"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmailSubscriptionSection } from "@/components/sections/EmailSubscription";

export const ContactsContainer: React.FC = () => {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="mb-24">
            <h1 className="h1 mb-4">Contactați-ne. </h1>

            <p className="text-4xl">Suntem aici pentru a vă ajuta!</p>
          </div>

          <div className="max-w-6xl">
            <form action="" className="space-y-8">
              <div className="grid grid-cols-3 gap-8">
                <Input />
                <Input />
                <Input />
              </div>

              <Textarea />

              <Button>Rezervează călătoria ta</Button>
            </form>
          </div>
        </div>
      </section>

      <EmailSubscriptionSection withBg />
    </>
  );
};

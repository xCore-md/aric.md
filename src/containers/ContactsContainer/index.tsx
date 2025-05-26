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
          <div className="mb-12 md:mb-24">
            <h1 className="h1 mb-4">Contactați-ne. </h1>

            <p className="text-2xl md:text-4xl">
              Suntem aici pentru a vă ajuta!
            </p>
          </div>

          <div className="max-w-6xl">
            <form action="" className="space-y-4 md:space-y-8">
              <div className="grid gap-4 md:grid-cols-3 md:gap-8">
                <Input placeholder="Nume / Prenume" />
                <Input placeholder="Email" />
                <Input placeholder="+373 | 000 00 000" />
              </div>

              <Textarea placeholder="Comentariu" />

              <Button size="lg">Sună-mă înapoi</Button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-[#E6ECF1] py-12 md:py-24">
        <div className="container">
          <div className="grid grid-cols-3">
            <div className="">
              <h2 className="h2">Suntem mereu disponibili!</h2>
            </div>
          </div>
        </div>
      </section>

      <EmailSubscriptionSection withBg />
    </>
  );
};

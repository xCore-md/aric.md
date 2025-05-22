"use client";
import React from "react";
import { FAQSection } from "@/components/sections/FAQ";
import { DiscountSection } from "@/components/sections/Discount";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripRouteDetails } from "@/components/shared/TripRouteDetails";
import { SearchTicketForm } from "@/components/shared/SearchTicketForm";

export const SearchContainer: React.FC = () => {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="mb-10">
            <SearchTicketForm />
          </div>

          <div className="flex items-center justify-between gap-6">
            <h1 className="h3">Chișinău - Ismail</h1>
            <div className="flex items-center justify-between gap-4">
              <div className="text-text-gray">Au fost găsite</div>
              <div className="bg-green rounded-full px-2.5 py-0.5">
                16 bilete
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <ul className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <li
                    key={index}
                    className="border-platinum rounded-xl border bg-white px-10 py-6"
                  >
                    <div className="flex items-center justify-between gap-8">
                      <div className="text-text-gray bg-back flex items-center gap-2 rounded-full px-3 py-1 text-sm">
                        <div className="text-text-gray">20 pasageri</div>
                        <div className="text-green">/ 5 rămase</div>
                      </div>

                      <div className="ml-auto text-2xl font-medium">120MDL</div>

                      <Button variant="reverse">Rezervează</Button>
                    </div>

                    <div className="my-6 w-full border-b border-dashed" />

                    <TripRouteDetails />

                    <Collapsible>
                      <CollapsibleTrigger className="hover:text-blue data-[state=open]:text-blue bg-back mt-6 flex w-full cursor-pointer items-center justify-between gap-1 rounded-full px-6 py-4 font-semibold transition data-[state=open]:rounded-t-2xl data-[state=open]:rounded-b-none [&[data-state=open]>svg]:rotate-90">
                        <span>Detalii bilet</span>
                        <ChevronRightIcon className="size-5" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="bg-back rounded-b-2xl px-6 pb-4">
                        Yes. Free to use for personal and commercial projects.
                        No attribution required.
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                ))}
              </ul>
            </div>
            <div className="">
              <Card>
                <CardHeader className="border-platinum relative -mt-6 gap-0 rounded-t-xl border bg-[#F9F9F9] py-6">
                  <CardTitle className="h4">Filtru bilete 🔎</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <DiscountSection />
      <FAQSection />
    </>
  );
};

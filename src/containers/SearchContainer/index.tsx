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

export const SearchContainer: React.FC = () => {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="bg-red py-16 rounded-xl"></div>

          <div className="flex items-center justify-between gap-6">
            <h1 className="h3">Chișinău - Ismail</h1>
            <div className="flex items-center justify-between gap-4">
              <div className="text-text-gray">Au fost găsite</div>
              <div className="bg-green px-2.5 py-0.5 rounded-full">
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
                    className="px-10 py-6 border border-platinum rounded-xl bg-white"
                  >
                    <div className="flex items-center justify-between gap-8">
                      <div className="flex items-center gap-2 text-text-gray text-sm bg-back py-1 px-3 rounded-full">
                        <div className="text-text-gray">20 pasageri</div>
                        <div className="text-green">/ 5 rămase</div>
                      </div>

                      <div className="ml-auto font-medium text-2xl">120MDL</div>

                      <Button variant="reverse">Rezervează</Button>
                    </div>

                    <div className="w-full my-6 border-b border-dashed" />

                    <TripRouteDetails />

                    <Collapsible>
                      <CollapsibleTrigger className="data-[state=open]:text-blue [&[data-state=open]>svg]:rotate-90 w-full mt-6 flex items-center gap-1 font-semibold justify-between py-4 px-6 rounded-full bg-back">
                        <span>Detalii bilet</span>
                        <ChevronRightIcon className="size-5" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="bg-back">
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
                <CardHeader className="relative -mt-6 py-6 gap-0 rounded-t-xl bg-[#F9F9F9] border border-platinum">
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

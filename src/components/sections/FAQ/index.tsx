"use client";
import React from "react";
import Image from "next/image";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import faqAvatar from "@/assets/images/faq.png";

export const FAQSection: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="flex justify-between gap-16">
          <div className="max-w-3xl w-full">
            <h2 className="h2 flex flex-col !mb-14">
              <span className="flex items-center gap-4">
                <span>Întrebări</span>
                <svg viewBox="0 0 39 40" className="size-10">
                  <path
                    fill="#FFC60E"
                    d="M0 20a19.5 19.5 0 1 1 39 0 19.5 19.5 0 1 1-39 0Z"
                  />
                  <path
                    fill="#fff"
                    d="M17 24.9v3.8h3.9V25h-4Zm3.9-3.2a6.8 6.8 0 1 0-8.6-8l3.8.9A3 3 0 1 1 19 18a2 2 0 0 0-2 1.9v3h3.9v-1.3Z"
                  />
                </svg>
              </span>
              <span>și Răspunsuri</span>
            </h2>

            <div className="flex gap-28">
              <Accordion
                type="single"
                collapsible
                className="w-full max-w-3xl space-y-4 relative"
              >
                <Image
                  src={faqAvatar.src}
                  alt="Image"
                  width={faqAvatar.width}
                  height={faqAvatar.height}
                  className="absolute right-8 -translate-y-full"
                />

                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>

                <Button asChild className="mt-8">
                  <Link href="/faq">
                    Vezi toate
                    <ChevronRightIcon />
                  </Link>
                </Button>
              </Accordion>
            </div>
          </div>

          <Card className="max-w-sm w-full">
            <CardHeader>
              <CardTitle className="h3 text-center">
                Cere un
                <br /> apel telefonic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action="" className="space-y-6">
                <Input placeholder="Nume / Prenume *" />
                <Input placeholder="+373 | 000 00 000" />
                <Button type="button" className="w-full">
                  Sună-mă înapoi
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

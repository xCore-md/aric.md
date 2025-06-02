"use client";
import React from "react";
import Image from "next/image";
import { ChevronRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  name: z.string().min(3, { message: "Required" }),
  phone: z.string().min(3),
});

export const FAQSection: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  function onSubmit(data: z.infer<typeof schema>) {
    console.log(data);
  }

  return (
    <section className="section">
      <div className="container">
        <div className="justify-between gap-8 md:flex lg:gap-16">
          <div className="w-full max-w-3xl">
            <h2 className="h2 !mb-8 flex flex-wrap gap-x-4 md:!mb-14 md:flex-col">
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
                className="relative w-full max-w-3xl space-y-4"
              >
                <Image
                  src={faqAvatar.src}
                  alt="Image"
                  width={faqAvatar.width}
                  height={faqAvatar.height}
                  className="absolute right-8 hidden -translate-y-full sm:block"
                />

                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>

                <Button asChild className="md:mt-8">
                  <Link href="/faq">
                    Vezi toate
                    <ChevronRightIcon />
                  </Link>
                </Button>
              </Accordion>
            </div>
          </div>

          <Card className="mx-auto mt-10 w-full max-w-sm md:mt-0">
            <CardHeader>
              <CardTitle className="h3 text-center">
                Cere un
                <br /> apel telefonic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Nume / Prenume" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="+373 | 000 00 000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg">
                    Sună-mă înapoi
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

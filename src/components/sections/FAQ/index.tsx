"use client";
import React from "react";
import Image from "next/image";
import { ChevronRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Link, usePathname } from "@/i18n/navigation";

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
import faqIcon from "@/assets/icons/faq-question.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";

const schema = z.object({
  name: z.string().min(3, { message: "Required" }),
  phone: z.string().min(3),
});

export const FAQSection: React.FC = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const { control, handleSubmit } = form;

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
                <span>{t("faq.questions")}</span>
                <Image
                  src={faqIcon.src}
                  width={faqIcon.width}
                  height={faqIcon.height}
                  alt=""
                  className="size-10"
                />
              </span>
              <span>{t("faq.and_answers")}</span>
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

                {pathname !== "/faq" && (
                  <Button asChild className="md:mt-8">
                    <Link href="/faq">
                      {t("general.view_all_label")}
                      <ChevronRightIcon />
                    </Link>
                  </Button>
                )}
              </Accordion>
            </div>
          </div>

          <Card className="mx-auto mt-10 w-full max-w-sm md:mt-0">
            <CardHeader>
              <CardTitle className="h3 text-center">
                {t.rich("phone_request.title", {
                  br: () => <br />,
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={t("input.name_and_surname_label")}
                            {...field}
                          />
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
                    {t("phone_request.action")}
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

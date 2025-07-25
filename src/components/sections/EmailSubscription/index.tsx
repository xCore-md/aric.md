"use client";
import React from "react";
import Image from "next/image";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bgBus from "@/assets/images/bg-bus.jpg";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { HTTPError } from "ky";
import { newsletterService } from "@/services/newsletter.service";

const schema = z.object({
  email: z.string().email(),
});

export const EmailSubscriptionSection: React.FC<{ withBg?: boolean }> = ({
  withBg,
}) => {
  const t = useTranslations();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const { control, handleSubmit, setError, reset } = form;

  const subscribeMutation = useMutation({
    mutationFn: (email: string) => newsletterService.subscribe(email),
    onSuccess: (response) => {
      toast.success(response.message);
      reset();
    },
    onError: async (error) => {
      if (error instanceof HTTPError) {
        const res = await error.response.json();
        let message = res?.errors?.email?.[0] || res?.message || "Unknown error";
        if (message === "Too Many Attempts.") {
          message = t("too_many_attempts");
        }
        setError("email", { message });
      }
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    subscribeMutation.mutate(data.email);
  }

  if (!withBg) {
    return (
      <section className="section">
        <div className="container">
          <div className="flex flex-col items-center gap-16 text-center">
            <h2 className="max-w-4xl text-3xl text-black md:text-5xl">
              {t("subscription.title")}
            </h2>

            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-xl"
              >
                <div className="relative flex w-full items-center gap-3 md:gap-5">
                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder={t("input.email_field_label")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="absolute -bottom-6 left-6" />
                      </FormItem>
                    )}
                  />
                  <Button disabled={subscribeMutation.isPending}>
                    {subscribeMutation.isPending
                      ? t("action.subscribe") + "..."
                      : t("action.subscribe")}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-full overflow-hidden py-12 md:py-24">
      <div className="relative z-10 container">
        <div className="grid gap-10 md:grid-cols-2 md:gap-32">
          <div className="text-white">
            <h2 className="h2 max-w-md">{t("email_subscription.title")}</h2>
            <p className="text-xl opacity-80 md:text-2xl">
              {t("email_subscription.title")}
            </p>
          </div>

          <div className="relative flex">
            <svg
              className="fill-back/90 absolute -top-36 -left-5 hidden h-44 md:block"
              viewBox="0 0 339 213"
            >
              <path d="M198 210c3 .5 5.8.8 8.7.9v2c-3-.1-6-.4-9-1l.4-1.9ZM224.5 211.6c-3 .5-6 .9-8.9 1v-1l-.1-1c2.8-.1 5.7-.5 8.6-1l.4 2ZM181.6 204.6c2.6 1.3 5.3 2.5 8 3.3l-.6 2c-2.8-1-5.6-2.1-8.3-3.5l1-1.8ZM241.8 207.1c-2.9 1-5.7 1.8-8.6 2.6l-.5-2c2.8-.7 5.6-1.5 8.4-2.5l.7 2ZM258.3 200.4c-2.7 1.3-5.5 2.5-8.2 3.6l-.7-1.8c2.7-1.1 5.3-2.3 8-3.6l.9 1.8ZM167.7 194.4c2 2 4.3 4 6.6 5.6l-1.2 1.6a60 60 0 0 1-6.8-5.8l1.4-1.4ZM274 192.1a201 201 0 0 1-7.8 4.4l-1-1.8c2.7-1.4 5.3-2.8 7.8-4.3l1 1.7ZM157 180.6c1.6 2.6 3.3 5 5 7.2l-1.6 1.2a78.7 78.7 0 0 1-5-7.4l1.7-1ZM289 182.5l-7.4 5-1.1-1.7 7.3-5 1.1 1.7ZM299.6 174.5l-3.5 2.7-1.2-1.6 3.4-2.7 1.3 1.6ZM149.5 164.8c1.1 2.9 2.3 5.6 3.5 8l-1.8 1c-1.3-2.6-2.4-5.4-3.5-8.3l1.8-.7ZM76.5 169.9c3 .4 6 .5 9.2.5v2a62 62 0 0 1-9.4-.6l.2-2ZM104.3 169.5c-3 .9-6.1 1.6-9.2 2l-.3-2c3-.4 6-1 9-1.9l.5 2ZM59 164.6c2.9 1.3 5.7 2.4 8.6 3.3l-.6 2c-3-1-6-2.1-8.8-3.5l.9-1.8ZM336.6 134.8s1-.2 1.6 0c.2.2.4.3.5.8v.7l-.2.8c-.5 3.4-9.1 28-9.2 28.1 0 0-.5 1.4-1.8 1.4-.5 0-1.1-.2-1.8-.9-1.3-1.3-4.3-4-7.2-6.4-1 .7-3 2.1-5 3.8-3 2.5-2.4-.2-2.4-.2l1.6-8.7.2-.2s17.2-12.6 17.8-14c0-.2-.1-.3-.3-.2-1 .3-20.5 10.1-22.6 11.2h-.5l-8.6-3.7s-1-.6-.6-1.5c.1-.2.3-.4.7-.6 2.1-1.2 37.7-10.3 37.8-10.4ZM121.8 162.7c-2.8 1.4-5.7 2.7-8.6 3.8l-.7-1.8a106 106 0 0 0 8.4-3.8l1 1.8ZM44 154.2c2.4 2.1 4.8 4 7.2 5.7l-1.1 1.7c-2.5-1.8-5-3.7-7.4-6l1.4-1.4ZM138 153.2l-8 5-1-1.7a141 141 0 0 0 7.8-5l1.1 1.7ZM144.4 148c.7 3 1.5 5.8 2.3 8.5l-2 .6-2.3-8.6 2-.5ZM32 140.3c1.8 2.6 3.7 5 5.6 7.3l-.7.6-.8.7a97 97 0 0 1-5.8-7.4l1.6-1.2ZM152.8 141.7l-7.3 6-1.2-1.7c2.4-1.8 4.8-3.8 7.1-5.8l1.4 1.5ZM141 130.7l1.5 8.7-2 .4-1.5-8.8 2-.3ZM166.3 128.8l-6.6 6.6-1.4-1.5c2.2-2 4.4-4.3 6.6-6.5l1.4 1.4ZM22.5 124.5c1.4 2.9 2.9 5.6 4.4 8.1l-.8.5-.9.5c-1.5-2.5-3-5.3-4.5-8.2l1.8-.9ZM139 113a135.6 135.6 0 0 0 .9 9l-2 .3a281.7 281.7 0 0 1-.9-9.2l2-.1ZM178 114l.7.7a128.2 128.2 0 0 1-6 7.2l-1.5-1.3a230.8 230.8 0 0 0 6-7.2l.8.7ZM15 107.5l3.5 8.6-1.8.8a188 188 0 0 1-3.5-8.7l1.9-.7ZM189.6 99a169 169 0 0 1-5.2 8l-1.7-1.1a167 167 0 0 0 5.2-8l1.7 1ZM139.1 94.6c-.2 3-.3 6.1-.3 9.2h-2l.3-9.3 2 .1ZM9.3 90l2.7 8.8-1 .4-1 .3a248 248 0 0 1-2.6-9l1.9-.5ZM198.6 82.2l-4.3 8.5-1.8-1c1.5-2.7 3-5.5 4.3-8.3l1.8.8ZM141.6 76.4l-1.5 9-2-.2c.4-3.1 1-6.2 1.6-9.2l2 .4ZM4.7 72 7 81l-2 .5-2.1-9.2 2-.4ZM205.7 64.5l-3.3 9-1-.4-.9-.4 3.3-8.8 1.9.6ZM146.5 58.7c-1 2.9-2 5.8-2.7 8.7l-2-.5 2.8-8.9 1.9.7ZM2 58.2l.9 4.7-2 .4-.9-4.7 2-.4ZM210.1 46c-.4 3-1 6.1-1.8 9.3l-2-.5c.8-3 1.4-6.2 1.8-9.2l2 .3ZM153.8 41.2a274.2 274.2 0 0 0-4 8.9l-1.9-.8a142.7 142.7 0 0 1 4.1-9l1.8 1ZM210.1 26.7c.6 3 .8 6.3.8 9.6h-2c0-3.2-.2-6.3-.7-9.2l2-.4ZM162.7 22.8l.8.5c-1.7 2.8-3.4 5.7-5 8.8l-1.8-.9 5.1-9 .9.6ZM202 9.3c2.2 2.4 4 5.1 5.3 8.1l-1.8.9c-1.3-2.8-3-5.4-5-7.6l.7-.7.7-.7ZM176 7.6c-2.2 2-4.4 4.4-6.7 7.4l-1.6-1.3c2.3-3 4.7-5.6 7-7.6l1.3 1.5ZM184.1 1c1.9-.3 3.7-.2 5.6.5 1.6.6 3 1.2 4.4 2l-.9 1.7a34 34 0 0 0-4.2-1.8c-1.5-.6-3-.7-4.6-.4l-.3-2Z" />
            </svg>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full items-center gap-5"
              >
                <div className="relative flex w-full items-center gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            placeholder={t("input.email_placeholder")}
                            className="placeholder:text-platinum border-transparent bg-white/14 focus:bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="absolute -bottom-6 left-6" />
                      </FormItem>
                    )}
                  />
                  <Button disabled={subscribeMutation.isPending}>
                    {subscribeMutation.isPending
                      ? t("action.subscribe") + "..."
                      : t("action.subscribe")}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <Image
        src={bgBus.src}
        alt="Image"
        fill
        className="object-cover object-bottom"
      />
    </section>
  );
};

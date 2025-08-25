"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Link } from "@/i18n/navigation";
import { anonymousBookingService } from "@/services/anonymous-booking.service";
import { HTTPError } from "ky";

const MIN_AMOUNT = 20;

const CardPaymentSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    trip_id: z.coerce.number().int().min(1, { message: t("trip_id_required") }),
    amount: z.coerce.number().min(MIN_AMOUNT, { message: t("amount_min") }),
    agree: z.boolean().refine((val) => val, { message: t("agree_required") }),
  });

type CardPaymentValues = z.infer<ReturnType<typeof CardPaymentSchema>>;

export const CardPaymentContainer: React.FC = () => {
  const t = useTranslations("card_payment");
  const tAction = useTranslations("action");
  const tLegalLinks = useTranslations("legal_links");

  const form = useForm<CardPaymentValues>({
    resolver: zodResolver(CardPaymentSchema(t)),
    defaultValues: { trip_id: undefined as unknown as number, amount: MIN_AMOUNT, agree: false },
  });

  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: CardPaymentValues) => {
    try {
      setError(null);
      const res = await anonymousBookingService.init({
        trip_id: data.trip_id,
        amount: data.amount,
        note: "Anonymous card payment",
      });
      window.location.href = res.redirect_url;
    } catch (e) {
      if (e instanceof HTTPError) {
        const json = await e.response.json();
        setError(json?.message || "Error");
      } else {
        setError("Error");
      }
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center py-16">
      <h1 className="h1 mb-4 text-center">{t("title")}</h1>
      <p className="mb-8 max-w-xl text-center text-lg">{t("description")}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-md flex-col gap-4">
          <FormField
            control={form.control}
            name="trip_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("trip_id_label")}</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("amount_label")}</FormLabel>
                <FormControl>
                  <Input type="number" min={MIN_AMOUNT} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agree"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  {t.rich("agreement", {
                    privacyPolicy: (chunks) => (
                      <Link href={tLegalLinks("privacy")} className="underline">
                        {chunks}
                      </Link>
                    ),
                  })}
                </FormLabel>
              </FormItem>
            )}
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" disabled={form.formState.isSubmitting} className="mt-2">
            {form.formState.isSubmitting && <LoadingSpinner className="mr-2" />}
            {form.formState.isSubmitting ? tAction("processing") : t("pay")}
          </Button>
        </form>
      </Form>
    </div>
  );
};


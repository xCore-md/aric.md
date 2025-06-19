"use client";
import React from "react";
import Image from "next/image";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmailSubscriptionSection } from "@/components/sections/EmailSubscription";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import bgBusesImage from "@/assets/images/bg-buses.jpg";
import cloudBirdsImage from "@/assets/images/cloud-birds.png";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(2),
  comment: z.string().min(2),
  email: z.string().email(),
});

export const ContactsContainer: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      comment: "",
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    console.log(data);
  }

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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-8"
              >
                <div className="grid gap-4 md:grid-cols-3 md:gap-8">
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Adresa ta de e-mail" {...field} />
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
                </div>

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Comentariu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button>Abonează-te</Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <section className="bg-[#E6ECF1] py-12 md:py-24">
        <div className="container">
          <div className="relative mb-8 aspect-[1312/559]">
            <Image
              src={bgBusesImage.src}
              fill
              className="rounded-2xl object-cover"
              alt="Aric.md"
            />

            <Image
              src={cloudBirdsImage.src}
              width={cloudBirdsImage.width}
              height={cloudBirdsImage.height}
              alt="Aric.md"
              className="absolute -top-16 -left-1/6 hidden h-72 w-auto lg:block"
            />
          </div>
        </div>
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <h2 className="h2">
                Suntem mereu
                <br /> disponibili!
              </h2>
              <div className="mt-10 text-lg">🕔 24/24</div>
            </div>

            <div className="flex h-full flex-col justify-between">
              <div className="bg-blue max-w-max rounded-full px-2.5 py-0.5">
                Adresa de email
              </div>
              <a
                href={`mailto:${123}`}
                className="hover:text-blue max-w-max text-2xl underline-offset-4 transition hover:underline md:text-3xl"
              >
                contact@aric.md
              </a>
            </div>

            <div className="flex h-full flex-col justify-between">
              <div className="bg-blue max-w-max rounded-full px-2.5 py-0.5">
                Telefon
              </div>
              <a
                href={`tel:${123}`}
                className="hover:text-blue max-w-max text-2xl underline-offset-4 transition hover:underline md:text-3xl"
              >
                +373 79 435 990
              </a>
            </div>
          </div>
        </div>
      </section>

      <EmailSubscriptionSection withBg />
    </>
  );
};

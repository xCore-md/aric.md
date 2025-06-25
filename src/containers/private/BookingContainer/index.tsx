"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Check, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PRIVATE_LINK } from "@/utils/constants";
import { Link } from "@/i18n/navigation";
import logoMaib from "@/assets/images/bank/maib.svg";

export const BookingContainer: React.FC = () => {
  const t = useTranslations();

  return (
    <>
      <div className="py-8">
        <h3 className="h3 !mb-0">{t(PRIVATE_LINK.booking.label)}</h3>
      </div>

      <div className="flex grid-cols-3 flex-col gap-8 lg:grid">
        <Card className="ring-platinum col-span-2 ring ring-inset">
          <CardHeader platinum>
            <CardTitle className="h4">Finalizează rezervarea</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* <Collapsible className="bg-back ring-back rounded ring-8">
                <CollapsibleTrigger className="text-lg font-semibold">
                  Datele tale personale:
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 grid gap-6 sm:grid-cols-2">
                  <Input
                    className="h-16"
                    placeholder="Telefon"
                    disabled
                    value={profileData?.data?.phone || ""}
                  />
                  <Input
                    className="h-16"
                    placeholder="Email"
                    disabled
                    value={profileData?.data?.email || ""}
                  />
                  <Input
                    className="h-16"
                    placeholder="Nume *"
                    disabled
                    value={profileData?.data?.first_name || ""}
                  />
                  <Input
                    className="h-16"
                    placeholder="Prenume *"
                    disabled
                    value={profileData?.data?.last_name || ""}
                  />
                </CollapsibleContent>
              </Collapsible> */}

              {/* <div className="space-y-4">
                <div className="text-lg font-semibold">
                  Datele tale personale:
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Input className="h-16" placeholder="Telefon" />
                  <Input className="h-16" placeholder="Email" />
                  <Input className="h-16" placeholder="Nume *" />
                  <Input className="h-16" placeholder="Prenume *" />
                </div>
              </div> */}

              <div className="space-y-4">
                <div className="text-lg font-semibold">Date pasager:</div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Input className="h-16" placeholder="Nume *" />
                  <Input className="h-16" placeholder="Prenume *" />
                </div>
              </div>
            </div>

            <div className="my-8 space-y-12 border-y border-dashed py-8">
              <div className="space-y-4">
                <div className="text-lg font-semibold">1. Alegeți moneda:</div>

                <RadioGroup defaultValue="option-one123">
                  <div className="flex flex-wrap gap-6">
                    <label
                      htmlFor="option-one"
                      className="bg-back flex items-center gap-2 rounded-full border p-4 font-bold"
                    >
                      <RadioGroupItem value="option-one" id="option-one" />
                      <span>120 MDL</span>

                      <div className="relative ml-12 size-6 flex-none overflow-hidden rounded-full">
                        <Image
                          src="https://placehold.co/60x400/png"
                          alt="Image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div className="text-lg font-semibold">2. Metoda de plată:</div>

                <RadioGroup defaultValue="option-one123">
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <label
                      htmlFor="option-one"
                      className="flex items-center gap-2 font-bold"
                    >
                      <RadioGroupItem value="option-one" id="option-one" />
                      <span>Achitare online</span>
                    </label>
                    <label
                      htmlFor="option-one"
                      className="flex items-center gap-2 font-bold"
                    >
                      <RadioGroupItem value="option-one" id="option-one" />
                      <span>Rezervare</span>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div className="text-lg font-semibold">
                  3. Alegeți o poartă de plată:
                </div>

                <RadioGroup defaultValue="option-one">
                  <div className="flex flex-wrap gap-6">
                    <RadioGroupItem
                      value="maib"
                      id="maib"
                      className="sr-only data-[state=checked]:[&+label]:shadow data-[state=checked]:[&+label]:ring-2"
                    />

                    <label
                      htmlFor="maib"
                      className="bg-back ring-blue shadow-blue/10 flex h-14 items-center gap-2 rounded-full p-3 font-bold"
                    >
                      <div className="relative h-full w-28 flex-none overflow-hidden rounded-full">
                        <Image
                          src={logoMaib.src}
                          alt="MAIB"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <Collapsible>
              <CollapsibleTrigger className="hover:text-blue data-[state=open]:text-blue bg-back mt-6 flex w-full cursor-pointer items-center justify-between gap-1 rounded-full px-6 py-4 font-semibold transition data-[state=open]:rounded-t-2xl data-[state=open]:rounded-b-none [&[data-state=open]>svg]:rotate-90">
                <span>Informații despre bilet</span>
                <ChevronRightIcon className="size-5" />
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-back rounded-b-2xl px-6 pb-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>1. Traseu</div>
                    <div className="border-platinum ml-8 space-y-4 border-l pl-8">
                      <div className="relative flex items-center gap-2">
                        <div className="-ml-9 flex w-32 items-center gap-8">
                          <div className="bg-back absolute top-0 h-[calc(50%_-_theme(spacing.1))] w-2" />
                          <div className="border-blue size-2 rounded-full border bg-white" />
                          <div className="font-semibold">Chișinău</div>
                        </div>

                        <div className="text-text-gray">
                          Stația &#34;NORD&#34;, str. Calea Mosilor 2/1
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="-ml-9 flex w-32 items-center gap-8">
                          <div className="bg-blue size-2 rounded-full" />
                          <div>Chișinău</div>
                        </div>

                        <div className="text-text-gray">
                          Stația &#34;NORD&#34;, str. Calea Mosilor 2/1
                        </div>
                      </div>

                      <div className="relative flex items-center gap-2">
                        <div className="-ml-9 flex w-32 items-center gap-8">
                          <div className="bg-back absolute bottom-0 h-[calc(50%_-_theme(spacing.1))] w-2" />
                          <div className="bg-blue size-2 rounded-full" />
                          <div className="font-semibold">Chișinău</div>
                        </div>

                        <div className="text-text-gray">
                          Stația &#34;NORD&#34;, str. Calea Mosilor 2/1
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>2. Servicii disponibile:</div>
                    <ul className="flex flex-wrap gap-2 gap-x-6">
                      {[
                        "Wi-fi",
                        "Un bagaj gratis",
                        "Bilet în telefon",
                        "Muzică",
                        "USB încărcător",
                      ]?.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="bg-yellow flex size-5 items-center justify-center rounded-full">
                            <Check className="size-4 stroke-white" />
                          </div>
                          <div className="text-sm font-medium">{item}</div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div>3. Condiții de returnare:</div>
                    <p className="text-text-gray">
                      Pînă la 24 ora, pînă la plecare: 150 MDL
                      <br />
                      Din 24 ora. pînă la 12 ora. pînă la plecare: 90 MDL
                      <br />
                      Mai puțin 12 ora. pînă la plecare: biletul nu se întoarce
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        <Card className="ring-blue max-h-max ring ring-inset">
          <CardHeader>
            <CardTitle className="h4">Comanda 10756023</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-back grid grid-cols-2 rounded-3xl px-6 py-4">
                <div className="">
                  <div className="font-semibold">Data plecării:</div>
                  <div className="text-text-gray">02 Mai 2025</div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">Data sosirii:</div>
                  <div className="text-text-gray">03 Mai 2025</div>
                </div>
              </div>

              <div className="bg-back rounded-3xl px-6 py-4">
                <div className="font-semibold">Stații:</div>
                <div className="mt-4 flex items-center justify-between gap-10">
                  <div className="">
                    <div className="flex items-center">
                      <div className="w-5 text-lg font-semibold">⚲</div>
                      <div className="text-lg font-medium">Chișinău</div>
                    </div>

                    <div className="text-text-gray ml-5">
                      Stația &#34;NORD&#34;,
                      <br /> str. Calea Mosilor 2/1
                    </div>
                  </div>

                  <div className="font-semibold">01:00</div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-10">
                  <div className="">
                    <div className="flex items-center">
                      <div className="w-5 text-lg font-semibold">⚲</div>
                      <div className="text-lg font-medium">Chișinău</div>
                    </div>

                    <div className="text-text-gray ml-5">
                      Stația &#34;NORD&#34;,
                      <br /> str. Calea Mosilor 2/1
                    </div>
                  </div>

                  <div className="font-semibold">01:00</div>
                </div>
              </div>

              <div className="border-blue bg-back flex items-center justify-between gap-2 rounded-full border px-6 py-4 font-semibold">
                <div>Prețul:</div>
                <div>120 MDL</div>
              </div>

              <div className="flex gap-4 border-t py-6">
                <Checkbox />

                <p className="text-text-gray -mt-0.5">
                  Sunt de acord cu{" "}
                  <Link
                    className="text-blue underline-offset-2 transition hover:underline"
                    href="/legal/terms"
                  >
                    Termenii și condițiile generale
                  </Link>{" "}
                  conform{" "}
                  <Link
                    className="text-blue underline-offset-2 transition hover:underline"
                    href="/legal/privacy"
                  >
                    Politicii de confidențialitate
                  </Link>
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Achită
                <ChevronRightIcon />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error */}
      <Card className="ring-platinum ring ring-inset">
        <CardContent className="py-10">
          <svg viewBox="0 0 80 80" className="fill-red mx-auto mb-6 size-20">
            <path
              d="M40 0C17.909 0 0 17.909 0 40s17.909 40 40 40 40-17.909 40-40S62.091 0 40 0ZM25.172 25.172a4 4 0 0 1 5.656 0L40 34.343l9.172-9.171a4 4 0 1 1 5.656 5.656L45.657 40l9.171 9.172a4 4 0 0 1-5.656 5.656L40 45.657l-9.172 9.171a4 4 0 0 1-5.656-5.656L34.343 40l-9.171-9.172a4 4 0 0 1 0-5.656Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>

          <div className="h3 text-center">
            Plata dumneavoastră a eșuat.
            <br /> Vă rugăm să încercați din nou.
          </div>

          <div className="mx-auto mt-12 max-w-2xl text-center text-2xl">
            Vă rugăm să verificați datele introduse sau să încercați din nou.
            Dacă problema persistă, contactați-ne pentru asistență.
          </div>
        </CardContent>
      </Card>

      {/* Success */}
      <Card className="ring-platinum ring ring-inset">
        <CardContent className="py-10">
          <svg viewBox="0 0 80 80" className="fill-green mx-auto mb-6 size-20">
            <path d="M40 0a40 40 0 1 0 40 40A40.042 40.042 0 0 0 40 0Zm17.562 32.946L36.023 54.485a3.077 3.077 0 0 1-4.354 0l-9.23-9.231a3.078 3.078 0 1 1 4.353-4.354l7.054 7.058 19.362-19.366a3.08 3.08 0 0 1 5.255 2.177 3.08 3.08 0 0 1-.901 2.177Z" />
          </svg>

          <div className="h3 text-center">
            Plata dumneavoastră a fost efectuată cu succes!
          </div>

          <div className="mt-12">
            <div className="mx-auto w-full max-w-3xl space-y-6 rounded-2xl border border-dashed px-16 py-8 shadow-xl shadow-black/5">
              <div className="h4">Bilet ID 07564</div>

              <div className="bg-back grid grid-cols-2 rounded-3xl px-6 py-4">
                <div className="">
                  <div className="font-semibold">Nr. Invoice</div>
                  <div className="text-text-gray">INV567489240UI</div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">Metoda de plată</div>
                  <div className="text-text-gray">MAIB</div>
                </div>
              </div>

              <div className="bg-back grid grid-cols-2 rounded-3xl px-6 py-4">
                <div className="">
                  <div className="font-semibold">Nr. Invoice</div>
                  <div className="text-text-gray">INV567489240UI</div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">Metoda de plată</div>
                  <div className="text-text-gray">MAIB</div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-10 border-t pt-6">
                <Button variant="reverse">Descarcă bilet</Button>
                <Button>Pagina principală</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

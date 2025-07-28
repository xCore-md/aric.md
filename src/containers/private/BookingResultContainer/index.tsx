import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const BookingResultContainer: React.FC<{ type: "success" | "error" }> = ({ type }) => {
  if (type === "success") {
    return (
      <Card className="ring-platinum ring ring-inset">
        <CardContent className="py-10">
          <svg viewBox="0 0 80 80" className="fill-green mx-auto mb-6 size-20">
            <path d="M40 0a40 40 0 1 0 40 40A40.042 40.042 0 0 0 40 0Zm17.562 32.946L36.023 54.485a3.077 3.077 0 0 1-4.354 0l-9.23-9.231a3.078 3.078 0 1 1 4.353-4.354l7.054 7.058 19.362-19.366a3.08 3.08 0 0 1 5.255 2.177 3.08 3.08 0 0 1-.901 2.177Z" />
          </svg>
          <div className="h3 text-center">Plata dumneavoastră a fost efectuată cu succes!</div>
          <div className="mt-12">
            <div className="mx-auto w-full max-w-3xl space-y-6 rounded-2xl border border-dashed px-16 py-8 shadow-xl shadow-black/5">
              <div className="h4">Bilet ID 07564</div>
              <div className="bg-back grid grid-cols-2 rounded-3xl px-6 py-4">
                <div>
                  <div className="font-semibold">Nr. Invoice</div>
                  <div className="text-text-gray">INV567489240UI</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">Metoda de plată</div>
                  <div className="text-text-gray">MAIB</div>
                </div>
              </div>
              <div className="bg-back grid grid-cols-2 rounded-3xl px-6 py-4">
                <div>
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
    );
  }

  return (
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
          Vă rugăm să verificați datele introduse sau să încercați din nou. Dacă problema persistă, contactați-ne pentru asistență.
        </div>
      </CardContent>
    </Card>
  );
};


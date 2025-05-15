import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";

import heroBackground from "@/assets/images/hero.jpg";

export default function Page() {
  const t = useTranslations();
  return (
    <>
      <div className="rounded-b-3xl overflow-hidden relative min-h-[70vh]">
        <div className="container">
          <div className="relative z-10">
            <h1>Cumpără ușor biletul de autobuz online!</h1>
            <p>Curse regulate, microbuze confortabile și orare flexibile!</p>
            <Button>{t("title")}</Button>
          </div>
        </div>

        <Image
          src={heroBackground.src}
          alt="Description of image"
          fill
          className="object-cover"
        />
      </div>

      <div className="section">
        <h2>Planifică-ți călătoria perfectă!</h2>
        <p>
          Căutați și cumpărați bilete către cele mai populare destinații ale
          noastre
        </p>

        <div className="grid relative">
          <div>
            888787
            <Image
              src={"https://placehold.co/600x400/png"}
              alt="Image"
              fill
              className=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

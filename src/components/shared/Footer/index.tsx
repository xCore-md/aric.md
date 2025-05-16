"use client";
import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

import logo from "@/assets/images/logo.svg";
import { Button } from "@/components/ui/button";

export const Footer: React.FC = () => {
  return (
    <div className="mt-auto">
      <footer className="mt-28 bg-black p-14">
        <div className="container">
          <div className="grid grid-cols-2 gap-48">
            <div className="">
              <Link href="/" className="w-24 flex">
                <Image
                  src={logo}
                  alt="Aric.md"
                  width={logo.width}
                  height={logo.height}
                />
              </Link>

              <div className="text-platinum mt-8">
                Rezervă-ți locul ușor și bucură-te de o călătorie sigură și
                confortabilă. Microbuze moderne, orare flexibile și rezervare
                rapidă online — tot ce ai nevoie pentru un drum fără griji.
              </div>

              <Button asChild>
                <Link href="/">Despre noi</Link>
              </Button>
            </div>

            <div className="bg-red h-30 w-full"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

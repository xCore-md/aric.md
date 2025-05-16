"use client";
import React from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";

import logo from "@/assets/images/logo-white.svg";
import { cn } from "@/lib/utils";

export const Header: React.FC<{ isHomePage?: boolean }> = ({ isHomePage }) => {
  const pathname = usePathname();

  if ((isHomePage && pathname !== "/") || (!isHomePage && pathname === "/"))
    return null;

  return (
    <header>
      <div className={cn("mt-5", !isHomePage && "bg-white mt-0")}>
        <div className="container">
          <div
            className={cn(
              "flex items-center gap-8 text-sm font-medium py-3",
              isHomePage && "bg-white px-8 rounded-full",
            )}
          >
            <a
              href="mailto:contact@aric.md"
              className="flex items-center gap-1"
            >
              <span>📩</span>
              <span>contact@aric.md</span>
            </a>

            <a href="tel:+37379435990" className="flex items-center gap-1">
              <span>📞</span>
              <span>+373 79 435 990</span>
            </a>

            <div className="ml-auto flex items-center gap-1">
              <span>🕔</span>
              <span>Mereu disponibili 24/24</span>
            </div>
          </div>
        </div>
      </div>

      <div className={cn(!isHomePage && "bg-black")}>
        <div className="container">
          <nav className="flex items-center justify-between text-white py-6">
            <Link href="/" className="w-24 flex">
              <Image
                src={logo}
                alt="Aric.md"
                width={logo.width}
                height={logo.height}
              />
            </Link>

            <ul className="flex items-center gap-8">
              <li>
                <Link href="/">Acasă</Link>
              </li>
              <li>
                <Link href="/about">Despre noi</Link>
              </li>
              <li>
                <Link href="/">Întrebări și răspunsuri</Link>
              </li>
              <li>
                <Link href="/">Contacte</Link>
              </li>
            </ul>

            <div>123</div>
          </nav>
        </div>
      </div>
    </header>
  );
};

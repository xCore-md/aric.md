import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

import logo from "@/assets/images/logo-white.svg";

export const Header: React.FC = () => {
  return (
    <header>
      <div className="container">
        <div className="bg-red-500">
          <div className="flex items-center gap-8">
            <a href="mailto:contact@aric.md">
              <span>📩</span>
              <span>contact@aric.md</span>
            </a>

            <a href="tel:+37379435990">
              <span>📞</span>
              <span>+373 79 435 990</span>
            </a>

            <div className="ml-auto">
              <span>🕔</span>
              <span>Mereu disponibili 24/24</span>
            </div>
          </div>
        </div>

        <nav className="flex items-center justify-between bg-black text-white">
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
              <Link href="/">Despre noi</Link>
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
    </header>
  );
};

import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo-black.svg";
import image from "@/assets/images/auth-wall.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

export const AuthForm: React.FC = () => {
  const [timer, setTimer] = React.useState(180); // 3 minute în secunde
  const [canResend, setCanResend] = React.useState(false);

  React.useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (!canResend) return;
    setTimer(180);
    setCanResend(false);

    console.log("Cod OTP retrimis");
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="grid h-full w-full grid-cols-2">
      <div className="pr-24">
        <Image
          className="w-24"
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt="Aric.md"
        />
        <h1 className="h2 mt-12">Conectează-te</h1>

        <form action="" className="space-y-4">
          <p className="text-text-gray">
            Pentru autentificare îți vom trimite o parolă de unică folosință pe
            numărul tău de telefon mobil
          </p>
          <InputOTPPattern />

          <Input placeholder="+373 | 000 00 000" className="h-16" />

          <Button type="submit" size="lg" className="w-full">
            Trimite OTP
            <ChevronRightIcon />
          </Button>

          <Button type="submit" size="lg">
            Verifică
            <ChevronRightIcon />
          </Button>
        </form>

        <div className="mt-auto space-y-4">
          <div className="text-2xl">📩 Nu ai primit codul OTP?</div>
          <Button variant="reverse" className="gap-4" onClick={handleResend}>
            {!canResend && (
              <span className="inline-block w-10">{formatTime(timer)}</span>
            )}
            <span>Retrimite codul</span>
          </Button>
        </div>
      </div>

      <div className="relative h-full overflow-hidden rounded-lg">
        <Image
          src={image.src}
          alt="Image"
          fill
          className="object-cover object-center"
        />
      </div>
    </div>
  );
};

import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function InputOTPPattern() {
  return (
    <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
}

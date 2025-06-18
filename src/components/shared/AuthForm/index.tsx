import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo-black.svg";
import image from "@/assets/images/auth-wall.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { SendCodePayload, VerifyCodePayload } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useLocale } from "next-intl";
import { signIn } from "next-auth/react";
import { profileService } from "@/services/profile.service";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";

const FormSchema = z.object({
  code: z.string().min(6).max(6).nullable(),
  email: z.union([z.literal(""), z.string().email()]),
  phone: z.string().min(8).max(8),
});

const MOLDOVA_PHONE_CODE = "+373";

export const AuthForm: React.FC<{ onDialogClose?: () => void }> = ({
  onDialogClose,
}) => {
  const { push } = useRouter();
  const locale = useLocale();
  const [timer, setTimer] = React.useState(0);
  const [canResend, setCanResend] = React.useState(false);
  const [step, setStep] = React.useState<"phone" | "code" | "email">("phone");

  const mutationSendVerificationCode = useMutation({
    mutationFn: (data: SendCodePayload) =>
      authService.sendVerificationCode(data),
    onSuccess: (res) => {
      setTimer(res.data.expires_in);
      setStep("code");
    },
  });

  const mutationVerifyCode = useMutation({
    mutationFn: (data: VerifyCodePayload) => authService.verify(data),
    onSuccess: async (res) => {
      const response = await signIn("credentials", {
        token: JSON.stringify(res?.data?.token),
        user: JSON.stringify(res?.data?.user),
        redirect: false,
      });

      if (response.ok && !res?.data?.user?.email) {
        setStep("email");
      } else {
        push("/booking");
        onDialogClose?.();
      }
    },
  });

  const mutationUpdateEmail = useMutation({
    mutationFn: (email: string) => profileService.updateEmail(email),
    onSuccess: (res) => {
      push("/booking");
      onDialogClose?.();
      toast.success("Email updated!");
    },
  });

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

  // ********************************************
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      email: "",
      code: null,
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  console.log({ errors });

  const phone = watch("phone");
  const code = watch("code");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const phoneWithoutSpaces = phone.replace(/\s+/g, "");

    if (phone && step === "phone") {
      mutationSendVerificationCode.mutate({
        phone: MOLDOVA_PHONE_CODE + phoneWithoutSpaces,
        language: locale,
      });

      return;
    }

    if (code && step === "code") {
      mutationVerifyCode.mutate({
        phone: MOLDOVA_PHONE_CODE + phoneWithoutSpaces,
        code,
        language: locale,
      });
      return;
    }

    if (data?.email && step === "email") {
      mutationUpdateEmail.mutate(data?.email);
      return;
    }

    console.log("onSubmit data", data);
  }

  return (
    <div className="grid h-full w-full md:grid-cols-2">
      <div className="md:pr-24">
        <Image
          className="w-24"
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt="Aric.md"
        />
        <h1 className="h2 mt-12">
          {step === "email" ? "Adaugă adresa de e-mail" : "Conectează-te"}
        </h1>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {step === "phone" && (
              <>
                <p className="text-text-gray mb-10">
                  Pentru autentificare îți vom trimite o parolă de unică
                  folosință pe numărul tău de telefon mobil
                </p>

                {mutationSendVerificationCode.isPending ? (
                  <div className="flex h-32">
                    <div className="loader m-auto" />
                  </div>
                ) : (
                  <>
                    <FormField
                      control={control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="000 00 000"
                                className="h-16 pl-18"
                                {...field}
                                value={field?.value || ""}
                              />

                              <div className="absolute top-1/2 left-5 flex -translate-y-1/2">
                                +373 |
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full">
                      Trimite OTP
                      <ChevronRightIcon />
                    </Button>
                  </>
                )}
              </>
            )}

            {step === "code" && (
              <>
                <p className="text-text-gray mb-10">
                  Introduceți codul OTP trimis la{" "}
                  <span className="font-semibold text-black">
                    {MOLDOVA_PHONE_CODE + " " + phone}
                  </span>
                </p>

                {mutationVerifyCode?.isPending ? (
                  <div className="flex h-32">
                    <div className="loader m-auto" />
                  </div>
                ) : (
                  <>
                    <FormField
                      control={control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputOTP
                              maxLength={6}
                              pattern={REGEXP_ONLY_DIGITS}
                              {...field}
                              value={field?.value || ""}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg">
                      Verifică
                      <ChevronRightIcon />
                    </Button>

                    <div className="mt-auto space-y-4">
                      <div className="text-2xl">📩 Nu ai primit codul OTP?</div>
                      <Button
                        variant="reverse"
                        className="gap-4"
                        onClick={handleResend}
                      >
                        {!canResend && (
                          <span className="inline-block w-10">
                            {formatTime(timer)}
                          </span>
                        )}
                        <span>Retrimite codul</span>
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}

            {step === "email" && (
              <>
                <p className="text-text-gray mb-10">
                  Te rugăm să introduci adresa de email unde vom trimite
                  biletele tale.
                </p>

                {mutationUpdateEmail.isPending ? (
                  <div className="flex h-32">
                    <div className="loader m-auto" />
                  </div>
                ) : (
                  <>
                    <FormField
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="E-mail"
                              className="h-16"
                              {...field}
                              value={field?.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full">
                      Adaugă
                      <ChevronRightIcon />
                    </Button>
                  </>
                )}
              </>
            )}
          </form>
        </Form>
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

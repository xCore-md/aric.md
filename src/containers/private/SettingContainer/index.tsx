"use client";
import React from "react";
import { useLocale, useTranslations } from "use-intl";
import {
  MOLDOVA_PHONE_CODE,
  PRIVATE_LINK,
  QUERY_KEYS,
} from "@/utils/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  FormField,
  FormItem,
  Form,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { profileService } from "@/services/profile.service";
import { removeMoldovaPrefix } from "@/utils";
import { User } from "@/types";

const formSchema = z.object({
  phone: z.string(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
});

export const SettingContainer: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      email: "",
      first_name: "",
      last_name: "",
    },
  });

  const { reset, handleSubmit, control } = form;

  const { data: profileData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.profile],
    queryFn: () => profileService.get(),
  });

  const updateProfileData = useMutation({
    mutationFn: (data: Partial<User>) => profileService.update(data),
    onSuccess: () => toast.success("Profile updated!"),
  });

  console.log("🔍 errors:", form.formState.errors);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    updateProfileData.mutate({
      ...values,
      phone: MOLDOVA_PHONE_CODE + values.phone.replace(/\s+/g, ""),
      language: locale,
    });
  }

  React.useEffect(() => {
    if (profileData) {
      const { data } = profileData;
      reset({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        phone: removeMoldovaPrefix(data.phone) || "",
        email: data.email || "",
      });
    }
  }, [profileData]);

  return (
    <>
      <div className="py-8">
        <h3 className="h3 !mb-0">{t(PRIVATE_LINK.settings.label)}</h3>
      </div>

      <Card className="ring-platinum ring ring-inset">
        <CardHeader platinum>
          <CardTitle className="h4">Datele tale personale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  {isLoading ? (
                    <>
                      <div className="skeleton h-16 rounded-full" />
                      <div className="skeleton h-16 rounded-full" />
                      <div className="skeleton h-16 rounded-full" />
                      <div className="skeleton h-16 rounded-full" />
                    </>
                  ) : (
                    <>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="000 00 000"
                                  className="h-16 pl-18"
                                  disabled
                                  {...field}
                                  value={field?.value || ""}
                                />

                                <div className="text-text-gray absolute top-1/2 left-5 flex -translate-y-1/2">
                                  +373 |
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="h-16"
                                placeholder="Email *"
                                disabled={Boolean(profileData?.data.email)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="h-16"
                                placeholder="Nume de familie *"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="h-16"
                                placeholder="Prenume *"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <div className="col-span-full">
                    {isLoading ? (
                      <div className="skeleton h-12 max-w-56 rounded-full" />
                    ) : (
                      <div className="flex">
                        <Button
                          type="submit"
                          disabled={updateProfileData.isPending}
                        >
                          Salvează modificările
                        </Button>

                        {updateProfileData.isPending && (
                          <div className="loader scale-60" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

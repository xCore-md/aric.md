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
import { MoldovaPhoneInput } from "@/components/shared/MoldovaPhoneInput";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  FormField,
  FormItem,
  Form,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/services/profile.service";
import { removeMoldovaPrefix } from "@/utils";
import { User } from "@/types";

const formSchema = z.object({
  phone: z.string(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  timezone: z.string(),
});

export const SettingContainer: React.FC = () => {
  const queryClient = useQueryClient();
  const t = useTranslations();
  const locale = useLocale();
  const timezones = React.useMemo(
    () => Intl.supportedValuesOf("timeZone"),
    []
  );
  const defaultTimezone = React.useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    []
  );

  const [search, setSearch] = React.useState("");
  const filteredTimezones = React.useMemo(
    () =>
      timezones.filter((tz) =>
        tz.toLowerCase().includes(search.toLowerCase())
      ),
    [timezones, search]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      email: "",
      first_name: "",
      last_name: "",
      timezone: defaultTimezone,
    },
  });

  const { reset, handleSubmit, control } = form;

  const { data: profileData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.profile],
    queryFn: () => profileService.get(),
  });

  const updateProfileData = useMutation({
    mutationFn: (data: Partial<User>) => profileService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.profile],
      });
      toast.success(t("$Profile updated!"));
    },
  });

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
        timezone: data.timezone || defaultTimezone,
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
          <CardTitle className="h4">{t("$Datele tale personale")}</CardTitle>
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
                              <MoldovaPhoneInput
                                placeholder={t("input.phone_placeholder")}
                                className="h-16"
                                disabled
                                {...field}
                                value={field?.value || ""}
                              />
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
                                placeholder={`${t("input.email_field_label")} *`}
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
                                placeholder={`${t("$Nume de familie")} *`}
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
                                placeholder={`${t("$Prenume")} *`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name="timezone"
                        render={({ field }) => (
                          <FormItem className="sm:col-span-2">
                            <FormLabel>{t("$Fus orar")}</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              onOpenChange={(open) => !open && setSearch("")}
                            >
                              <FormControl>
                                <SelectTrigger className="h-16 w-full rounded-full border bg-white px-5 py-1 data-[size=default]:h-16 data-[size=sm]:h-16">
                                  <SelectValue
                                    placeholder={t("$Fus orar")}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-64">
                                <div className="sticky top-0 z-10 bg-white p-2">
                                  <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={t("action.search")}
                                    className="h-10"
                                  />
                                </div>
                                {filteredTimezones.map((tz) => (
                                  <SelectItem key={tz} value={tz}>
                                    {tz}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                          {t("$Salvează modificările")}
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

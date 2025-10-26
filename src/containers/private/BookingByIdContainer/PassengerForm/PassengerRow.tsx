"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/shared/phone-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

type PassengerRowProps = {
  index: number;
  realIndex: number;
  onRemove: () => void;
  hideRemoveButton?: boolean;
};

export const PassengerRow: React.FC<PassengerRowProps> = ({
  index,
  realIndex,
  onRemove,
  hideRemoveButton = false,
}) => {
  const { control } = useFormContext();
  const t = useTranslations();

  return (
    <div className="flex h-full w-full items-center gap-2 rounded-lg bg-white p-2">
      <div className="bg-blue/10 flex h-7 min-w-7 items-center justify-center rounded-full text-sm font-medium">
        {index + 1}
      </div>
      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
        {/* last_name */}
        <FormField
          control={control}
          name={`passengers.new.${realIndex}.last_name`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t("$Nume de familie")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* first_name */}
        <FormField
          control={control}
          name={`passengers.new.${realIndex}.first_name`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t("$Prenume")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* phone */}
        <FormField
          control={control}
          name={`passengers.new.${realIndex}.phone`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PhoneInput
                  placeholder={t("input.phone_placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Delete */}
      <Button
        variant="ghost"
        size="sm-icon"
        type="button"
        className="text-red disabled:text-gray-300"
        onClick={onRemove}
        disabled={hideRemoveButton}
      >
        <Delete />
      </Button>
    </div>
  );
};

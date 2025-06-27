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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns/format";
import { Calendar } from "@/components/ui/calendar";
import { Delete } from "lucide-react";

type PassengerRowProps = {
  index: number;
  minDate: Date;
  maxDate: Date;
  onRemove: () => void;
};

export const PassengerRow: React.FC<PassengerRowProps> = ({
  index,
  minDate,
  maxDate,
  onRemove,
}) => {
  const { control } = useFormContext();
  const t = useTranslations();

  return (
    <div className="flex items-center gap-4">
      {/* last_name */}
      <FormField
        control={control}
        name={`passengers.new.${index}.last_name`}
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
        name={`passengers.new.${index}.first_name`}
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
        name={`passengers.new.${index}.phone`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <PhoneInput placeholder="Telefon" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* birth_date */}
      <FormField
        control={control}
        name={`passengers.new.${index}.birth_date`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="ml-auto w-full max-w-56">
                    {field.value
                      ? format(field.value, "dd.MM.yyyy")
                      : t("$Data nasterii")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    defaultMonth={maxDate}
                    onSelect={field.onChange}
                    captionLayout="dropdown"
                    className="rounded-md border"
                    disabled={{ before: minDate, after: maxDate }}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Delete */}
      <Button
        variant="ghost"
        size="sm"
        type="button"
        className="text-red"
        onClick={onRemove}
      >
        <Delete />
      </Button>
    </div>
  );
};

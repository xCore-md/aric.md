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
import { Delete, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PassengerRowProps = {
  index: number;
  realIndex: number;
  minDate: Date;
  maxDate: Date;
  onRemove: () => void;
  hideRemoveButton?: boolean;
};

export const PassengerRow: React.FC<PassengerRowProps> = ({
  index,
  realIndex,
  minDate,
  maxDate,
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

        {/* birth_date */}
        <FormField
          control={control}
          name={`passengers.new.${realIndex}.birth_date`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "flex h-12 w-full min-w-0 items-center rounded-full border border-input bg-white px-5 py-1 text-left transition-[color,box-shadow] outline-none",
                        "focus-visible:border-ring focus-visible:ring-ring/50 ring-inset focus-visible:ring-1",
                        "hover:bg-gray-50",
                        !field.value && "text-text-gray"
                      )}
                    >
                      <CalendarIcon className={cn("mr-2 h-4 w-4 flex-shrink-0", !field.value && "opacity-50")} />
                      <span>
                        {field.value
                          ? format(field.value, "dd.MM.yyyy")
                          : t("$Data nasterii")}
                      </span>
                    </button>
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

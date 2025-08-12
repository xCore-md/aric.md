"use client";
import React from "react";
import { useTranslations } from "use-intl";
import {
  //MOLDOVA_PHONE_CODE,
  PRIVATE_LINK,
  QUERY_KEYS,
} from "@/utils/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { passengerService } from "@/services/passenger.service";
import { Passenger, PassengerUpdateDto } from "@/types/passenger.types";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import { removeMoldovaPrefix } from "@/utils";
import { MoldovaPhoneInput } from "@/components/shared/MoldovaPhoneInput";
import { useFormatUTCToLocal } from "@/hooks/useFormatUTCToLocal ";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { isValid } from "date-fns/isValid";
import { formatISO } from "date-fns/formatISO";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationUI } from "@/components/shared/pagination-ui";
import { usePagination } from "@/hooks/usePagination";
import { parseAsString, useQueryState } from "nuqs";

export const PassengersContainer: React.FC = () => {
  const queryClient = useQueryClient();
  const t = useTranslations();
  const { per_page, page, updateLimit, updatePage } = usePagination({
    defaultLimit: 5,
  });
  const [type, setType] = useQueryState(
    "type",
    parseAsString.withDefault("")
  );

  const cleanParams = (obj: Record<string, any>) => {
    const res: Record<string, any> = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "all" &&
        value !== "undefined" &&
        value !== "null"
      ) {
        res[key] = value;
      }
    });
    return res;
  };

  const { data: passengers, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.passengers, page, per_page, type],
    queryFn: () =>
      passengerService.getAll(
        cleanParams({ page, per_page, type })
      ),
  });

  const totalPassengers = passengers?.meta?.total ?? passengers?.total;

  const handleTypeChange = (value: string) => {
    setType(value === "all" ? "" : value);
    updatePage(1);
  };

  const updatePassenger = useMutation({
    mutationFn: passengerService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.passengers],
        exact: false,
      });
    },
  });

  return (
    <>
      <div className="py-8">
        <h3 className="h3 !mb-0">{t(PRIVATE_LINK.passengers.label)}</h3>
      </div>

      <Card className="ring-platinum ring ring-inset">
        <CardContent className="">
          <div className="mb-4 flex justify-end">
            <Select value={type || "all"} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder={t("$Toți")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("$Toți")}</SelectItem>
                <SelectItem value="adult">{t("$Adulți")}</SelectItem>
                <SelectItem value="child">{t("$Copii")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <table className="table">
            <thead className="thead hidden lg:table-header-group [&_th]:last:text-right">
              <tr>
                <th>{t("$Nume")}</th>
                <th>{t("$Prenume")}</th>
                <th>{t("$Telefon")}</th>
                <th>{t("$Data nașterii")}</th>
                <th>{t("$Acțiuni")}</th>
              </tr>
            </thead>
            {/* Corp tabel – carduri pe mobil */}
            <tbody className="tbody lg:table-row-group">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr
                    key={index}
                    className="relative h-16 rounded-xl lg:table-row lg:rounded-none"
                  >
                    <td colSpan={6} className="skeleton lg:table-cell" />
                  </tr>
                ))
              ) : (
                <>
                  {passengers?.data?.map((passenger) => (
                    <PassengerRow
                      key={passenger.id}
                      onChange={(values) => updatePassenger.mutate(values)}
                      data={passenger}
                      loading={updatePassenger.isPending}
                    />
                  ))}
                </>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {totalPassengers ? (
        <div className="mt-6">
          <PaginationUI
            totalItems={totalPassengers}
            page={page}
            perPage={per_page}
            onPageChange={updatePage}
            onPageSizeChange={updateLimit}
            pageSizeOptions={[5, 10, 15]}
            showPageSize
          />
        </div>
      ) : null}
    </>
  );
};

const PassengerRow: React.FC<{
  onChange: (values: PassengerUpdateDto) => void;
  data: Passenger;
  loading?: boolean;
}> = ({ data, onChange, loading }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const { formatUTC } = useFormatUTCToLocal();
  const t = useTranslations();

  const [edit, setEdit] = React.useState(false);
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [birth_date, setBirthDate] = React.useState("");

  const refInput = React.useRef<HTMLInputElement>(null);

  const saveChange = () => {
    onChange({
      id: data?.id,
      first_name,
      last_name,
      birth_date: formatISO(birth_date),
      phone: phone.replace(/\s+/g, ""),
    });
    setEdit(false);
  };

  const cancelEdit = () => {
    setFirstName(data.first_name || "");
    setLastName(data.last_name || "");
    setPhone(removeMoldovaPrefix(data.phone || ""));
    setBirthDate(data.birth_date || "");
    setEdit(false);
  };

  React.useEffect(() => {
    if (edit) {
      refInput?.current?.focus();
    }
  }, [edit]);

  const deletePassenger = useMutation({
    mutationFn: passengerService.delete,
    onSuccess: () => {
      toast.success("Sters");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.passengers],
        exact: false,
      });
      setOpen(false);
    },
  });

  const handleChangeBirthDate = (date?: Date) => {
    setBirthDate(date ? format(date, "yyyy-MM-dd") : "");
  };

  const selectedDate = React.useMemo(() => {
    if (!birth_date) return undefined;

    const parsed = parse(birth_date, "yyyy-MM-dd", new Date());
    return isValid(parsed) ? parsed : undefined;
  }, [birth_date]);

  const handleDelete = () => {
    if (data.id) deletePassenger.mutate(data.id);
  };

  React.useEffect(() => {
    if (!data) return;

    setFirstName(data.first_name || "");
    setLastName(data.last_name || "");
    setPhone(removeMoldovaPrefix(data.phone || ""));
    setBirthDate(data.birth_date || "");
  }, [data]);

  return (
    <tr className="mb-4 block rounded-xl lg:table-row lg:rounded-none">
      {/* First name */}
      <td className="flex justify-between px-4 lg:table-cell lg:px-0">
        <span className="text-text-gray w-full max-w-36 font-normal lg:hidden">
          {t("$Nume")}
        </span>
        {edit ? (
          <input
            ref={refInput}
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            className="h-11 w-full max-w-56 rounded-full border bg-white px-4 lg:px-8"
          />
        ) : (
          <span>{first_name}</span>
        )}
      </td>

      {/* Last name */}
      <td className="flex justify-between px-4 lg:table-cell lg:px-0">
        <span className="text-text-gray w-full max-w-36 font-normal lg:hidden">
          {t("$Prenume")}
        </span>
        {edit ? (
          <input
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            className="h-11 w-full max-w-56 rounded-full border bg-white px-4 lg:px-8"
          />
        ) : (
          <span>{last_name}</span>
        )}
      </td>

      {/* Phone */}
      <td className="flex justify-between px-4 lg:table-cell lg:px-0">
        <span className="text-text-gray w-full max-w-36 font-normal lg:hidden">
          {t("$Telefon")}
        </span>
        {edit ? (
          <MoldovaPhoneInput
            placeholder={t("input.phone_placeholder")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 w-full max-w-56 rounded-full border bg-white"
          />
        ) : (
          <span>{phone ? "+373 " + phone : ""}</span>
        )}
      </td>

      {/* Birth date */}
      <td className="flex justify-between px-4 lg:table-cell lg:px-0">
        <span className="text-text-gray w-full max-w-36 font-normal lg:hidden">
          {t("$Data nașterii")}
        </span>

        {edit ? (
          <Popover>
            <div className="relative flex w-full">
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto h-11 w-full max-w-56 text-lg"
                >
                  {format(birth_date, "dd.MM.yyyy")}
                </Button>
              </PopoverTrigger>
            </div>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                defaultMonth={selectedDate}
                onSelect={handleChangeBirthDate}
                captionLayout="dropdown"
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        ) : (
          <span>{formatUTC(birth_date)?.date}</span>
        )}
      </td>

      {/* Actions */}
      <td className="flex items-center justify-between px-4 lg:table-cell">
        <span className="text-text-gray w-full max-w-36 font-normal lg:hidden">
          {t("$Acțiuni")}
        </span>

        <div className="flex items-center justify-end gap-4">
          {edit ? (
            <>
              <Button onClick={saveChange} disabled={loading}>
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    {t("$Se salvează")}
                  </>
                ) : (
                  t("$Salvează")
                )}
              </Button>
              <Button
                onClick={cancelEdit}
                variant="outline"
                disabled={loading}
              >
                {t("$Anulează")}
              </Button>
            </>
          ) : (
            <>
              {loading ? (
                <Button disabled>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  {t("$Se salvează")}
                </Button>
              ) : (
                <Button onClick={() => setEdit(true)} variant="reverse">
                  {t("$Modifică")}
                </Button>
              )}
            </>
          )}

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg border bg-white transition-colors",
                  !open && "hover:border-red hover:text-red",
                  open && "border-destructive bg-destructive text-white",
                )}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="max-w-xs space-y-3 text-sm">
              <div className="font-medium">
                Confirmați ștergerea pasagerului {`${first_name} ${last_name}`}?
              </div>
              <p className="text-muted-foreground">
                Această acțiune nu poate fi anulată. Pasagerul va fi eliminat
                din listă.
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  {t("$Anulează")}
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={deletePassenger.isPending}
                >
                  {deletePassenger.isPending ? (
                    <Loader className="size-4 animate-spin" />
                  ) : (
                    "Șterge"
                  )}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </td>
    </tr>
  );
};

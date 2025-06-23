"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { PRIVATE_LINK, QUERY_KEYS } from "@/utils/constants";
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
import { parse } from "date-fns/parse";
import { Calendar } from "@/components/ui/calendar";
import { isValid } from "date-fns/isValid";
import { format } from "date-fns/format";
import { removeMoldovaPrefix } from "@/utils";

export const PassengersContainer: React.FC = () => {
  const queryClient = useQueryClient();
  const t = useTranslations();

  const { data: passengers, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.passengers],
    queryFn: () => passengerService.getAll(),
  });

  const mutation = useMutation({
    mutationFn: passengerService.update,
    onSuccess: () => {
      toast.success("Рейс успешно создан!");
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
          <table className="table">
            <thead className="thead hidden lg:table-header-group [&_th]:last:text-right">
              <tr>
                <th>Nume</th>
                <th>Prenume</th>
                <th>Telefon</th>
                <th>Data nașterii</th>
                <th>Acțiuni</th>
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
                      onChange={(values) => mutation.mutate(values)}
                      data={passenger}
                      loading={mutation.isPending}
                    />
                  ))}
                </>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
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

  const [edit, setEdit] = React.useState(false);
  const [first_name, setFirstName] = React.useState(data?.first_name || "");
  const [last_name, setLastName] = React.useState(data?.last_name || "");
  const [phone, setPhone] = React.useState(data?.phone || "");
  const [birth_date, setBirthDate] = React.useState(data?.birth_date || "");

  const refInput = React.useRef<HTMLInputElement>(null);

  const saveChange = () => {
    onChange({
      id: data?.id,
      first_name,
      last_name,
      birth_date,
      phone,
      type: "adult",
    });
    setEdit(false);
  };

  React.useEffect(() => {
    if (edit) {
      refInput?.current?.focus();
    }
  }, [edit]);

  const deletePassenger = useMutation({
    mutationFn: passengerService.delete,
    onSuccess: (data) => {
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

  return (
    <tr className="mb-4 block rounded-xl lg:table-row lg:rounded-none">
      {/* First name */}
      <td className="flex justify-between px-4 lg:table-cell lg:px-0">
        <span className="text-text-gray w-full max-w-36 font-normal lg:hidden">
          Nume
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
          Prenume
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
          Telefon
        </span>
        {edit ? (
          <div className="relative">
            <input
              placeholder="000 00 000"
              value={removeMoldovaPrefix(phone)}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 w-full max-w-56 rounded-full border bg-white px-4 pl-20"
            />

            <div className="text-text-gray absolute top-1/2 left-5 flex -translate-y-1/2">
              +373 |
            </div>
          </div>
        ) : (
          <span>{phone}</span>
        )}
      </td>

      {/* Birth date */}
      <td className="flex justify-between px-4 lg:table-cell lg:px-0">
        <span className="text-text-gray w-full max-w-36 font-normal lg:hidden">
          Data nașterii
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
          <span>{format(birth_date, "dd.MM.yyyy")}</span>
        )}
      </td>

      {/* Actions */}
      <td className="flex items-center justify-between px-4 lg:table-cell">
        <span className="text-text-gray w-full max-w-36 font-normal lg:hidden">
          Acțiuni
        </span>

        <div className="flex items-center justify-end gap-4">
          {edit ? (
            <Button onClick={saveChange} disabled={loading}>
              Salvează
              {loading && <Loader className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          ) : (
            <Button onClick={() => setEdit(true)} variant="reverse">
              Modifică
            </Button>
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
                  Anulează
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

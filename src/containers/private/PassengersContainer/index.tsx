"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { PRIVATE_LINK } from "@/utils/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";

export const PassengersContainer: React.FC = () => {
  const t = useTranslations();

  return (
    <>
      <div className="py-8">
        <h3 className="h3 !mb-0">{t(PRIVATE_LINK.passengers.label)}</h3>
      </div>

      <Card className="ring-platinum ring ring-inset">
        <CardContent className="">
          <table className="table">
            <thead className="thead [&_th]:last:text-center">
              <tr>
                <th>Nume</th>
                <th>Prenume</th>
                <th>Data rezervării</th>
                <th>ID Bilet</th>
                <th>Modifică</th>
                <th>Șterge</th>
              </tr>
            </thead>
            <tbody className="tbody [&_td]:last:[&_button]:mx-auto">
              <PassengerRow
                onChange={(value) => console.log(value)}
                data={{ firstName: "Ion", lastName: "Ionescu" }}
                loading={false}
              />
              <PassengerRow
                onChange={(value) => console.log(value)}
                data={{ firstName: "Leila", lastName: "Boba" }}
                loading={false}
              />
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
};

const PassengerRow: React.FC<{
  onChange: (value: { firstName: string; lastName: string }) => void;
  data: { firstName: string; lastName: string };
  loading?: boolean;
}> = ({ data, onChange, loading }) => {
  const [edit, setEdit] = React.useState(false);
  const [firstName, setFirstName] = React.useState(data?.firstName);
  const [lastName, setLastName] = React.useState(data?.lastName);

  const refInput = React.useRef<HTMLInputElement>(null);

  const saveChange = () => {
    onChange({ firstName, lastName });
    setEdit(false);
  };

  React.useEffect(() => {
    if (edit) {
      refInput?.current?.focus();
    }
  }, [edit]);

  return (
    <tr>
      <td className="w-56 pr-8">
        {edit ? (
          <input
            ref={refInput}
            disabled={!edit}
            value={firstName}
            onChange={(event) => setFirstName(event?.target?.value)}
            className="h-11 w-full rounded-full border bg-white px-8"
          />
        ) : (
          firstName
        )}
      </td>
      <td className="w-56 pr-8">
        {edit ? (
          <input
            disabled={!edit}
            value={lastName}
            onChange={(event) => setLastName(event?.target?.value)}
            className="mr-11 h-11 w-full rounded-full border bg-white px-8"
          />
        ) : (
          lastName
        )}
      </td>
      <td>04/04/2025</td>
      <td>#023456</td>
      <td>
        {edit ? (
          <Button onClick={saveChange} disabled={loading}>
            Salvează
            {loading && <Loader className="animate-spin" />}
          </Button>
        ) : (
          <Button onClick={() => setEdit(true)} variant="reverse">
            Modifică nume
          </Button>
        )}
      </td>
      <td>
        <button className="flex size-10 items-center justify-center rounded-lg border bg-white">
          <Trash2 />
        </button>
      </td>
    </tr>
  );
};

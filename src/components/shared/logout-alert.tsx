import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { authService } from "@/services/auth.service";
import { Button } from "../ui/button";

export const LogoutAlert: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showAlert, setShowAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await authService.logout();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AlertDialog open={showAlert}>
      <AlertDialogTrigger asChild onClick={() => setShowAlert(true)}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sigur doriți să ieșiți din cont?</AlertDialogTitle>
          <AlertDialogDescription>
            Dacă ieșiți din cont, veți fi redirecționat la pagina de
            autentificare. Asigurați-vă că ați salvat orice modificare înainte
            de a continua.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setShowAlert(false)}>
            Anulați
          </AlertDialogCancel>
          <Button variant="destructive" onClick={handleLogout}>
            {loading ? "Așteptați..." : "Da, vreau să ies."}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

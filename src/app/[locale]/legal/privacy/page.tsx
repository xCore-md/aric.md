import { HomeContainer } from "@/containers/HomeContainer";

export default function Page() {
  return (
    <div className="html container py-12">
      <h1>Politica de Confidențialitate</h1>

      <section>
        <h2>1. Colectarea datelor</h2>
        <p>
          Colectăm informații personale atunci când trimiteți formulare pe site,
          inclusiv nume, adresă de e-mail și număr de telefon.
        </p>
      </section>

      <section>
        <h2>2. Utilizarea datelor</h2>
        <p>
          Datele sunt utilizate pentru a vă contacta, pentru a trimite oferte
          relevante și pentru îmbunătățirea serviciilor noastre. Nu vindem
          datele dvs. către terți.
        </p>
      </section>

      <section>
        <h2>3. Securitatea datelor</h2>
        <p>
          Implementăm măsuri tehnice și organizatorice pentru a proteja datele
          personale împotriva accesului neautorizat, pierderii sau divulgării.
        </p>
      </section>

      <section>
        <h2>4. Drepturile utilizatorului</h2>
        <p>
          Aveți dreptul de a accesa, modifica sau șterge datele dvs. personale.
          Ne puteți contacta oricând pentru aceste solicitări.
        </p>
      </section>

      <section>
        <h2>5. Cookie-uri</h2>
        <p>
          Site-ul nostru utilizează cookie-uri pentru a oferi o experiență mai
          bună. Continuarea navigării implică acceptul utilizării cookie-urilor.
        </p>
      </section>

      <section>
        <h2>6. Modificări</h2>
        <p>
          Ne rezervăm dreptul de a actualiza această politică de
          confidențialitate. Orice modificare va fi publicată pe această pagină.
        </p>
      </section>
    </div>
  );
}

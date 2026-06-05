import { redirect } from "next/navigation";

// L'ancienne page « manifeste » est désormais /intention (âme du projet, texte personnel).
// On conserve l'URL historique en la redirigeant vers la page canonique.
export default function ManifestePage() {
  redirect("/intention");
}

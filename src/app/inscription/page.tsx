import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";
import { shareMetadata } from "@/lib/share";

const title = "Créer un espace entreprise | SPS-CARBON";
const description =
  "Demandez l’ouverture de l’espace SPS-CARBON de votre entreprise : programme pilote 2026, accompagnement par les consultants de SAFEPERFORM SOLUTIONS.";

export const metadata: Metadata = { title, description, ...shareMetadata(title, description) };

export default function SignupPage() {
  // The frame (landscape, card, tabs) is shared with /connexion: see site-frame.tsx.
  return <SignupForm />;
}

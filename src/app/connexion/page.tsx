import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { shareMetadata } from "@/lib/share";

const title = "Connexion à votre espace | SPS-CARBON";
const description = "Accédez à l’espace SPS-CARBON de votre entreprise : collecte, contrôle, calcul et pilotage de vos émissions.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: true },
  ...shareMetadata(title, description),
};

export default function LoginPage() {
  // The frame (landscape, card, tabs) is shared with /inscription: see site-frame.tsx.
  return <LoginForm />;
}

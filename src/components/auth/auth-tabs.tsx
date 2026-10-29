import Link from "next/link";

/* The two doors of the client space, side by side at the top of the card. */
export function AuthTabs({ active }: { active: "connexion" | "inscription" }) {
  return (
    <nav className="auth-tabs" aria-label="Espace client">
      <Link href="/connexion" aria-current={active === "connexion" ? "page" : undefined}>
        Connexion
      </Link>
      <Link href="/inscription" aria-current={active === "inscription" ? "page" : undefined}>
        Créer un espace
      </Link>
    </nav>
  );
}

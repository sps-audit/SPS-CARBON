"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type AuthRoute = "connexion" | "inscription";

/*
 * The two doors of the client space, side by side at the top of the card.
 * The tabs live in the persistent shell, so the light "pill" behind the
 * active door slides across on click instead of being redrawn by the next
 * page. When a step hides them (the later steps of the account form) they
 * fold away rather than vanish.
 */
export function AuthTabs({ route, shown }: { route: AuthRoute; shown: boolean }) {
  const [mark, setMark] = useState<AuthRoute>(route);

  // Back and forward buttons move the mark too.
  useEffect(() => setMark(route), [route]);

  return (
    <div className="auth-tabs-wrap" data-shown={shown ? "true" : "false"} inert={!shown} aria-hidden={!shown || undefined}>
      <div className="auth-tabs-fold">
        <nav className="auth-tabs" aria-label="Espace client" data-mark={mark}>
          <span className="auth-tabs-mark" aria-hidden="true" />
          <Link
            href="/connexion"
            aria-current={route === "connexion" ? "page" : undefined}
            onClick={() => setMark("connexion")}
          >
            Connexion
          </Link>
          <Link
            href="/inscription"
            aria-current={route === "inscription" ? "page" : undefined}
            onClick={() => setMark("inscription")}
          >
            Créer un espace
          </Link>
        </nav>
      </div>
    </div>
  );
}

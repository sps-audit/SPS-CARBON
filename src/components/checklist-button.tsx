"use client";

import { useSiteActions } from "./site-frame";

/* Opens the data checklist dialog from a server-rendered page. */
export function ChecklistButton({ className = "btn btn-mint", label = "Créer ma checklist" }: { className?: string; label?: string }) {
  const { openChecklist } = useSiteActions();
  return (
    <button type="button" className={className} onClick={openChecklist}>
      {label}
    </button>
  );
}

import { company } from "./company";

/*
 * Sends a request from the site to SAFEPERFORM SOLUTIONS through the form
 * delivery service (company.formKey). Returns false when no key is set or
 * when sending fails, so the caller can fall back to an e-mail draft and the
 * request is never lost.
 */
export const canSend = Boolean(company.formKey);

export async function deliver(subject: string, fields: Record<string, string>, robot = false): Promise<boolean> {
  if (!canSend) return false;
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        access_key: company.formKey,
        subject: `[SPS-CARBON] ${subject}`,
        from_name: "Site SPS-CARBON",
        botcheck: robot,
        ...fields,
      }),
    });
    const result = (await response.json().catch(() => ({}))) as { success?: boolean };
    return response.ok && Boolean(result.success);
  } catch {
    return false;
  } finally {
    window.clearTimeout(timer);
  }
}

/** A mailto: link carrying the same request, for the visitor's own mail app. */
export function mailDraft(subject: string, body: string) {
  return `mailto:${company.email}?subject=${encodeURIComponent(`[SPS-CARBON] ${subject}`)}&body=${encodeURIComponent(body)}`;
}

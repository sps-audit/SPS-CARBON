/*
 * The logo of the firm behind SPS-CARBON. The mark (tree and name) suits small
 * placements; the full logo adds the tagline, for the firm's own page. Each
 * theme shows its version: blue lettering on light surfaces, white on dark ones.
 *
 * Lazy by default: React preloads every eager <img>, which fetched both theme
 * variants (about 100 KB each) on every page although one is hidden and the
 * logo sits low on the page. A lazy, hidden variant is never downloaded.
 */
export function SafeperformLogo({
  full = false,
  className = "",
  loading = "lazy",
}: {
  full?: boolean;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const name = full ? "logo" : "mark";
  const height = full ? 525 : 408;
  const alt = full
    ? "Safe Perform Solutions, cabinet de conseil, formation et audit, spécialiste en management QHSE et RSE"
    : "Safe Perform Solutions";
  return (
    <span className={`sp-logo ${className}`}>
      <img className="logo-on-light" src={`/brand/safeperform-${name}-dark.svg`} width="600" height={height} alt={alt} loading={loading} decoding="async" />
      <img className="logo-on-dark" src={`/brand/safeperform-${name}-light.svg`} width="600" height={height} alt={alt} loading={loading} decoding="async" />
    </span>
  );
}

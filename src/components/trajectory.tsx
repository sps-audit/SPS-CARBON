/*
 * The brand device: the two parallel cuts of the SPS-CARBON symbol, which the
 * identity guidelines describe as "a measured reduction trajectory", drawn as
 * two long descending lines, drawn still. Decorative only.
 */
export function Trajectory({ className = "" }: { className?: string }) {
  return (
    <div className={`trajectory ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1000 400" preserveAspectRatio="none" focusable="false">
        <line className="trajectory-a" x1="0" y1="40" x2="1000" y2="260" vectorEffect="non-scaling-stroke" />
        <line className="trajectory-b" x1="0" y1="120" x2="1000" y2="340" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

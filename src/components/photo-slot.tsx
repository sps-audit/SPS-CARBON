import { photos, type PhotoId } from "@/lib/photos";

const isDev = process.env.NODE_ENV === "development";

/** One commissioned photograph (src/lib/photos.ts), AVIF first then WebP. */
function Photo({ id }: { id: PhotoId }) {
  const photo = photos[id];
  if ("src" in photo && typeof photo.src === "string" && photo.src) {
    return (
      <figure className={`photo photo-${id}`}>
        <picture>
          <source type="image/avif" srcSet={`${photo.src}.avif`} />
          <img src={`${photo.src}.webp`} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" decoding="async" />
        </picture>
      </figure>
    );
  }
  if (!isDev) return null;
  // Development only: the slot, marked, with the brief for the photographer.
  return (
    <figure className={`photo photo-${id} is-slot`} style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
      <figcaption>
        <strong>Photo à commander : {id}</strong>
        <span>{photo.brief}</span>
      </figcaption>
    </figure>
  );
}

const hasAny = (ids: PhotoId[]) => ids.some((id) => Boolean((photos[id] as { src?: string }).src));

/**
 * A full-width band of real photographs. Without any photo it renders nothing
 * on the live site (no empty frame, no gap), and a marked slot in development.
 */
export function PhotoBand({ ids, label }: { ids: PhotoId[]; label: string }) {
  if (!isDev && !hasAny(ids)) return null;
  return (
    <section className="photo-band" aria-label={label}>
      <div className="wrap photo-band-grid" data-count={ids.length}>
        {ids.map((id) => (
          <Photo key={id} id={id} />
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";

/**
 * A screenshot framed as a monitored feed: corner ticks, a crosshair, and a
 * sweeping scan line. Reads as telemetry, not a flat image block.
 */
export function Telemetry({
  src,
  alt,
  id,
  caption,
  contain = true,
}: {
  src: string;
  alt: string;
  id: string;
  caption: string;
  contain?: boolean;
}) {
  return (
    <figure className="telem">
      <div className="telem-view">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{ objectFit: contain ? "contain" : "cover" }}
        />
        <span className="tick tl" /><span className="tick tr" />
        <span className="tick bl" /><span className="tick br" />
        <div className="telem-cross" />
        <div className="telem-scan" />
      </div>
      <figcaption className="telem-bar">
        <span className="id">{id}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

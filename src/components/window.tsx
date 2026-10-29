import Image from "next/image";
import type { ProjectImage } from "@/data/projects";

/**
 * A screenshot in a minimal browser window whose bar shows the product's
 * real address. Composed graphics get the frame without the bar, so they're
 * never passed off as the live page.
 */
export function Window({
  image,
  domain,
  sizes,
  priority,
  raised,
  decorative,
  className = "",
}: {
  image: ProjectImage;
  domain?: string;
  sizes: string;
  priority?: boolean;
  /** A stronger shadow, for a screen layered in front of another. */
  raised?: boolean;
  /** Inside a link that already names the project: no alt text. */
  decorative?: boolean;
  className?: string;
}) {
  return (
    <figure className={`window ${raised ? "window-raised" : ""} ${className}`}>
      {!image.composite && domain && (
        <div
          aria-hidden
          className="flex h-6 items-center justify-center border-b border-line bg-[#fbfbf9] sm:h-7"
        >
          <span className="text-[10px] tracking-[0.01em] text-muted sm:text-[11px]">{domain}</span>
        </div>
      )}
      <Image
        src={image.src}
        alt={decorative ? "" : image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        className="block h-auto w-full"
      />
    </figure>
  );
}

/* eslint-disable @next/next/no-img-element */
import { imageSize, projectImage } from "@/data/projects";

/** Foto em WebP responsivo (720 px e 1440 px), carregada só quando chega perto da tela. */
export function ProjectImage({
  slug,
  alt,
  sizes,
  className = "",
  eager = false,
  ariaHidden,
}: {
  slug: string;
  alt: string;
  sizes: string;
  className?: string;
  eager?: boolean;
  ariaHidden?: boolean;
}) {
  const { w, h } = imageSize(slug);
  return (
    <img
      src={projectImage(slug, 720)}
      srcSet={`${projectImage(slug, 720)} 720w, ${projectImage(slug, 1440)} 1440w`}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      aria-hidden={ariaHidden || undefined}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}

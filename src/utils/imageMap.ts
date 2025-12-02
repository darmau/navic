import type { ImageMetadata } from "astro";

export function mapGlobToImages(
  globResult: Record<string, unknown>
): Record<string, ImageMetadata | string> {
  return Object.fromEntries(
    Object.entries(globResult)
      .map(([path, mod]) => {
        const image = (mod as { default?: ImageMetadata }).default ?? mod;
        const name = path.split("/").pop();
        return name ? [name, image as ImageMetadata | string] : null;
      })
      .filter(Boolean) as [string, ImageMetadata | string][]
  );
}

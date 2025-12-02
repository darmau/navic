import type { ImageMetadata } from "astro";
// This function is used to map a glob result to a record of images.
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

import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "@sanity/types";
import { client } from "../sanity";

export function getSanityImageUrl(source: Image) {
  const builder = imageUrlBuilder(client);
  return builder.image(source).size(800, 600).fit('max').auto("format").url();
}

import imageUrlBuilder from "@sanity/image-url";
import { client } from "../sanity";
import type { Post } from "../resources/interfaces/sanity.types";

interface ImageOptions {
  width?: number;
  height?: number;
  maxWidth?: number;
  aspectRatio?: number,
}

const sizes = "(min-width: 600px) 600w, (min-width: 900px) 900w, (min-width: 1200px) 1200w, (min-width: 1800px) 1800w, (min-width: 2400px) 2400w, 300w"

function getSanityImageUrl(source: Post['contentImage'], options: ImageOptions = {}) {
  const builder = imageUrlBuilder(client);
  let urlBuilder = builder.image(source!);

  // Apply hotspot if available
  if (source!.hotspot) {
    urlBuilder = urlBuilder
      .crop('focalpoint')
      .focalPoint(source!.hotspot.x || 0, source!.hotspot.y || 0)
      .fit('crop')
  } else {
    urlBuilder = urlBuilder.fit('max')
  }

  // Only apply size if both dimensions are provided
  if (options.width && options.height) {
    urlBuilder = urlBuilder.size(options.width, options.height);
  }
  else if (options.width) {
    urlBuilder = urlBuilder.width(options.width);
  }
  else if (options.height) {
    urlBuilder = urlBuilder.height(options.height);
  }

  return urlBuilder
    .auto("format")
    .url();
}

// Helper function to generate srcSet for responsive images
function getSanityImageSrcSet(source: Post['contentImage'], options: ImageOptions = {}) {
  const widths: Array<number> = [300, 600, 900, 1200, 1800, 2400].map((w, i, a) => {
    if (!options.maxWidth) return w;

    const isMaxBiggerThanPrevious = options.maxWidth! > (a[i - 1] || 0);
    const isMaxSmallerThanCurrent = options.maxWidth! < w;

    if (isMaxSmallerThanCurrent) {
      if (isMaxBiggerThanPrevious) return options.maxWidth;
      return null
    }

    return w;
  }).filter((w) => w !== null)

  const heights = widths.map((width) => {
    return width * (options?.aspectRatio ?? (source?.asset as any)?.metadata!.dimensions.aspectRatio)
  })

  const srcSet = widths
    .map((width, i) => {
      const url = getSanityImageUrl(source, {
        ...options,
        width: Math.floor(heights[i]),
        height: width,
      });
      return `${url} ${width}w`;
    })
    .join(', ');

  return srcSet;

}

export { sizes, getSanityImageUrl, getSanityImageSrcSet }

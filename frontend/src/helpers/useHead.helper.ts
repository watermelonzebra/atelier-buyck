import { useHead, type HeadObject } from "@vueuse/head"; // Updated import to @vueuse/head and type import style
import type {
  // Updated to type imports and new path
  PageSettings,
  SeoMetaFields,
  OpenGraph,
  Twitter,
  MetaTag,
} from "../resources/interfaces/sanity.types";
import { getSanityImageUrl } from "./sanity-image.helper";

// NOTE: This helper assumes you have a function to get the full URL
// of an image asset from Sanity's image reference, often called
// 'urlFor' or similar. Replace 'urlFor' with your actual function.
declare function urlFor(source: any): { url: () => string };

// Define a stable type for the array of meta tags we will build,
// which is required for spreading into HeadObject.meta
type MetaTagArray = Array<
  Record<string, string | number | boolean | undefined>
>;

/**
 * Helper to build the final URL for a Sanity image asset.
 * @param imageRef The Sanity image field object.
 * @returns The full URL string or null if the image reference is missing.
 */
function getImageMetaUrl(imageRef: any): string | null {
  // Assuming the Sanity image object has an 'asset' property with a '_ref'
  if (imageRef) {
    return getSanityImageUrl(imageRef);
  }
  return null;
}

/**
 * Builds the SEO metadata for the page using a PageSettings object
 * and applies it using the useHead function.
 * @param pageSettings The Sanity PageSettings document containing SEO fields.
 * @param currentUrl The canonical URL of the current page.
 * @param defaultTitle A fallback title to use if metaTitle is missing.
 */
export function setPageSeo(
  pageSettings: PageSettings | SeoMetaFields,
  currentUrl: string,
  defaultTitle: string = "Atelier Buyck"
): void {
  console.log("setting page SEO", pageSettings);
  const seo: SeoMetaFields | undefined = (pageSettings as PageSettings)?.seo
    ? (pageSettings as PageSettings)?.seo
    : (pageSettings as SeoMetaFields);

  // Guard clause for missing SEO data
  if (!seo) {
    console.warn("SEO data is missing from PageSettings.");
    useHead({ title: defaultTitle });
    return;
  }

  // Determine the canonical URL and clean trailing slash
  const canonicalUrl = currentUrl.endsWith("/")
    ? currentUrl.slice(0, -1)
    : currentUrl;

  // 1. Basic Meta Tags
  const headConfig: HeadObject = {
    // Initialize meta as an empty array of the expected spread type
    meta: [],
    link: [{ rel: "canonical", href: canonicalUrl }],
  };

  // Cast for reliable array manipulation
  const metaArray = headConfig.meta as MetaTagArray;

  // Add title if available
  if (seo.metaTitle) {
    metaArray.push({ name: "title", content: seo.metaTitle });
  }

  // Add description if available
  if (seo.metaDescription) {
    metaArray.push({ name: "description", content: seo.metaDescription });
  }

  // Add keywords if available
  if (seo.seoKeywords && seo.seoKeywords.length > 0) {
    metaArray.push({ name: "keywords", content: seo.seoKeywords.join(", ") });
  }

  // 2. Robots/Nofollow
  if (seo.nofollowAttributes === true) {
    metaArray.push({ name: "robots", content: "noindex, nofollow" });
  }

  // 3. Main SEO Image
  const mainImageUrl = getImageMetaUrl(seo.metaImage);

  // 4. Open Graph (Facebook/Social Media) - Use spread operator safely with typed return
  if (seo.openGraph) {
    metaArray.push(
      ...buildOpenGraphMeta(
        seo.openGraph,
        seo.metaTitle,
        seo.metaDescription,
        mainImageUrl,
        canonicalUrl
      )
    );
  }

  // 5. Twitter Cards - Use spread operator safely with typed return
  if (seo.twitter) {
    metaArray.push(
      ...buildTwitterMeta(
        seo.twitter,
        seo.metaTitle,
        seo.metaDescription,
        mainImageUrl
      )
    );
  }

  // 6. Additional Meta Tags (Custom) - Use spread operator safely with typed return
  if (seo.additionalMetaTags && seo.additionalMetaTags.length > 0) {
    metaArray.push(...buildAdditionalMetaTags(seo.additionalMetaTags));
  }

  // Apply the generated config using useHead
  useHead(headConfig);
}

/**
 * Converts OpenGraph structure to a spreadable array of meta tags.
 */
function buildOpenGraphMeta(
  og: OpenGraph,
  defaultTitle?: string,
  defaultDescription?: string,
  defaultImageUrl?: string | null,
  canonicalUrl?: string
): MetaTagArray {
  // Explicitly set return type to MetaTagArray
  const meta: MetaTagArray = [];

  const title = og.title || defaultTitle;
  const description = og.description || defaultDescription;
  const imageUrl = getImageMetaUrl(og.image) || defaultImageUrl;

  if (title) meta.push({ property: "og:title", content: title });
  if (description)
    meta.push({ property: "og:description", content: description });
  if (canonicalUrl) meta.push({ property: "og:url", content: canonicalUrl });
  if (og.siteName)
    meta.push({ property: "og:site_name", content: og.siteName });

  // NOTE: Default 'og:type' to 'website'
  meta.push({ property: "og:type", content: "website" });

  if (imageUrl) {
    meta.push({ property: "og:image", content: imageUrl });
    // NOTE: You might add og:image:width and og:image:height if available
  }

  return meta;
}

/**
 * Converts Twitter structure to a spreadable array of meta tags.
 */
function buildTwitterMeta(
  twitter: Twitter,
  defaultTitle?: string,
  defaultDescription?: string,
  defaultImageUrl?: string | null
): MetaTagArray {
  // Explicitly set return type to MetaTagArray
  const meta: MetaTagArray = [];

  // Ensure a card type is set (defaults to 'summary_large_image' if Sanity field is empty)
  const card: "summary_large_image" | "summary" | (string & {}) =
    twitter.cardType || (defaultImageUrl ? "summary_large_image" : "summary"); // Fixed TS7022 by providing explicit type
  meta.push({ name: "twitter:card", content: card });

  if (twitter.creator)
    meta.push({ name: "twitter:creator", content: twitter.creator });
  if (twitter.site) meta.push({ name: "twitter:site", content: twitter.site });
  if (twitter.handle)
    meta.push({ name: "twitter:handle", content: twitter.handle });

  // Fallback to Open Graph/Meta title/description if Twitter fields are empty
  const title = defaultTitle;
  const description = defaultDescription;
  const imageUrl = defaultImageUrl;

  if (title) meta.push({ name: "twitter:title", content: title });
  if (description)
    meta.push({ name: "twitter:description", content: description });
  if (imageUrl) meta.push({ name: "twitter:image", content: imageUrl });

  return meta;
}

/**
 * Converts Additional Meta Tags structure to a spreadable array of meta tags.
 */
function buildAdditionalMetaTags(tags: MetaTag[]): MetaTagArray {
  // Explicitly set return type to MetaTagArray
  const meta: MetaTagArray = [];

  tags.forEach((tag) => {
    // A single MetaTag object can have multiple MetaAttributes
    tag.metaAttributes?.forEach((attr) => {
      if (attr.attributeKey) {
        let content: string | null = null;
        let isProperty = false; // Default to name attribute

        // Determine content value based on type
        if (attr.attributeType === "string" && attr.attributeValueString) {
          content = attr.attributeValueString;
        } else if (attr.attributeType === "image") {
          content = getImageMetaUrl(attr.attributeValueImage);
        }

        // Determine if it should use 'name' or 'property'
        // Simple heuristic: if it starts with 'og:' or 'twitter:', use 'property'
        if (
          attr.attributeKey.startsWith("og:") ||
          attr.attributeKey.startsWith("twitter:")
        ) {
          isProperty = true;
        }

        if (content) {
          meta.push(
            isProperty
              ? { property: attr.attributeKey, content: content }
              : { name: attr.attributeKey, content: content }
          );
        }
      }
    });
  });

  return meta;
}

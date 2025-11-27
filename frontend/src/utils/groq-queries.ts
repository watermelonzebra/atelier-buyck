import { defineQuery } from "groq";

const postInterface = `{
      _id,
      _createdAt,
      _updatedAt,
      _rev,
      _type,
      title,
      slug,
      contentImage{
        asset->,
        crop,
        hotspot,
        alt
      },
      "imageGallery": imageGallery[]{
        asset->,
        crop,
        hotspot,
        alt,
      },
      seo,
      description,
      year,
      colorScheme,
      body,
      callToAction
    }`;

// Query for the specific post (Detailed)
const POST_DETAIL_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] ${postInterface}
`);

// 2. Create a LITE interface for lists (Home/Index)
// No body, no gallery, and NO asset-> expansion (saves huge bandwidth)
const postLiteInterface = `{
  _id, title, slug, description, _createdAt,
  contentImage{ 
    // We only need the reference ID for the builder to work, 
    // unless you strictly need metadata.dimensions here.
    asset, 
    crop, hotspot, alt 
  },colorScheme,
}`;

// Query for the list (Lite)
const POSTS_LIST_QUERY = defineQuery(`
  *[_type == "post"] ${postLiteInterface} | order(_createdAt asc)
`);

export {
  POST_DETAIL_QUERY,
  postInterface,
  POSTS_LIST_QUERY,
  postLiteInterface,
};

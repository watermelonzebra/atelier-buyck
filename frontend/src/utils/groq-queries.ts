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
      description,
      year,
      colorScheme,
      body,
      callToAction
    }`;

const POST_QUERY = defineQuery(`
    * [_type == "post"] ${postInterface} | order(_createdAt asc)
        `);

export { POST_QUERY, postInterface };

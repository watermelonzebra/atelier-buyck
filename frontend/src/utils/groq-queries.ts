import { defineQuery } from 'groq';

const postInterface = `{
      _id,
      _createdAt,
      _updatedAt,
      _rev,
      _type,
      title,
      slug,
      "imageGallery": imageGallery[]{
        _key,
        _type,
        "asset": asset->
      },
      description,
      year,
      colorScheme,
      body,
      "contentImage": contentImage.asset->,
    }`;

const POST_QUERY = defineQuery(`
    * [_type == "post"] ${postInterface} | order(_createdAt asc)
        `);

export {
    POST_QUERY, postInterface
}
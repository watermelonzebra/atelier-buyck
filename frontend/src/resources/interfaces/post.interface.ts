import type { SanityImageAssetDocument } from "@sanity/client";
import type { Image } from "@sanity/types";

export interface Post {
  _createdAt: string;
  _type: "post";
  _updatedAt: string;
  _rev: string;
  _id: string;
  description?: string;
  title: string;
  slug: { current: string; _type: "slug" };
  contentImage: Image;
  year: string;
  colorScheme: string;
  imageGallery: {
    _key: string;
    _type: string;
    asset: SanityImageAssetDocument;
  }[];
  body: {
    _key: string;
    _type: "block";
    children: {
      _key: string;
      _type: "span";
      text: string;
      marks: string[];
    }[];
    markDefs: any[];
    style: string;
  }[];
}
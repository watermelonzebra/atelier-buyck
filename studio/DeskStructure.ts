import { StructureResolver } from 'sanity/structure'
import { DocumentIcon } from '@sanity/icons'

// Custom desk structure
export const deskStructure: StructureResolver = (S) => {
  return S.list()
    .title('Content Management')
    .items([
      // Projects Section
      S.listItem()
        .title('Posts')
        .icon(DocumentIcon)
        .child(
          S.documentTypeList('post')
            .title('Posts')
            .menuItems(S.documentTypeList('post').getMenuItems())
            .filter('_type == "post"')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('post')
                .views([S.view.form().title('Edit')]),
            ),
        ),

      // Divider
      S.divider(),

      // Hide these document types from appearing elsewhere in the studio
      // Add other document types that aren't part of the main structure
      ...S.documentTypeListItems().filter(
        (listItem) => !['post'].includes(listItem.getId() || ''),
      ),
    ])
}
import { StructureResolver } from 'sanity/structure'
import { CogIcon, DocumentIcon } from '@sanity/icons'

// Custom desk structure
export const deskStructure: StructureResolver = (S) => {
  return S.list()
    .title('Content Management')
    .items([
      // // Page content Section
      S.listItem()
        .title('Website Inhoud')
        .icon(CogIcon)
        .child(
          S.documentTypeList('pageSettings')
            .menuItems(S.documentTypeList('pageSettings').getMenuItems())
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('pageSettings')
                .views([S.view.form().title('Edit')]),
            ),
        ),

      // Divider
      S.divider(),

      // Projects Section
      S.listItem()
        .title('Projecten')
        .icon(DocumentIcon)
        .child(
          S.documentTypeList('post')
            .title('Projecten')
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
        (listItem) => !['post', 'pageSettings'].includes(listItem.getId() || ''),
      ),
    ])
}
